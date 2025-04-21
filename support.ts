import { detect } from "./detection";

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

const SPACING = 20;
const COLUMNS = 30;
const ROWS = 20;
const RADIUS = 0.55;

const figures = new Map();

async function cx(): Promise<CanvasRenderingContext2D> {
  const width = COLUMNS * SPACING + SPACING;
  const height = ROWS * SPACING + SPACING;
  const scale = 3;
  return new Promise((res, reject) => {
    const canvas = document.getElementById("canvas");
    if (canvas instanceof HTMLCanvasElement) {
      const cx = canvas.getContext("2d");
      if (cx) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.width = Math.floor(width * scale);
        canvas.height = Math.floor(height * scale);
        cx.scale(scale, scale);

        canvas.addEventListener("mousemove", (e) =>
          detect(e, cx, canvas.getBoundingClientRect(), SPACING, RADIUS)
        );
        res(cx);
      }
    } else {
      reject(new Error("no canvas"));
    }
  });
}

export async function paint() {
  const context = await cx();
  for (let column = 1; column < COLUMNS; column++) {
    for (let row = 1; row < ROWS; row++) {
      const offset = row % 2 === 0 ? SPACING / 2 : 0;
      context.beginPath();
      figures.set(column * SPACING + "" + offset + "" + row * SPACING, "dot");
      context.arc(
        column * SPACING + offset,
        row * SPACING,
        RADIUS,
        0,
        Math.PI * 2
      );
      context.fill();
    }
  }
}
