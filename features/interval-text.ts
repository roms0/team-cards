import {
  BehaviorSubject,
  concatMap,
  delay,
  from,
  fromEvent,
  of,
  switchMap,
} from "rxjs";

export { install_interval_text };

const titles = [
  "attendable and loveable ceremonies",
  "nice looking office",
  "attention and dedication",
];

function install_interval_text(id: string) {
  const target = document.getElementById(id);

  const title = new BehaviorSubject("");
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
}
