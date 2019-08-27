declare type Option = {
    speed: number;
    trigger: string;
    transitionFunction: string;
    onOpen: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
    onClose: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
    beforeOpen: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
    beforeClose: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
};
export default class Expand {
    elements: HTMLElement[];
    option: Option;
    scrollTop: number;
    constructor(selector: string | NodeList | HTMLElement, option: Partial<Option>);
    private setTrigger;
    addElement(element: HTMLElement): void;
    expand(element: HTMLElement, trigger: HTMLButtonElement): Promise<void>;
    close(element: HTMLElement, trigger: HTMLButtonElement): Promise<{}>;
}
export {};
