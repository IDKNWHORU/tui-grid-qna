import { PersonalInfoRepository } from "../repository/PersonalInfoRepository";

export const SignupPage = class extends HTMLElement {
  #template;
  #form;
  #personalInfoRepository;
  constructor() {
    super();
    this.#personalInfoRepository = new PersonalInfoRepository();
    this.#template = document.createElement("div");
    this.#form = document.createElement("form");
    this.#template.setAttribute("id", "form_container");
    this.#template.appendChild(this.#form);
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.#handleSubmit();
    });
  }

  #handleSubmit() {
    const { email, nickname } = this.#form;

    if (
      this.#personalInfoRepository.find(email.value, nickname.value) ===
      undefined
    ) {
      const newPersonalInfo = {};
      for (const field of this.#form.elements) {
        if (field.tagName !== "BUTTON") {
          newPersonalInfo[field.id] = field.value;
        }
      }

      this.#personalInfoRepository.add(newPersonalInfo);
      alert("성공적으로 등록되었습니다.");
      this.#form.reset();
    } else {
      alert("이미 등록된 이메일이나 닉네임입니다.");
    }
  }

  connectedCallback() {
    this.#form.innerHTML = `
        <span class="form_elem">
            <label for="name">이름<span class="mark">(필수*)</span></label>
            <input id="name" placeholder="이름" pattern="^([가-힣]){2,4}$" title="2~4글자의 한글만 입력 가능합니다." required>
            </span>
            <span class="form_elem">
            <label for="email">이메일<span class="mark">(필수*)</span></label>
            <input id="email" placeholder="이메일" pattern="[a-zA-Z0-9]+@grepp.co" title="이메일 ID는 영문(대소문자 구분 없음)과 숫자만 입력이 가능하며, @grepp.co 형식의 이메일만 입력이 가능합니다." required>
            </span>
            <span class="form_elem">
            <label for="nickname">닉네임<span class="mark">(필수*)</span></label>
            <input id="nickname" placeholder="닉네임" pattern="^([a-zA-Z]){3,10}$" title="대소문자 구분 없이 3~10 글자의 영문만 입력이 가능합니다." required>
        </span>
        <span class="form_elem">
            <label for="role">직군<span class="mark">(필수*)</span></label>
            <select id="role" name="role" required>
                <option value="">직군을 선택해주세요</option>
                <option value="backend">백엔드</option>
                <option value="frontend">프론트엔드</option>
                <option value="fullstack">풀스택</option>
            </select>
        </span>
        <span class="form_elem">
            <label for="mbti">MBTI</label>
            <select id="mbti" name="mbti">
                <option value="">MBTI를 선택해주세요</option>
                <option value="ENFJ">ENFJ</option>
                <option value="ENTJ">ENTJ</option>
                <option value="ENFP">ENFP</option>
                <option value="ENTP">ENTP</option>
                <option value="ESFJ">ESFJ</option>
                <option value="ESTJ">ESTJ</option>
                <option value="ESFP">ESFP</option>
                <option value="ESTP">ESTP</option>
                <option value="INFJ">INFJ</option>
                <option value="INTJ">INTJ</option>
                <option value="INFP">INFP</option>
                <option value="INTP">INTP</option>
                <option value="ISFJ">ISFJ</option>
                <option value="ISTJ">ISTJ</option>
                <option value="ISFP">ISFP</option>
                <option value="ISTP">ISTP</option>
            </select>
        </span>
        <span class="form_elem">
            <button type="submit">등록</button>
        </span>
    `;
    this.appendChild(this.#template);
  }
};
