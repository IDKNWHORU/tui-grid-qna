import { getPersonalInfo } from "..";
import { getContentTitle } from "../components/ConetentTitle";

export const getCardContainerTemplate = () => {
  const cardsContainerTemplate = document.createElement("template");
  cardsContainerTemplate.id = "cards_container_template";
  cardsContainerTemplate.innerHTML = `<div id="cards_container"></div>`;

  return cardsContainerTemplate;
};

export const createCard = ({ idx, name, mbti }, { status }) => {
  return `<div idx="${idx}" class="${status}">
  <div class="card_plane card_plane--front">${name}</div>
  <div class="card_plane card_plane--back">${mbti}</div>
</div>`;
};

export const setFlip = (card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
    cardRecord(card);
  });
};

export const cardRecord = (card) => {
  const cardArr = JSON.parse(localStorage.getItem("cardStatus"));
  const idx = card.getAttribute("idx");
  const status = card.classList.value;

  cardArr[idx].status = status;
  localStorage.setItem("cardStatus", JSON.stringify(cardArr));
};

export const getCardStatus = () => {
  if (!localStorage.getItem("cardStatus")) {
    const cardList = JSON.parse(localStorage.getItem("personalInfo")).map(
      (_, idx) => {
        return {
          idx,
          status: "card",
        };
      }
    );

    localStorage.setItem("cardStatus", JSON.stringify(cardList));
  }

  return JSON.parse(localStorage.getItem("cardStatus"));
};

export const infiniteScroll = (lastCard, container) => {
  const io = new IntersectionObserver(
    (entry, observer) => {
      if (entry[0].isIntersecting) {
        const storage = getCardStatus();
        const lastIdx = lastCard.getAttribute("idx");

        const cards = [];

        for (let i = 0; i < lastIdx * 1 + 2; i++) {
          if (i === storage.length) break;

          const card = createCard(
            JSON.parse(localStorage.getItem("personalInfo"))[i],
            storage[i]
          );

          cards.push(card);
        }

        if (cards.length > 1) {
          container.innerHTML = cards.join("");
        } else if (cards.length === 1) {
          container.innerHTML = cards;
        }

        if (lastCard.getAttribute("idx") * 1 !== storage.length - 1) {
          infiniteScroll(container.lastElementChild, container);
        }

        io.unobserve(lastCard);
      }
    },
    {
      threshold: 0.7,
    }
  );

  io.observe(lastCard);
};

export const homePageRender = async (parent, template) => {
  const app = document.querySelector(".app");
  const personalInfo = await getPersonalInfo();
  const main = app.querySelector("main");
  const contentTitle = getContentTitle("Great PeoPle");
  const cardContainer = template.content
    .cloneNode(true)
    .querySelector("#cards_container");
  const cards = createCard(personalInfo[0], getCardStatus()[0]);
  cardContainer.innerHTML = cards;

  if (main === null) {
    parent.appendChild(contentTitle);
    parent.appendChild(cardContainer);
  } else if (main !== null) {
    parent.replaceChild(contentTitle, parent.querySelector(".content_title"));
    parent.replaceChild(cardContainer, parent.querySelector("#form_container"));
    app.replaceChild(parent, main);
  }
  app.replaceChild(parent, parent);

  const allCards = parent.querySelectorAll(".card");
  allCards.forEach((card, idx) => {
    setFlip(card);
  });

  infiniteScroll(allCards[allCards.length - 1], cardContainer);
};
