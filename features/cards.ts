export { render_cards };

//
//
//
//
//

const data = [
  { title: "another", content: "some robust mechanics", cost: 12 },
  { title: "third nice", content: "some robust mechanics", cost: 40 },
  { title: "last ultimative", content: "some robust mechanics", cost: 63 },
  { title: "from nice dlc", content: "bought from dlc", cost: 200 },
  { title: "a pretty much rare one", content: "...", cost: 450 },
];

const template = document.querySelector(
  "#first-edition-card-template"
) as HTMLTemplateElement;

function render_cards(id: string) {
  console.log("render cards");
  const fragment = document.createDocumentFragment();
  for (const k of data) {
    const item = template.content.cloneNode(true) as HTMLTemplateElement;
    const container: HTMLElement | null = item.querySelector(
      ".first-edition-card"
    );
    if (container) {
      const factor = Math.random();
      container.innerHTML = `<p><span class=${
        factor > 0.5 ? "attention" : "resource"
      }>${k.cost}</span> ${k.title}</p>`;
      container.style.cssText = `animation-delay: ${
        factor * 1000
      }ms; animation-name: bounce`;

      // const img = document.createElement("img");
      // img.src = `pics/${factor > 0.5 ? "desk.png" : "plant.png"}`;
      // img.style.cssText = `aspect-ratio: 1; width: 70%`;
      // img.draggable = false;
      // container.appendChild(img);
    }
    fragment.append(item);
  }

  const target = document.getElementById(id);
  if (target) {
    target.append(fragment);
    return target;
  }
}
