import { CardRepository } from "../repository/CardRepository";

export const HomePage = class extends HTMLElement {
  #template;
  #cardRepository;
  constructor() {
    super();
    this.#template = document.createElement("div");
    this.#template.setAttribute("id", "cards_container");
    this.#template.addEventListener("click", ({ target }) => {
      if (target.id === "cards_container") {
        return;
      }
      const card = target.closest(".card");
      card.classList.toggle("is-flipped");
      const idx = card.getAttribute("idx");
      const status = card.getAttribute("class");
      console.log();
      this.#cardRepository.update(Number(idx), status);
    });
  }

  connectedCallback() {
    this.#cardRepository = new CardRepository();
    const cards = this.#cardRepository.getAll();
    const cardsComponent = cards.map(
      (card) => `<div idx="${card.idx}" class="${card.status}">
        <div class="card_plane card_plane--front">${card.name}</div>
        <div class="card_plane card_plane--back">${card.mbti}</div>
      </div>`
    );

    this.#template.innerHTML = cardsComponent.join("");
    this.appendChild(this.#template);
  }
};
