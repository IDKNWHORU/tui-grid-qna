export const Card = class extends HTMLElement {
  #template;
  constructor() {
    super();
    this.#template = document.createElement("div");
    // this.#template.setAttribute("status", this.getAttribute("status"));
    // this.#template.setAttribute("name", this.getAttribute("name"));
    // this.#template.setAttribute("mbti", this.getAttribute("mbti"));
    // this.#template.addEventListener("click", this.#onClick);
  }

  connectedCallback() {
    this.#template.setAttribute("class", this.getAttribute("status"));
    this.#template.setAttribute("idx", this.getAttribute("idx"));
    this.#template.innerHTML = `<div class="card_plane card_plane--front">${this.getAttribute(
      "name"
    )}</div>
    <div class="card_plane card_plane--back">${this.getAttribute(
      "mbti"
    )}</div>`;
    this.appendChild(this.#template);
  }
};
