import { HomePage } from "../page/HomePage";
import { SignupPage } from "../page/SignupPage";
import { ContentTitle } from "./ConetentTitle";

const registry = {
  "/web/": {
    title: "Great People",
    component: null,
  },
  "/web/signup": {
    title: "Sign Up, GreatePeoPle!",
    component: null,
  },
};

export const PageContent = class extends HTMLElement {
  #template;
  #contentTitle;
  #activeRoute;
  #homePage;
  #signupPage;
  #activateContainer;
  constructor() {
    super();
    this.#template = document.createElement("main");
    this.#template.setAttribute("id", "page_content");
    customElements.define("content-title", ContentTitle);
    customElements.define("home-page", HomePage);
    customElements.define("signup-page", SignupPage);
    this.#contentTitle = document.createElement("content-title");
    this.#homePage = document.createElement("home-page");
    this.#signupPage = document.createElement("signup-page");

    registry["/web/"].component = this.#homePage;
    registry["/web/signup"].component = this.#signupPage;
    this.#template.appendChild(this.#contentTitle);
  }

  attributeChangedCallback(_name, _oldValue, newValue) {
    this.#activeRoute = newValue;
    window.history.pushState(null, null, newValue);
    this.render();
  }

  static get observedAttributes() {
    return ["active-route"];
  }

  connectedCallback() {
    this.appendChild(this.#template);
  }

  render() {
    this.#contentTitle.setAttribute("title", registry[this.#activeRoute].title);

    if (this.#activateContainer === undefined) {
      this.#template.appendChild(registry[this.#activeRoute].component);
    } else {
      this.#activateContainer.replaceWith(
        registry[this.#activeRoute].component
      );
    }

    this.#activateContainer = registry[this.#activeRoute].component;
  }
};
