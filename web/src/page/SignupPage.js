// import { getPersonalInfo } from "..";

export const createInputField = ({ id, placeholder, isRequired }) => {
  return `<span class="form_elem">
    <label for="${id}">${placeholder}<span class="mark">(필수*)</span></label>
    <input id="${id}" placeholder="${placeholder}" required>
  </span>`;
};

export const createSelectField = ({ id, placeholder, options, isRequired }) => {
  const requiredMark = isRequired ? `<span class="mark">(필수*)</span>` : "";
  const optionstr = options.map((option) => {
    return `<option value="${option.value}">${option.text}</option>`;
  });
  return `<span class="form_elem">
    <label for="${id}">${placeholder}${requiredMark}</label>
    <select id="${id}" name="${id}" ${isRequired ? "required" : ""}>
        ${optionstr.join("")}
    </select>
  </span>`;
};

const createSubmitButton = () => {
  return `<span class="form_elem">
    <button type="submit">등록</button>
  </span>`;
};

export const createFormTemplate = () => {
  const formTemplate = document.createElement("template");
  formTemplate.id = "input_template";
  formTemplate.innerHTML = `<div id="form_container">
    <form id="grepp_form"></form>
  </div>`;

  return formTemplate;
};

export const signupPageRender = async (parent, template) => {
  const app = document.querySelector(".app");
  const main = app.querySelector("main");
  const formContainer = template.content
    .cloneNode(true)
    .querySelector("#form_container");
  const form = formContainer.querySelector("#grepp_form");
  const inputFields = [
    { id: "name", placeholder: "이름" },
    { id: "email", placeholder: "이메일" },
    { id: "nickname", placeholder: "닉네임" },
  ].map(createInputField);

  const selectFields = [
    {
      id: "role",
      placeholder: "직군",
      isRequired: true,
      options: [
        { value: "", text: "직군을 선택해주세요" },
        { value: "backend", text: "백엔드" },
        { value: "frontend", text: "프론트엔드" },
        { value: "fullstack", text: "풀스택" },
      ],
    },
    {
      id: "mbti",
      placeholder: "MBTI",
      options: [
        { value: "", text: "MBTI를 선택해주세요" },
        { value: "ENFJ", text: "ENFJ" },
        { value: "ENTJ", text: "ENTJ" },
        { value: "ENFP", text: "ENFP" },
        { value: "ENTP", text: "ENTP" },
        { value: "ESFJ", text: "ESFJ" },
        { value: "ESTJ", text: "ESTJ" },
        { value: "ESFP", text: "ESFP" },
        { value: "ESTP", text: "ESTP" },
        { value: "INFJ", text: "INFJ" },
        { value: "INTJ", text: "INTJ" },
        { value: "INFP", text: "INFP" },
        { value: "INTP", text: "INTP" },
        { value: "ISFJ", text: "ISFJ" },
        { value: "ISTJ", text: "ISTJ" },
        { value: "ISFP", text: "ISFP" },
        { value: "ISTP", text: "ISTP" },
      ],
    },
  ].map(createSelectField);

  const submitButton = createSubmitButton();

  form.innerHTML = inputFields
    .concat(selectFields)
    .concat(submitButton)
    .join("");

  if (main === null) {
    parent.appendChild(formContainer);
    app.appendChild(parent);
  } else if (app.querySelector("main") !== null) {
    parent.replaceChild(
      formContainer,
      parent.querySelector("#cards_container")
    );
    app.replaceChild(parent, main);
  }

  const allInputField = formContainer.querySelectorAll("input");
  allInputField[0].setAttribute("pattern", "^([가-힣]){2,4}$");
  allInputField[0].setAttribute("title", "2~4글자의 한글만 입력 가능합니다.");
  allInputField[1].setAttribute("pattern", "[a-zA-Z0-9]+@grepp.co");
  allInputField[1].setAttribute(
    "title",
    "이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다."
  );
  allInputField[2].setAttribute("pattern", "^([a-zA-Z]){3,10}$");
  allInputField[2].setAttribute(
    "title",
    "대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다."
  );
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // const personalInfo = await getPersonalInfo();

    const isExist = personalInfo.some(({ email, nickname }) => {
      if (
        email === allInputField[1].value ||
        nickname === allInputField[2].value
      ) {
        return true;
      }
    });

    if (isExist) {
      alert("이미 등록된 이메일이나 닉네임입니다.");
      return;
    }

    personalInfo.push({
      idx: personalInfo.length,
      name: allInputField[0].value,
      email: allInputField[1].value,
      nickname: allInputField[2].value,
      role: formContainer.querySelector("#role").value,
      mbti: formContainer.querySelector("#mbti").value,
    });

    localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
    alert("성공적으로 등록되었습니다.");
    form.reset();
  });
};

export const SignupPage = class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("signup!");
  }
};
