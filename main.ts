async function begin() {
  await new Promise((res) => setTimeout(res, 1000));
  const support = await import("./support.ts");
  try {
    support.create();
  } catch (e) {
    console.error(e);
  }
}

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
        res(cx);
      }
    } else {
      reject(new Error("no canvas"));
    }
  });
}

const context = await cx();
for (let i = 0; i < 60; i++) {
  for (let k = 0; k < 40; k++) {
    context.beginPath();
    context.arc(i * 10, k * 10, 0.4, 0, Math.PI * 2);
    context.fill();
  }
}
