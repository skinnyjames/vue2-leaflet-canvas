module.exports=function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=1)}([function(e,t,n){"use strict";var o=n(4),r=n.n(o),i=n(5);n.n(i);t.a={props:["locations"],mounted:function(){this.mapObject=new r.a.CanvasLayer,this.$parent._isMounted&&this.deferredMountedTo(this.$parent.mapObject)},beforeDestroy:function(){this.setVisible(!1)},methods:{deferredMountedTo:function(e){var t=this;t.parent=e;for(var n=["zoom","mousemove","drawing","click","resize","viewreset","move","moveend","mounted","unmounted"],o=0;o<n.length;o++)(function(e){function o(e){for(var n=e.getBufferedBounds(6),o=0;o<t.locations.length;o++)if(n.contains(t.locations[o].latlng))return!0;return!1}function r(e){for(var n=e.getBufferedBounds(6),o=[],r=0;r<t.locations.length;r++)n.contains(t.locations[r].latlng)&&o.push(t.locations[r]);return o}t.mapObject.on(n[e],function(i){if(t.locations)switch(i.locations=t.locations,n[e]){case"click":i.clickedLocations=r(i);break;case"mousemove":i.isMoused=o(i)}t.$emit("l-"+n[e],i)})})(o);t.mapObject.on("mounted",function(e){t.$emit("mounted",e)}),t.mapObject.addTo(e)},draw:function(){this.mapObject.draw()},setVisible:function(e,t){e!=t&&(e?this.mapObject.addTo(this.parent):this.parent.removeLayer(this.mapObject))}}}},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=n(6),i=n(3),s=i(o.a,r.a,!1,null,null,null);t.default=s.exports},function(e,t){e.exports=function(e,t,n,o,r,i){var s,a=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(s=e,a=e.default);var u="function"==typeof a?a.options:a;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),r&&(u._scopeId=r);var f;if(i?(f=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=f):o&&(f=o),f){var d=u.functional,l=d?u.render:u.beforeCreate;d?(u._injectStyles=f,u.render=function(e,t){return f.call(t),l(e,t)}):u.beforeCreate=l?[].concat(l,f):[f]}return{esModule:s,exports:a,options:u}}},function(e,t){e.exports=require("leaflet")},function(e,t){e.exports=require("@skinnyjames/leaflet-canvas")},function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",[e._t("default")],2)},r=[],i={render:o,staticRenderFns:r};t.a=i}]);
//# sourceMappingURL=vue2-leaflet-canvas.js.map