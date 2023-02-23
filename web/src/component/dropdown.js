const TEMPLATE = `<div class="area" id="dropdown">dropdown</div>`

export default class DropDown extends HTMLElement {
    connectedCallback() {
        this.innerHTML = TEMPLATE;
    }
}