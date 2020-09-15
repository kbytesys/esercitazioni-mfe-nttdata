(function () {
  const prodotti = [
    {
      id: 1,
      prices: {
        standard: "10",
        platinum: "50",
      },
    },
    {
      id: 2,
      prices: {
        standard: "20",
        platinum: "30",
      },
    },
  ];

  class BuyButton extends HTMLElement {
    constructor() {
      super();

      var sh = this.attachShadow({ mode: "open" });
      this.wrapper = document.createElement("div");
      sh.appendChild(this.wrapper);

      this.idprodotto = this.getAttribute("idprodotto");
      this.version = this.getAttribute("version");
    }

    static get observedAttributes() {
      return ["idprodotto", "version"];
    }

    attributeChangedCallback(name, oldV, newV) {
      if (name === "idprodotto") {
        this.render(newV, this.version);
      }
      if (name === "version") {
        this.render(this.idprodotto, newV);
      }
    }

    connectedCallback() {
      this.render(this.idprodotto, this.version);
    }

    disconnectedCallback() {}

    render(idProdotto, version) {
      this.wrapper.innerHTML = `
                  <style>
                      .platinum{
                          width: 100%;
                          text-transform: uppercase;
                          color: #ffffff;
                          padding: .75rem;
                          font-size: . 875rem;
                          border-radius: .5rem;
                          background-color: rgba(113,128,150);
                      }
                      .standard{
                          width: 100%;
                          text-transform: uppercase;
                          color: #ffffff;
                          padding: .75rem;
                          font-size: . 875rem;
                          border-radius: .5rem;
                          background-color: #38a169;
                      }
                  </style>
                  <button class="${version}">BUY NOW ${prodotti[idProdotto].prices[version]} EURO !</button>
              `;
      this.wrapper.querySelector("button").addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("checkout:item_added", {
            bubbles: true,
            detail: { price: prodotti[idProdotto].prices[version] },
          })
        );
      });
    }
  }

  customElements.define("buy-button", BuyButton);
})();
