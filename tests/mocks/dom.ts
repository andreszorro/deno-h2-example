import { DOMParser } from "deno_dom/deno-dom-wasm.ts";

window.document = new DOMParser().parseFromString("<html></html>", "text/html");
