import { ContentTitle } from "./components/ConetentTitle";
import { Gnb } from "./components/Header";

export const App = class extends HTMLElement {
  #tempate;
  #routes = {
    "/web/": {
      title: "Great People",
      activeRoute: "home-page",
    },
    "/web/signup": {
      title: "Sign Up, GreatePeoPle!",
      activeRoute: "signup-page",
    },
  };
  #gnb;
  #contentTitle;
  #activeRoute;
  constructor() {
    super();
    customElements.define("gnb-component", Gnb);
    customElements.define("content-title", ContentTitle);
    const tempate = document.createElement("div");
    tempate.setAttribute("class", ".app");
    this.#tempate = tempate;
    this.#gnb = document.createElement("gnb-component");
    this.#contentTitle = document.createElement("content-title");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.#activeRoute = newValue;
    window.history.pushState(null, null, newValue);
    this.render();
  }

  static get observedAttributes() {
    return ["active-route"];
  }

  connectedCallback() {
    this.#tempate.appendChild(this.#gnb);
    this.#tempate.appendChild(this.#contentTitle);
    this.appendChild(this.#tempate);
  }

  render() {
    this.#contentTitle.setAttribute(
      "title",
      this.#routes[this.#activeRoute].title
    );
  }
};
