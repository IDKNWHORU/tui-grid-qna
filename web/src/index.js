import { App } from "./App.js";

customElements.define("pr-app", App);
const prApp = document.createElement("pr-app");
prApp.setAttribute("active-route", location.pathname);
document.body.append(prApp);
