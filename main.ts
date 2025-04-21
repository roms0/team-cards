async function begin() {
  await new Promise((res) => setTimeout(res, 1000));
  const support = await import("./support.ts");
  try {
    support.paint();
  } catch (e) {
    console.error(e);
  }
}

const register = async function () {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

begin();

// const response = await fetch("https://dogapi.dog/api/v2/breeds");
// const data = await response.json();
// console.log("main script: ", data);

const dragstart = (dragEvent: DragEvent) => {
  const trans = dragEvent.dataTransfer as DataTransfer;
  trans.setData("content", (dragEvent.target as HTMLParagraphElement).id);
};

const dragover = (dragEvent: DragEvent) => {
  dragEvent.preventDefault();
  const trans = dragEvent.dataTransfer as DataTransfer;
  trans.dropEffect = "copy";
};

const dragend = (dragEvent: DragEvent) => {
  dragEvent.preventDefault();
  const trans = dragEvent.dataTransfer as DataTransfer;
  const target = dragEvent.target as HTMLElement;
  const data = trans.getData("content");
  const linked = document.getElementById(data);
  if (target && linked) {
    target.appendChild(linked);
  }
};

document.getElementById("draggable")?.addEventListener("dragstart", dragstart);
document.getElementById("droppable")?.addEventListener("dragover", dragover);
document.getElementById("droppable")?.addEventListener("drop", dragend);
