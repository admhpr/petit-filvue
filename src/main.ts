import * as runtime from "./core/runtime";

const vdom = h("div", { class: "red" }, [h("span", null, "hello")]);
const appContainer = document.getElementById("app");

if (appContainer) {
  mount(vdom, appContainer);
}
