import { render_cards } from "./features/cards";
import { install_interval_text } from "./features/interval-text";
import { install } from "./features/experience/experience";

window.addEventListener("DOMContentLoaded", () => {
  render_cards("a-deck-showcase");
  // install_interval_text("slot");
  // install("world");
});
