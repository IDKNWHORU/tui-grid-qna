document.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    fetch("http://localhost:8080/clients").then((client) => {
      client
        .json()
        .then(
          (data) =>
            (document.querySelector("#app").innerHTML = JSON.stringify(data))
        );
    });
  }
});
