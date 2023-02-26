export const PersonalInfoRepository = class {
  async callApi() {
    return fetch("../web/src/data/new_data.json").then((res) => res.json());
  }

  getAll() {
    const stringifiedPersonalInfo = localStorage.getItem("personalInfo");

    return JSON.parse(stringifiedPersonalInfo);
  }

  add(newPersonalInfo) {
    const personalInfoList = this.getAll();
    const newPersonalInfoList = [
      ...personalInfoList,
      {
        ...newPersonalInfo,
        idx: personalInfoList.length,
      },
    ];

    localStorage.setItem("personalInfo", JSON.stringify(newPersonalInfoList));
  }

  find(email, nickname) {
    const personalInfoList = this.getAll();

    return personalInfoList.find(
      (personalInfo) =>
        personalInfo.email === email || personalInfo.nickname === nickname
    );
  }
};
