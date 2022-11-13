const findClients = () => {
  request({ url: "http://localhost:8080/clients", options: {} }).then(
    (client) => {
      client
        .json()
        .then(
          (data) =>
            (document.querySelector(".client-list").textContent =
              JSON.stringify(data))
        );
    }
  );
};

const addClient = (form) => {
  const items = Object.values(form.elements).filter(
    (item) => item.nodeName === "INPUT"
  );
  const body = {};

  for (let i = 0; i < items.length / 2; i++) {
    body[items[i].name] = items[i].value;
  }

  request({
    url: "http://localhost:8080/client",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  }).then((client) => {
    client
      .json()
      .then(
        (data) =>
          (document.querySelector(".client-added").textContent =
            JSON.stringify(data))
      );
  });
};

const request = ({ url, options }) => {
  return fetch(url, options);
};

const regist = {
  "find-clients": findClients,
  "add-client": addClient,
};

document.addEventListener("click", (e) => {
  const targetElement = e.target;
  if (targetElement.matches(`button[type="submit"]`)) {
    const event = regist[targetElement.dataset.event];

    event(targetElement.form);
    e.preventDefault();
  }
});
