const recoFilms = {
  tt0109040: [
    {
      title: "10,000 BC",
      id: "tt0443649",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMzc2NDMzNDY4Ml5BMl5BanBnXkFtZTYwNzM2Njk3._V1_SX300.jpg",
    },
    {
      title: "Bear Country",
      id: "tt0045545",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNWYxNDljMDEtMjBjMi00MGI4LTkxNDAtYTkzNzRiNmQyMzdlXkEyXkFqcGdeQXVyMzI5NjUyMDM@._V1_SX300.jpg",
    },
  ],
  tt0443649: [
    {
      title: "Bear Country",
      id: "tt0045545",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNWYxNDljMDEtMjBjMi00MGI4LTkxNDAtYTkzNzRiNmQyMzdlXkEyXkFqcGdeQXVyMzI5NjUyMDM@._V1_SX300.jpg",
    },
  ],
};

class InspireRecommendation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = this.shadowRoot;
  }

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
    this.root.innerHTML = `
    <style>
        :host {
            border: 1px solid red;
        }

        h1 {
            color: #CCCCCC;
        }
    </style>
    <h1>Raccomandazioni</h1>
    <div>
        ${recoFilms[id].map(
          (item) => `
                <a href="${item.id}">
                    <img src="${item.poster}"/>
                    ${item.title}
                </a>
            `
        )}
    </div>
`;
  }
}

window.customElements.define("inspire-recommendations", InspireRecommendation);
