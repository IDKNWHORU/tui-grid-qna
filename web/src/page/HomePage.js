import { CardRepository } from "../repository/CardRepository";

export const HomePage = class extends HTMLElement {
  #template;
  #cardRepository;
  #infinitescrollObserver;
  #cardList;
  #idx;
  constructor() {
    super();
    this.#template = document.createElement("div");
    this.#template.setAttribute("id", "cards_container");
    this.#template.addEventListener("click", ({ target }) => {
      if (
        target.id === "cards_container" ||
        target.tagName === "CARD-COMPONENT"
      ) {
        return;
      }
      console.log(target);
      const card = target.closest(".card");
      card.classList.toggle("is-flipped");
      const idx = card.getAttribute("idx");
      const status = card.getAttribute("class");
      this.#cardRepository.update(Number(idx), status);
    });
    this.createInfinitescrollObserver();
  }

  createInfinitescrollObserver() {
    this.#infinitescrollObserver = new IntersectionObserver(
      (entries, observe) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observe.unobserve(entry.target);
            this.#render();
          }
        }
      },
      { root: null, threshold: 0.7 }
    );
  }

  connectedCallback() {
    this.#cardRepository = new CardRepository();
    this.#cardList = this.#cardRepository.getAll();
    this.#idx = 0;

    this.#render();
    this.appendChild(this.#template);
  }

  #render() {
    if (this.#idx >= this.#cardList.length) {
      return;
    }
    const { idx, status, name, mbti } = this.#cardList[this.#idx++];
    console.log({ idx, status, name, mbti });

    const card = document.createElement("card-component");
    card.setAttribute("idx", idx);
    card.setAttribute("status", status);
    card.setAttribute("name", name);
    card.setAttribute("mbti", mbti);
    this.#infinitescrollObserver.observe(card);
    this.#template.appendChild(card);
  }
};
