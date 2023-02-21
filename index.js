const myElement = class extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const template = document.createElement('div');
        template.innerHTML = this.getAttribute('children');
        shadow.appendChild(template);
    }
}

customElements.define('my-element', myElement);

document.body.innerHTML = `<my-element children="<p>hello this rendered by my-element</P>"/>`

