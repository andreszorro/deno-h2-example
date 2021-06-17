class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("Custom square element added to page.");

    // Create (nested) span elements
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const info = wrapper.appendChild(document.createElement("span"));
    info.setAttribute("class", "info");
    // Take attribute content and put it inside the info span
    info.textContent = "Hello World!";

    // Load some CSS to apply to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "styles.css");

    // attach the created elements to the shadow DOM
    this.shadowRoot.append(linkElem, wrapper);
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(/* name, oldValue, newValue */) {
    console.log("Custom square element attributes changed.");
  }
}

window?.customElements?.define("hello-world", HelloWorld);

export default HelloWorld;
