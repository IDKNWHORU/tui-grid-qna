export const App = class extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
    }
}