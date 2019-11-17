/**
 * @module modifiers/snapEdges
 *
 * @description
 * This module allows snapping of the edges of targets during resize
 * interactions.
 *
 * @example
 * interact(target).resizable({
 *   snapEdges: {
 *     targets: [interact.snappers.grid({ x: 100, y: 50 })],
 *   },
 * })
 *
 * interact(target).resizable({
 *   snapEdges: {
 *     targets: [
 *       interact.snappers.grid({
 *        top: 50,
 *        left: 50,
 *        bottom: 100,
 *        right: 100,
 *       }),
 *     ],
 *   },
 * })
 */
import clone from "../../utils/clone.js";
import extend from "../../utils/extend.js";
import snapSize from "./size.js";

function start(arg) {
  const {
    edges
  } = arg.interaction.prepared;

  if (!edges) {
    return null;
  }

  arg.state.targetFields = arg.state.targetFields || [[edges.left ? 'left' : 'right', edges.top ? 'top' : 'bottom']];
  return snapSize.start(arg);
}

function set(arg) {
  return snapSize.set(arg);
}

const snapEdges = {
  start,
  set,
  defaults: extend(clone(snapSize.defaults), {
    offset: {
      x: 0,
      y: 0
    }
  })
};
export default snapEdges;
//# sourceMappingURL=edges.js.map