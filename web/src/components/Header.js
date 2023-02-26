export const Gnb = class extends HTMLElement {
  #header;
  constructor() {
    super();
  }

  changeUrl(e) {
    const { target } = e;
    if (target.tagName === "SPAN") {
      const pageContent = document.querySelector("page-content");
      pageContent.setAttribute(
        "active-route",
        "/web/".concat(target.innerText.toLowerCase().replace("home", ""))
      );
    }
  }

  connectedCallback() {
    const header = document.createElement("header");
    header.addEventListener("click", this.changeUrl);
    this.#header = header;

    this.appendChild(header);
    this.render();
  }

  render() {
    this.#header.innerHTML = `
    <div class="header header_left">
        <span class="menu_name" id="menu_home">HOME</span>
    </div>
    <div class="header header_right">
        <span class="menu_name" id="menu_signup">SIGNUP</span>
    </div>`;
  }
};
