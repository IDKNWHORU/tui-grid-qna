export const ContentTitle = class extends HTMLElement {
  #template;
  #title;
  constructor() {
    super();
    this.#template = document.createElement("div");
    this.#template.setAttribute("class", "content_title");
  }

  attributeChangedCallback(_name, _oldValue, newValue) {
    this.#title = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    this.appendChild(this.#template);
  }

  render() {
    this.#template.innerHTML = `<h1>${this.#title}</h1>`;
  }
};
