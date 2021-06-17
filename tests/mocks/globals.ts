import { Element, HTMLDocument } from "deno_dom/deno-dom-wasm.ts";

export class StubHTMLElement {
  shadowRoot: Element | null = null;
  attachShadow() {
    const newElem = window.document?.createElement("DIV") || null;
    this.shadowRoot = newElem;

    interface ElementWithAppend {
      append: () => (Record<string, unknown>);
    }

    // Typescript gymnastics to account for an Element type which is not properly a ShadowRoot
    (newElem as unknown as ElementWithAppend).append = () => ({});
    return newElem;
  }
  setAttribute(...args: unknown[]) {
    return args;
  }
}

declare global {
  interface Window {
    document: HTMLDocument | null;
    HTMLElement: unknown;
  }
}

window.HTMLElement = StubHTMLElement;
