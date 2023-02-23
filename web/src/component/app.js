export default class App extends HTMLElement {
    template;
    constructor() {
        super();

        this.template = document.getElementById('App');
    }

    connectedCallback() {
        window.requestAnimationFrame(()=>{
            const content = this.template.content.firstElementChild.cloneNode(true);

            this.appendChild(content);
        })
    }
}