import{Interactable as e}from"../../core/Interactable.prod.js";import{Interaction as t}from"../../core/Interaction.prod.js";import*as r from"../../utils/domUtils.prod.js";import i from"../../utils/extend.prod.js";import s from"../../utils/is.prod.js";function o(e,t,i,o,n,a,p){if(!t)return!1;if(!0===t){const t=s.number(a.width)?a.width:a.right-a.left,r=s.number(a.height)?a.height:a.bottom-a.top;if(p=Math.min(p,Math.abs(("left"===e||"right"===e?t:r)/2)),t<0&&("left"===e?e="right":"right"===e&&(e="left")),r<0&&("top"===e?e="bottom":"bottom"===e&&(e="top")),"left"===e)return i.x<(t>=0?a.left:a.right)+p;if("top"===e)return i.y<(r>=0?a.top:a.bottom)+p;if("right"===e)return i.x>(t>=0?a.right:a.left)-p;if("bottom"===e)return i.y>(r>=0?a.bottom:a.top)-p}return!!s.element(o)&&(s.element(t)?t===o:r.matchesUpTo(o,t,n))}function n({iEvent:e,interaction:t}){if("resize"!==t.prepared.name||!t.resizeAxes)return;const r=e;t.interactable.options.resize.square?("y"===t.resizeAxes?r.delta.x=r.delta.y:r.delta.y=r.delta.x,r.axes="xy"):(r.axes=t.resizeAxes,"x"===t.resizeAxes?r.delta.y=0:"y"===t.resizeAxes&&(r.delta.x=0))}const a={id:"actions/resize",before:["actions/drag"],install(e){const{actions:t,browser:r,Interactable:i,defaults:o}=e;a.cursors=(e=>e.isIe9?{x:"e-resize",y:"s-resize",xy:"se-resize",top:"n-resize",left:"w-resize",bottom:"s-resize",right:"e-resize",topleft:"se-resize",bottomright:"se-resize",topright:"ne-resize",bottomleft:"ne-resize"}:{x:"ew-resize",y:"ns-resize",xy:"nwse-resize",top:"ns-resize",left:"ew-resize",bottom:"ns-resize",right:"ew-resize",topleft:"nwse-resize",bottomright:"nwse-resize",topright:"nesw-resize",bottomleft:"nesw-resize"})(r),a.defaultMargin=r.supportsTouch||r.supportsPointerEvent?20:10,i.prototype.resizable=function(t){return((e,t,r)=>s.object(t)?(e.options.resize.enabled=!1!==t.enabled,e.setPerAction("resize",t),e.setOnEvents("resize",t),s.string(t.axis)&&/^x$|^y$|^xy$/.test(t.axis)?e.options.resize.axis=t.axis:null===t.axis&&(e.options.resize.axis=r.defaults.actions.resize.axis),s.bool(t.preserveAspectRatio)?e.options.resize.preserveAspectRatio=t.preserveAspectRatio:s.bool(t.square)&&(e.options.resize.square=t.square),e):s.bool(t)?(e.options.resize.enabled=t,e):e.options.resize)(this,t,e)},t.map.resize=a,t.methodDict.resize="resizable",o.actions.resize=a.defaults},listeners:{"interactions:new"({interaction:e}){e.resizeAxes="xy"},"interactions:action-start"(e){(({iEvent:e,interaction:t})=>{if("resize"!==t.prepared.name||!t.prepared.edges)return;const r=e,s=t.rect;t._rects={start:i({},s),corrected:i({},s),previous:i({},s),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}},r.edges=t.prepared.edges,r.rect=t._rects.corrected,r.deltaRect=t._rects.delta})(e),n(e)},"interactions:action-move"(e){(({iEvent:e,interaction:t})=>{if("resize"!==t.prepared.name||!t.prepared.edges)return;const r=e,s=t.interactable.options.resize.invert,o="reposition"===s||"negate"===s,n=t.rect,{start:a,corrected:p,delta:c,previous:l}=t._rects;if(i(l,p),o){if(i(p,n),"reposition"===s){if(p.top>p.bottom){const e=p.top;p.top=p.bottom,p.bottom=e}if(p.left>p.right){const e=p.left;p.left=p.right,p.right=e}}}else p.top=Math.min(n.top,a.bottom),p.bottom=Math.max(n.bottom,a.top),p.left=Math.min(n.left,a.right),p.right=Math.max(n.right,a.left);p.width=p.right-p.left,p.height=p.bottom-p.top;for(const e in p)c[e]=p[e]-l[e];r.edges=t.prepared.edges,r.rect=p,r.deltaRect=c})(e),n(e)},"interactions:action-end"({iEvent:e,interaction:t}){if("resize"!==t.prepared.name||!t.prepared.edges)return;const r=e;r.edges=t.prepared.edges,r.rect=t._rects.corrected,r.deltaRect=t._rects.delta},"auto-start:check"(e){const{interaction:t,interactable:r,element:n,rect:p,buttons:c}=e;if(!p)return;const l=i({},t.coords.cur.page),d=r.options.resize;if(d&&d.enabled&&(!t.pointerIsDown||!/mouse|pointer/.test(t.pointerType)||0!=(c&d.mouseButtons))){if(s.object(d.edges)){const r={left:!1,right:!1,top:!1,bottom:!1};for(const e in r)r[e]=o(e,d.edges[e],l,t._latestPointer.eventTarget,n,p,d.margin||a.defaultMargin);r.left=r.left&&!r.right,r.top=r.top&&!r.bottom,(r.left||r.right||r.top||r.bottom)&&(e.action={name:"resize",edges:r})}else{const t="y"!==d.axis&&l.x>p.right-a.defaultMargin,r="x"!==d.axis&&l.y>p.bottom-a.defaultMargin;(t||r)&&(e.action={name:"resize",axes:(t?"x":"")+(r?"y":"")})}return!e.action&&void 0}}},defaults:{square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},cursors:null,getCursor({edges:e,axis:t,name:r}){const i=a.cursors;let s=null;if(t)s=i[r+t];else if(e){let t="";for(const r of["top","bottom","left","right"])e[r]&&(t+=r);s=i[t]}return s},defaultMargin:null};export default a;
//# sourceMappingURL=plugin.prod.js.map