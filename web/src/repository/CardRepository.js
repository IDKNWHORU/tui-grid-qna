import { PersonalInfoRepository } from "./PersonalInfoRepository";

export const CardRepository = class {
  #personalRepository;

  constructor() {
    this.#personalRepository = new PersonalInfoRepository();
    const cardStatusList = this.#getCardStatusList().map(({ status }, idx) => ({
      idx,
      status,
    }));
    localStorage.setItem("cardStatus", JSON.stringify(cardStatusList));
  }

  #getCardStatusList() {
    const stringifiedCardStatus = localStorage.getItem("cardStatus");
    const cardStatusList = JSON.parse(stringifiedCardStatus);

    const personalInfoList = this.#personalRepository.getAll();

    return personalInfoList.map(({ name, mbti }, idx) => {
      if (cardStatusList[idx] === undefined) {
        return {
          idx,
          status: "card",
          name,
          mbti,
        };
      } else {
        return {
          idx,
          status: cardStatusList[idx].status,
          name,
          mbti,
        };
      }
    });
  }

  getAll() {
    return this.#getCardStatusList();
  }

  update(idx, status) {
    const cardStatusList = this.#getCardStatusList().map((cardStatus) => {
      if (cardStatus.idx === idx) {
        return {
          idx,
          status,
        };
      }

      return { idx: cardStatus.idx, status: cardStatus.status };
    });

    localStorage.setItem("cardStatus", JSON.stringify(cardStatusList));
  }
};
