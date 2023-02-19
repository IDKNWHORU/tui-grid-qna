export const getContentTitle = (title) => {
  const contentTitle = `<div class="content_title">
    <h1> ${title} </h1>
  </div>`;

  return new DOMParser().parseFromString(contentTitle, "text/html").body
    .firstElementChild;
};
