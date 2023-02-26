import { App } from "./App.js";
import { PersonalInfoRepository } from "./repository/PersonalInfoRepository.js";

const personalInfoRepository = new PersonalInfoRepository();
if (localStorage.getItem("personalInfo") === null) {
  const personalInfoList = await personalInfoRepository.callApi();
  localStorage.setItem(
    "personalInfo",
    JSON.stringify(
      personalInfoList.map((personalInfo, idx) => ({ idx, ...personalInfo }))
    )
  );
}

if (localStorage.getItem("cardStatus") === null) {
  localStorage.setItem("cardStatus", "[]");
}

customElements.define("pr-app", App);
const prApp = document.createElement("pr-app");
document.body.append(prApp);
