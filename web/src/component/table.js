const TEMPLATE = `<div class="area" id="table">table area</div>`

export default class TableList extends HTMLElement {
    connectedCallback() {
        this.innerHTML = TEMPLATE;
    }
}