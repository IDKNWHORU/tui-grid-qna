import * as Header from "./components/Header.js";
import { getCardContainerTemplate, homePageRender } from "./page/HomePage.js";
import { createFormTemplate, signupPageRender } from "./page/SignupPage.js";

const createMainTemplate = () => {
  const mainTemplate = document.createElement("template");
  mainTemplate.id = "main_template";
  mainTemplate.innerHTML = `<main id="page_content"></main>`;

  return mainTemplate;
};

export const getPersonalInfo = async () => {
  if (!localStorage.getItem("personalInfo")) {
    const newData = await fetch("./src/data/new_data.json").then((res) =>
      res.json()
    );
    localStorage.setItem(
      "personalInfo",
      JSON.stringify(newData.map((data, idx) => ({ idx, ...data })))
    );
  }

  return JSON.parse(localStorage.getItem("personalInfo"));
};

const cardsContainerTemplate = getCardContainerTemplate();
const formTemplate = createFormTemplate();
const maintemplate = createMainTemplate();

document.body.appendChild(cardsContainerTemplate);
document.body.appendChild(formTemplate);
document.body.appendChild(maintemplate);

const app = document.querySelector(".app");
const gnb = Header.getGnb();
const main = maintemplate.content.cloneNode(true);

Header.setURL(gnb.querySelector("#menu_home"), "/web/", () => {
  homePageRender(
    app.querySelector("main").cloneNode(true),
    cardsContainerTemplate
  );
});
Header.setURL(gnb.querySelector("#menu_signup"), "/web/signup", () => {
  signupPageRender(app.querySelector("main").cloneNode(true), formTemplate);
});

app.appendChild(gnb);
signupPageRender(main.querySelector("main"), formTemplate);
app.appendChild(main);
