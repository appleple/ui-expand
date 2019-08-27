type Option = {
  speed: number,
  trigger: string,
  transitionFunction: string,
  onOpen: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
  onClose: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
  beforeOpen: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
  beforeClose: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
}

const defaults = {
  speed: 300,
  trigger: ".js-expand-btn",
  transitionFunction: "ease-out",
  onOpen: () => {},
  onClose: () => {},
  beforeOpen: () => {},
  beforeClose: () => {}
} as Option;

export default class Expand {
  elements!: HTMLElement[];
  option!: Option;
  scrollTop!: number;

  constructor(selector: string | NodeList | HTMLElement, option: Partial<Option>) {
    if (selector instanceof NodeList) {
      this.elements = [].slice.call(selector);
    } else if (typeof selector === "string") {
      this.elements = [].slice.call(document.querySelectorAll(selector));
    } else if (selector instanceof HTMLElement) {
      this.elements = [selector];
    }
    this.option = { ...defaults, ...option };
    this.elements.forEach((element) => {
      this.setTrigger(element);
    });
  }

  private setTrigger(element: HTMLElement) {
    element.dataset.expand = "false";
    const trigger = element.querySelector<HTMLButtonElement>(this.option.trigger);
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (element.dataset.expand === "false") {
          element.dataset.expand = "true";
          this.expand(element, trigger).then(() => {
            this.option.onOpen(element, trigger);
          });
        } else {
          element.dataset.expand = "false";
          this.close(element, trigger).then(() => {
            this.option.onClose(element, trigger);
          });
        }
      });
    }
  }

  public addElement(element: HTMLElement) {
    this.elements.push(element);
    this.setTrigger(element);
  }

  public expand(element: HTMLElement, trigger: HTMLButtonElement): Promise<void> {
    return new Promise((resolve) => {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const rect = element.getBoundingClientRect() as DOMRect;
      const speed = this.option.speed / 1000;
      const { transitionFunction } = this.option;
      const clone = element.cloneNode() as HTMLElement;
      element.insertAdjacentElement('afterend', clone);
      element.style.position = "fixed";
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
      element.style.minHeight = `${rect.height}px`;
      element.style.left = '0px';
      element.style.top = '0px';
      element.style.transform = `translate(${rect.x}px, ${rect.y}px)`;
      this.option.beforeOpen(element, trigger);
      setTimeout(() => {
        element.style.transition = `all ${speed}s ${transitionFunction}`;
        requestAnimationFrame(() => {
          element.style.transform = `translate(0px, 0px)`;
          element.style.width = `${window.innerWidth}px`;
          element.style.minHeight = "100vh";
          setTimeout(() => {
            // element.style.transition = "";
            element.style.left = "0";
            element.style.top = "0";
            element.style.width = "100%";
            element.style.transform = "";
            resolve();
          }, this.option.speed);
        });
      }, 10);
      document.body.style.height = "100vh";
      document.body.style.overflow = "hidden";
    });
  }

  public close(element: HTMLElement, trigger: HTMLButtonElement) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const clone = element.nextElementSibling;
        if (!clone) {
          return;
        }
        const rect = clone.getBoundingClientRect() as DOMRect;

        element.style.width = `${rect.width}px`;
        element.style.minHeight = `${rect.height}px`;
        element.style.transform = `translate(${rect.x}px, ${rect.y}px)`;
        document.body.style.height = "";
        document.body.style.overflow = "";

        window.scrollTo({
          top: this.scrollTop,
          left: 0
        });
        this.option.beforeClose(element, trigger);
        setTimeout(() => {
          element.style.transform = "";
          element.style.width = "";
          element.style.height = "";
          element.style.transition = "";
          element.style.minHeight = "";
          element.style.position = "";
          const parent = element.parentElement;
          if (parent) {
            parent.removeChild(clone);
          }
          resolve();
        }, this.option.speed);
      });
    });
  }
}