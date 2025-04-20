function errs() {
  setTimeout(() => {
    throw new Error("custom");
  }, 500);
}

export function create() {
  const main = document.querySelector("p");
  const fragment = new DocumentFragment();
  const fresh = document.createElement("p");
  fresh.textContent = "from support";
  fresh.setAttribute("draggable", "true");
  fresh.addEventListener("dragstart", () => {
    fresh.classList.add("dragged");
  });
  fresh.addEventListener("dragend", () => {
    fresh.classList.remove("dragged");
  });
  fragment.appendChild(fresh);
  main?.append(fragment);
}
