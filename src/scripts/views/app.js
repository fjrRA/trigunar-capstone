// app.js
import DrawerInitiator from "../utils/drawer-inisiator";
import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppshell();
  }

  _initialAppshell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (page) {
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      console.error(`Page for URL '${url}' not found.`);
    }
  }
}

export default App;
