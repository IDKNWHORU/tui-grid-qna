import { App } from "./src/component/app.js";

customElements.define('table-app', App);
document.querySelector('.App').innerHTML = `<table-app></table-app>`;