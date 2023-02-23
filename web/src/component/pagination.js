const TEMPLATE = `<div class="area" id="pagination">footer</div>`;

export default class Pagination extends HTMLElement {
    connectedCallback() {
        this.innerHTML = TEMPLATE;
    }
}