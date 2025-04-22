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
