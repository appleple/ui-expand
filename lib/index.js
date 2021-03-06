var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaults = {
    speed: 300,
    trigger: ".js-expand-btn",
    transitionFunction: "ease-out",
    onOpen: function () { },
    onClose: function () { },
    beforeOpen: function () { },
    beforeClose: function () { }
};
var Expand = /** @class */ (function () {
    function Expand(selector, option) {
        var _this = this;
        if (selector instanceof NodeList) {
            this.elements = [].slice.call(selector);
        }
        else if (typeof selector === "string") {
            this.elements = [].slice.call(document.querySelectorAll(selector));
        }
        else if (selector instanceof HTMLElement) {
            this.elements = [selector];
        }
        this.option = __assign({}, defaults, option);
        this.elements.forEach(function (element) {
            _this.setTrigger(element);
        });
    }
    Expand.prototype.setTrigger = function (element) {
        var _this = this;
        element.dataset.expand = "false";
        var trigger = element.querySelector(this.option.trigger);
        if (trigger) {
            trigger.addEventListener('click', function (e) {
                if (element.dataset.expand === "false") {
                    element.dataset.expand = "true";
                    _this.expand(element, trigger).then(function () {
                        _this.option.onOpen(element, trigger);
                    });
                }
                else {
                    element.dataset.expand = "false";
                    _this.close(element, trigger).then(function () {
                        _this.option.onClose(element, trigger);
                    });
                }
            });
        }
    };
    Expand.prototype.addElement = function (element) {
        this.elements.push(element);
        this.setTrigger(element);
    };
    Expand.prototype.expand = function (element, trigger) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var rect = element.getBoundingClientRect();
            var speed = _this.option.speed / 1000;
            var transitionFunction = _this.option.transitionFunction;
            var clone = element.cloneNode();
            element.insertAdjacentElement('afterend', clone);
            element.style.position = "fixed";
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
            element.style.minHeight = rect.height + "px";
            element.style.left = '0px';
            element.style.top = '0px';
            element.style.transform = "translate(" + rect.x + "px, " + rect.y + "px)";
            _this.option.beforeOpen(element, trigger);
            setTimeout(function () {
                element.style.transition = "all " + speed + "s " + transitionFunction;
                requestAnimationFrame(function () {
                    element.style.transform = "translate(0px, 0px)";
                    element.style.width = window.innerWidth + "px";
                    element.style.minHeight = "100vh";
                    setTimeout(function () {
                        // element.style.transition = "";
                        element.style.left = "0";
                        element.style.top = "0";
                        element.style.width = "100%";
                        element.style.transform = "";
                        resolve();
                    }, _this.option.speed);
                });
            }, 10);
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
        });
    };
    Expand.prototype.close = function (element, trigger) {
        var _this = this;
        return new Promise(function (resolve) {
            requestAnimationFrame(function () {
                var clone = element.nextElementSibling;
                if (!clone) {
                    return;
                }
                var rect = clone.getBoundingClientRect();
                element.style.width = rect.width + "px";
                element.style.minHeight = rect.height + "px";
                element.style.transform = "translate(" + rect.x + "px, " + rect.y + "px)";
                document.body.style.height = "";
                document.body.style.overflow = "";
                window.scrollTo({
                    top: _this.scrollTop,
                    left: 0
                });
                _this.option.beforeClose(element, trigger);
                setTimeout(function () {
                    element.style.transform = "";
                    element.style.width = "";
                    element.style.height = "";
                    element.style.transition = "";
                    element.style.minHeight = "";
                    element.style.position = "";
                    var parent = element.parentElement;
                    if (parent) {
                        parent.removeChild(clone);
                    }
                    resolve();
                }, _this.option.speed);
            });
        });
    };
    return Expand;
}());
export default Expand;
//# sourceMappingURL=index.js.map