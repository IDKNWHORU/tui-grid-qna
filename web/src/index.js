import { App } from "./App.js";

customElements.define("pr-app", App);
const prApp = document.createElement("pr-app");
document.body.append(prApp);
