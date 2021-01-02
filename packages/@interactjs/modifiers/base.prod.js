import{InteractEvent as t}from"../core/InteractEvent.prod.js";import o from"../core/Interaction.prod.js";import i from"./Modification.prod.js";export function makeModifier(t,o){const{defaults:i}=t,e={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop},n=t=>{const n=t||{};n.enabled=!1!==n.enabled;for(const t in i)t in n||(n[t]=i[t]);const r={options:n,methods:e,name:o,enable:()=>(n.enabled=!0,r),disable:()=>(n.enabled=!1,r)};return r};return o&&"string"==typeof o&&(n._defaults=i,n._methods=e),n}export function addEventModifiers({iEvent:t,interaction:{modification:{result:o}}}){o&&(t.modifiers=o.eventProps)}const e={id:"modifiers/base",before:["actions"],install(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new"({interaction:t}){t.modification=new i(t)},"interactions:before-action-start"(t){const{modification:o}=t.interaction;o.start(t,t.interaction.coords.start.page),t.interaction.edges=o.edges,o.applyToInteraction(t)},"interactions:before-action-move":t=>t.interaction.modification.setAndApply(t),"interactions:before-action-end":t=>t.interaction.modification.beforeEnd(t),"interactions:action-start":addEventModifiers,"interactions:action-move":addEventModifiers,"interactions:action-end":addEventModifiers,"interactions:after-action-start":t=>t.interaction.modification.restoreInteractionCoords(t),"interactions:after-action-move":t=>t.interaction.modification.restoreInteractionCoords(t),"interactions:stop":t=>t.interaction.modification.stop(t)}};export default e;
//# sourceMappingURL=base.prod.js.map