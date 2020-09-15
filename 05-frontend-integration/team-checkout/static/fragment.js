(function () {
  const prices = {
    tt0109040: 33.44,
    tt0045545: 44.88,
    tt0443649: "free",
  };

  class CheckoutBuy extends HTMLElement {
    connectedCallback() {
      const id = this.getAttribute("filmid");
      this.render(id);
    }

    static get observedAttributes() {
      return ["filmid"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (name === "filmid" && this.shadowRoot !== undefined) {
        this.render(newVal);
      }
    }

    render(id) {
      this.innerHTML = `
          <button class="p-2 rounded bg-green-500 text-white uppercase">BUY NOW for ${prices[id]} Bitcoins</button>
          `;
      this.querySelector("button").addEventListener("click", () => {
        alert("Thank you ❤️");
      });
    }
  }

  window.customElements.define("checkout-buy", CheckoutBuy);
})();
