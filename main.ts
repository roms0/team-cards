import { render_cards } from "./features/cards";
import { install } from "./features/experience/canvas";
import { install_interval_text } from "./features/interval-text";

window.addEventListener("DOMContentLoaded", () => {
  // render_cards("a-deck-showcase");
  // install_interval_text("slot");
  install("world");
});
