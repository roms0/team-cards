import {
  BehaviorSubject,
  concatMap,
  delay,
  from,
  fromEvent,
  of,
  switchMap,
} from "rxjs";

const titles = [
  "attendable and loveable ceremonies",
  "nice looking office",
  "attention and dedication",
];
const target = document.getElementById("slot");

const title = new BehaviorSubject("");

function safe_append(id: string, fragment: DocumentFragment) {
  const target = document.getElementById(id);
  if (target) {
    target.append(fragment);
    return target;
  }
}

title.subscribe((text) => {
  if (target) {
    target.innerHTML = `<p>${text}</p>`;
  }
});

fromEvent(document, "click")
  .pipe(
    switchMap(() =>
      from(titles).pipe(concatMap((title) => of(title).pipe(delay(400))))
    )
  )
  .subscribe(title);

const data = [
  { title: "first", content: "description of a cool card", cost: 3 },
  { title: "another", content: "some robust mechanics", cost: 12 },
  { title: "third nice", content: "some robust mechanics", cost: 40 },
  { title: "last ultimative", content: "some robust mechanics", cost: 63 },
];

const template = document.querySelector(
  "#first-edition-card-template"
) as HTMLTemplateElement;

window.addEventListener("DOMContentLoaded", () => {
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
      }ms; animation-name: ${factor > 0.5 ? "attent" : "attent-reverse"}`;
    }
    fragment.append(item);
  }

  safe_append("a-deck-showcase", fragment);
});
