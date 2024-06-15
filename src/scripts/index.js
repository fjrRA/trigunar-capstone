import "regenerator-runtime";
import "../style/main.css";
import "../style/responsive.css";
import "../style/contact.css";
import "../style/about.css";
import App from "./views/app";

const app = new App({
  button: document.querySelector("#hamburgerButton"),
  drawer: document.querySelector("#navigationDrawer"),
  content: document.querySelector("#main-content"),
});

function updateHeaderVisibility() {
  const header = document.querySelector(".app-bar");
  const currentHash = window.location.hash;

  if (currentHash === "#/signup") {
    header.style.display = "none";
  } else {
    header.style.display = "flex";
  }
}

window.addEventListener("hashchange", () => {
  app.renderPage();
  updateHeaderVisibility();
});

window.addEventListener("load", () => {
  app.renderPage();
});
