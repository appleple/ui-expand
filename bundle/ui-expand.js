!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Expand=t():e.Expand=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="bundle",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=function(){return(o=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},i={speed:300,trigger:".js-expand-btn",transitionFunction:"ease-out",onOpen:function(){},onClose:function(){},beforeOpen:function(){},beforeClose:function(){}},r=function(){function e(e,t){var n=this;e instanceof NodeList?this.elements=[].slice.call(e):"string"==typeof e?this.elements=[].slice.call(document.querySelectorAll(e)):e instanceof HTMLElement&&(this.elements=[e]),this.option=o({},i,t),this.elements.forEach(function(e){n.setTrigger(e)})}return e.prototype.setTrigger=function(e){var t=this;e.dataset.expand="false";var n=e.querySelector(this.option.trigger);n&&n.addEventListener("click",function(o){"false"===e.dataset.expand?(e.dataset.expand="true",t.expand(e,n).then(function(){t.option.onOpen(e,n)})):(e.dataset.expand="false",t.close(e,n).then(function(){t.option.onClose(e,n)}))})},e.prototype.addElement=function(e){this.elements.push(e),this.setTrigger(e)},e.prototype.expand=function(e,t){var n=this;return new Promise(function(o){n.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;var i=e.getBoundingClientRect(),r=n.option.speed/1e3,s=n.option.transitionFunction,l=e.cloneNode();e.insertAdjacentElement("afterend",l),e.style.position="fixed",e.style.width=i.width+"px",e.style.height=i.height+"px",e.style.minHeight=i.height+"px",e.style.left="0px",e.style.top="0px",e.style.transform="translate("+i.x+"px, "+i.y+"px)",n.option.beforeOpen(e,t),setTimeout(function(){e.style.transition="all "+r+"s "+s,requestAnimationFrame(function(){e.style.transform="translate(0px, 0px)",e.style.width=window.innerWidth+"px",e.style.minHeight="100vh",setTimeout(function(){e.style.left="0",e.style.top="0",e.style.width="100%",e.style.transform="",o()},n.option.speed)})},10),document.body.style.height="100vh",document.body.style.overflow="hidden"})},e.prototype.close=function(e,t){var n=this;return new Promise(function(o){requestAnimationFrame(function(){var i=e.nextElementSibling;if(i){var r=i.getBoundingClientRect();e.style.width=r.width+"px",e.style.minHeight=r.height+"px",e.style.transform="translate("+r.x+"px, "+r.y+"px)",document.body.style.height="",document.body.style.overflow="",window.scrollTo({top:n.scrollTop,left:0}),n.option.beforeClose(e,t),setTimeout(function(){e.style.transform="",e.style.width="",e.style.height="",e.style.transition="",e.style.minHeight="",e.style.position="";var t=e.parentElement;t&&t.removeChild(i),o()},n.option.speed)}})})},e}();t.default=r}]).default});