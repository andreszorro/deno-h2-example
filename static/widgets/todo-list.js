class TodoList extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.setAttribute("role", "listbox");

    const template = `
      <style>
        :host {
          contain: content;
          display: block;
          overflow-x: hidden;
          overflow-y: auto;
          border-radius: 10px;
          background-color: white;
          font-family: Arial;
          max-width: 300px;
          margin: 0 auto;
          box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.2);
        }

      </style>
      <slot>
        <p>
          Yeah! Nothing to do.
        </p>
      </slot>
    `;

    this.shadow.innerHTML = template;
  }
}

window?.customElements?.define("todo-list", TodoList);

export default TodoList;
