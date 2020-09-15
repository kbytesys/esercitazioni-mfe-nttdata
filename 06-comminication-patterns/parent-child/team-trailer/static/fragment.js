(function() {

    const trailers = [
        "ZGlFA-miRLw",
        "5BgjARBER_k"
    ]

    class TrailerPlayer extends HTMLElement {
        constructor() {
            super();

        }

        connectedCallback() {
            this.render(this.getAttribute('filmid'));
        }

        static get observedAttributes() {
            return ['filmid']
        }

        attributeChargedCallback(name, oldValue, newValue) {
            if (name === 'filmid') {
                this.render(newValue);
            }
        }

        render(filmid) {
            this.innerHTML = `
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailers[filmid]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    }

    window.customElements.define("trailer-player", TrailerPlayer);
})();
