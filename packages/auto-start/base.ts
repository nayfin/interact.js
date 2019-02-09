import * as utils from '@interactjs/utils'
import InteractableMethods from './InteractableMethods'
type Scope = import ('@interactjs/core/scope').Scope

declare module '@interactjs/interact/interact' {
  interface InteractStatic {
    maxInteractions: (newValue: any) => any
  }
}

declare module '@interactjs/core/scope' {
  interface Scope {
    autoStart: AutoStart
    maxInteractions: (...args: any) => any
  }
}

declare module '@interactjs/core/defaultOptions' {
  interface BaseDefaults {
    actionChecker?
    styleCursor?
  }

  interface PerActionDefaults {
    manualStart?: boolean
    max?: number
    maxPerElement?: number
    allowFrom?: string | Element
    ignoreFrom?: string | Element

    // only allow left button by default
    // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
    mouseButtons?: 0 | 1 | 2 | 4 | 16
  }
}

export interface AutoStart {
  // Allow this many interactions to happen simultaneously
  maxInteractions: number
  withinInteractionLimit: typeof withinInteractionLimit
  cursorElement: Element
  signals: utils.Signals
}

function install (scope: Scope) {
  const {
    interact,
    interactions,
    defaults,
  } = scope

  interact.use(InteractableMethods)

  // set cursor style on mousedown
  interactions.signals.on('down', ({ interaction, pointer, event, eventTarget }) => {
    if (interaction.interacting()) { return }

    const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope)
    prepare(interaction, actionInfo, scope)
  })

  // set cursor style on mousemove
  interactions.signals.on('move', ({ interaction, pointer, event, eventTarget }) => {
    if (interaction.pointerType !== 'mouse' ||
        interaction.pointerIsDown ||
        interaction.interacting()) { return }

    const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope)
    prepare(interaction, actionInfo, scope)
  })

  interactions.signals.on('move', (arg) => {
    const { interaction } = arg

    if (!interaction.pointerIsDown ||
        interaction.interacting() ||
        !interaction.pointerWasMoved ||
        !interaction.prepared.name) {
      return
    }

    scope.autoStart.signals.fire('before-start', arg)

    const target = interaction.interactable

    if (interaction.prepared.name && target) {
      // check manualStart and interaction limit
      if (target.options[interaction.prepared.name].manualStart ||
          !withinInteractionLimit(target, interaction.element, interaction.prepared, scope)) {
        interaction.stop()
      }
      else {
        interaction.start(interaction.prepared, target, interaction.element)
      }
    }
  })

  interactions.signals.on('stop', ({ interaction }) => {
    const target = interaction.interactable

    if (target && target.options.styleCursor) {
      setCursor(interaction.element, '', scope)
    }
  })

  defaults.base.actionChecker = null
  defaults.base.styleCursor = true

  utils.extend(defaults.perAction, {
    manualStart: false,
    max: Infinity,
    maxPerElement: 1,
    allowFrom:  null,
    ignoreFrom: null,

    // only allow left button by default
    // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
    mouseButtons: 1,
  });

  /**
   * Returns or sets the maximum number of concurrent interactions allowed.  By
   * default only 1 interaction is allowed at a time (for backwards
   * compatibility). To allow multiple interactions on the same Interactables and
   * elements, you need to enable it in the draggable, resizable and gesturable
   * `'max'` and `'maxPerElement'` options.
   *
   * @alias module:interact.maxInteractions
   *
   * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
   */
  (interact as any /* FIXME */).maxInteractions = (newValue) => maxInteractions(newValue, scope)

  scope.autoStart = {
    // Allow this many interactions to happen simultaneously
    maxInteractions: Infinity,
    withinInteractionLimit,
    cursorElement: null,
    signals: new utils.Signals(),
  }
}

// Check if the current target supports the action.
// If so, return the validated action. Otherwise, return null
function validateAction (action, interactable, element, eventTarget, scope) {
  if (utils.is.object(action) &&
      interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget) &&
      interactable.options[action.name].enabled &&
      withinInteractionLimit(interactable, element, action, scope)) {
    return action
  }

  return null
}

function validateSelector (interaction, pointer, event, matches, matchElements, eventTarget, scope) {
  for (let i = 0, len = matches.length; i < len; i++) {
    const match = matches[i]
    const matchElement = matchElements[i]
    const action = validateAction(
      match.getAction(pointer, event, interaction, matchElement),
      match,
      matchElement,
      eventTarget,
      scope)

    if (action) {
      return {
        action,
        target: match,
        element: matchElement,
      }
    }
  }

  return { action: null, target: null, element: null }
}

function getActionInfo (interaction, pointer, event, eventTarget, scope) {
  let matches = []
  let matchElements = []

  let element = eventTarget

  function pushMatches (interactable) {
    matches.push(interactable)
    matchElements.push(element)
  }

  while (utils.is.element(element)) {
    matches = []
    matchElements = []

    scope.interactables.forEachMatch(element, pushMatches)

    const actionInfo = validateSelector(interaction, pointer, event, matches, matchElements, eventTarget, scope)

    if (actionInfo.action &&
      !actionInfo.target.options[actionInfo.action.name].manualStart) {
      return actionInfo
    }

    element = utils.dom.parentNode(element)
  }

  return { action: null, target: null, element: null }
}

function prepare (interaction, { action, target, element }, scope) {
  action = action || {}

  if (interaction.interactable && interaction.interactable.options.styleCursor) {
    setCursor(interaction.element, '', scope)
  }

  interaction.interactable = target
  interaction.element = element
  utils.copyAction(interaction.prepared, action)

  if (target && target.options.styleCursor) {
    const cursor = action ? scope.actions[action.name].getCursor(action) : ''
    setCursor(interaction.element, cursor, scope)
  }

  scope.autoStart.signals.fire('prepared', { interaction })
}

function withinInteractionLimit (interactable, element, action, scope) {
  const options = interactable.options
  const maxActions = options[action.name].max
  const maxPerElement = options[action.name].maxPerElement
  const autoStartMax = scope.autoStart.maxInteractions
  let activeInteractions = 0
  let targetCount = 0
  let targetElementCount = 0

  // no actions if any of these values == 0
  if (!(maxActions && maxPerElement && autoStartMax)) { return false }

  for (const interaction of scope.interactions.list) {
    const otherAction = interaction.prepared.name

    if (!interaction.interacting()) { continue }

    activeInteractions++

    if (activeInteractions >= autoStartMax) {
      return false
    }

    if (interaction.interactable !== interactable) { continue }

    targetCount += otherAction === action.name ? 1 : 0

    if (targetCount >= maxActions) {
      return false
    }

    if (interaction.element === element) {
      targetElementCount++

      if (otherAction === action.name && targetElementCount >= maxPerElement) {
        return false
      }
    }
  }

  return autoStartMax > 0
}

function maxInteractions (newValue, scope) {
  if (utils.is.number(newValue)) {
    scope.autoStart.maxInteractions = newValue

    return this
  }

  return scope.autoStart.maxInteractions
}

function setCursor (element, cursor, scope) {
  if (scope.autoStart.cursorElement) {
    scope.autoStart.cursorElement.style.cursor = ''
  }

  element.ownerDocument.documentElement.style.cursor = cursor
  element.style.cursor = cursor
  scope.autoStart.cursorElement = cursor ? element : null
}

export default {
  install,
  maxInteractions,
  withinInteractionLimit,
  validateAction,
}