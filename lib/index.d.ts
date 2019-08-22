declare type Option = {
    speed: number;
    trigger: string;
    transitionFunction: string;
    onOpen: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
    onClose: (element?: HTMLElement, trigger?: HTMLButtonElement) => void;
};
export default class Expand {
    elements: NodeList;
    option: Option;
    scrollTop: number;
    constructor(selector: string | NodeList, option: Partial<Option>);
    private setTrigger;
    expand(element: HTMLElement): Promise<void>;
    close(element: HTMLElement): Promise<{}>;
}
export {};
