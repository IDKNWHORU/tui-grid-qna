import { Gnb } from "./components/Header";
import { PageContent } from "./components/PageContent";

export const App = class extends HTMLElement {
  #tempate;
  #gnb;
  #pageContent;
  constructor() {
    super();
    customElements.define("gnb-component", Gnb);
    customElements.define("page-content", PageContent);
    const tempate = document.createElement("div");
    tempate.setAttribute("class", "app");
    this.#tempate = tempate;
    this.#gnb = document.createElement("gnb-component");
    this.#pageContent = document.createElement("page-content");
  }

  connectedCallback() {
    this.#pageContent.setAttribute("active-route", location.pathname);
    this.#tempate.appendChild(this.#gnb);
    this.#tempate.appendChild(this.#pageContent);
    this.appendChild(this.#tempate);
  }
};
