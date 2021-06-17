import { assertExists } from "std/testing/asserts.ts";

import "../mocks/globals.ts";
import "../mocks/dom.ts";
import HelloWorld from "../../static/widgets/hello-world.js";

Deno.test("> HelloWorld Widget", () => {
  const helloWorld: HelloWorld = new HelloWorld();

  assertExists(helloWorld, "shadowRoot property not created");
  helloWorld.connectedCallback();
});
