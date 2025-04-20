async function begin() {
  await new Promise((res) => setTimeout(res, 1000));
  const support = await import("./support.ts");
  try {
    support.create();
  } catch (e) {
    console.error(e);
  }
}

const debounce = (fn: any) => {
  let i: any;
  return (...args: any) => {
    clearTimeout(i);
    i = setTimeout(() => {
      fn.call(this, ...args);
    }, 200);
  };
};

const closest = (int: number) => {
  const re = int % 10;
  return (int += re < 5 ? -re : 10 - re);
};

const figures = new Map();

async function cx(): Promise<CanvasRenderingContext2D> {
  const width = 600;
  const height = 400;
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

        const detect = (e: MouseEvent) => {
          const rect = canvas.getBoundingClientRect();
          const x = closest(e.x - rect.x);
          const y = closest(e.y - rect.y);
          const id = x + "" + y;
          if (figures.has(id)) {
            cx.clearRect(x - 0.4, y - 0.4, 0.8, 0.8);
            context.beginPath();
            context.fillStyle = `rgb(
            ${Math.floor(255 * Math.random())}
            ${Math.floor(255 * Math.random())}
            ${Math.floor(255 * Math.random())})`;
            context.arc(x, y, 2, 0, Math.PI * 2);
            context.fill();
          }
        };

        canvas.addEventListener("mousemove", detect);
        res(cx);
      }
    } else {
      reject(new Error("no canvas"));
    }
  });
}

const context = await cx();
context.moveTo(1, 1);
for (let i = 1; i < 59; i++) {
  for (let k = 1; k < 39; k++) {
    context.beginPath();
    figures.set(i * 10 + "" + k * 10, "dot");
    context.arc(i * 10, k * 10, 0.4, 0, Math.PI * 2);
    context.fill();
  }
}
