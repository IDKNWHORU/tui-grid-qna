import App from "./src/component/app.js";
import DropDown from "./src/component/dropdown.js";
import pagination from "./src/component/pagination.js";
import TableList from "./src/component/table.js";

const template = `<template id="App">
    <div class="App">
        <div id="page_title">Grepp Enterprise</div>
        <table-dropdown></table-dropdown>
        <table-list></table-list>
        <table-footer></table-footer>
        </div>
</template>`;

document.body.innerHTML = template

customElements.define('table-app', App);
customElements.define('table-dropdown', DropDown);
customElements.define('table-list', TableList);
customElements.define('table-footer', pagination);
document.body.appendChild(document.createElement('table-app'));