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
    onClose: function () { }
};
var Expand = /** @class */ (function () {
    function Expand(selector, option) {
        if (selector instanceof NodeList) {
            this.elements = selector;
        }
        else {
            this.elements = document.querySelectorAll(selector);
        }
        this.option = __assign({}, defaults, option);
        this.setTrigger();
    }
    Expand.prototype.setTrigger = function () {
        var _this = this;
        [].forEach.call(this.elements, function (element) {
            element.dataset.expand = "false";
            var trigger = element.querySelector(_this.option.trigger);
            if (trigger) {
                trigger.addEventListener('click', function (e) {
                    if (element.dataset.expand === "false") {
                        element.dataset.expand = "true";
                        _this.expand(element).then(function () {
                            _this.option.onOpen(element, trigger);
                        });
                    }
                    else {
                        element.dataset.expand = "false";
                        _this.close(element).then(function () {
                            _this.option.onClose(element, trigger);
                        });
                    }
                });
            }
        });
    };
    Expand.prototype.expand = function (element) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            var rect = element.getBoundingClientRect();
            var speed = _this.option.speed / 1000;
            var transitionFunction = _this.option.transitionFunction;
            element.style.transition = "all " + speed + "s " + transitionFunction;
            requestAnimationFrame(function () {
                element.style.transform = "translate(" + -rect.x + "px, " + -rect.y + "px)";
                element.style.width = "100%";
                element.style.minHeight = "100vh";
                setTimeout(function () {
                    element.style.transition = "";
                    element.style.left = "0";
                    element.style.top = "0";
                    element.style.width = "100%";
                    element.style.transform = "";
                    element.style.position = "fixed";
                    resolve();
                }, _this.option.speed);
            });
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
        });
    };
    Expand.prototype.close = function (element) {
        var _this = this;
        return new Promise(function (resolve) {
            element.style.position = "";
            element.style.left = "";
            element.style.top = "";
            element.style.width = "";
            requestAnimationFrame(function () {
                var rect = element.getBoundingClientRect();
                element.style.transform = "translate(" + -rect.x + "px, " + -rect.y + "px)";
                element.style.width = "100%";
                requestAnimationFrame(function () {
                    var speed = _this.option.speed / 1000;
                    var transitionFunction = _this.option.transitionFunction;
                    element.style.transition = "all " + speed + "s " + transitionFunction;
                    element.style.transform = 'translate(0px, 0px)';
                    element.style.width = rect.width + "px";
                    element.style.minHeight = "";
                    document.body.style.height = "";
                    document.body.style.overflow = "";
                    window.scrollTo({
                        top: _this.scrollTop,
                        left: 0
                    });
                    setTimeout(function () {
                        element.style.transform = "";
                        element.style.width = "";
                        element.style.transition = "";
                        resolve();
                    }, _this.option.speed);
                });
            });
        });
    };
    return Expand;
}());
export default Expand;
//# sourceMappingURL=index.js.map