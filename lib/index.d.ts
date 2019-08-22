declare type Option = {
    speed: number;
    trigger: string;
    transitionFunction: string;
    onOpen: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
    onClose: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
};
export default class Expand {
    elements: HTMLElement[];
    option: Option;
    scrollTop: number;
    constructor(selector: string | NodeList | HTMLElement, option: Partial<Option>);
    private setTrigger;
    addElement(element: HTMLElement): void;
    expand(element: HTMLElement): Promise<void>;
    close(element: HTMLElement): Promise<{}>;
}
export {};
