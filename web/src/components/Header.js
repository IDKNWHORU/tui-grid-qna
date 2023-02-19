export const getGnb = () => {
  const gnb = `<header>
  <div class="header header_left">
    <span class="menu_name" id="menu_home">HOME</span>
  </div>
  <div class="header header_right">
    <div class="menu_name" id="menu_signup">SIGNUP</div>
  </div>
</header>
`;
  return new DOMParser().parseFromString(gnb, "text/html").body
    .firstElementChild;
};

export const setURL = (tag, url, flush) => {
  tag.addEventListener("click", () => {
    window.history.pushState(null, null, url);
    flush();
  });
};
