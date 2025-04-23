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

title.subscribe((text) => {
  if (target) {
    target.textContent = text;
  }
});

fromEvent(document, "click")
  .pipe(
    switchMap(() =>
      from(titles).pipe(concatMap((title) => of(title).pipe(delay(400))))
    )
  )
  .subscribe(title);

function promises() {
  try {
    Promise.allSettled([
      Promise.resolve(1),
      Promise.reject(new Error("some error")),
    ])
      .then(console.log)
      .catch(console.error);
    Promise.race([Promise.resolve(1), Promise.reject(new Error("some error"))])
      .then(console.log)
      .catch(console.error);
    Promise.all([Promise.resolve(1), Promise.reject(new Error("some error"))])
      .then(console.log)
      .catch(console.error);
    Promise.race([Promise.resolve(1), Promise.reject(new Error("some error"))])
      .then(console.log)
      .catch(console.error);
    Promise.any([Promise.resolve(1), Promise.reject(new Error("some error"))])
      .then(console.log)
      .catch(console.error);
  } catch (e) {
    console.error(e);
  }
}

// @ts-nocheck

async function loop() {
  // for (let i = 1; i < 13; i++) {
  //   const k = await new Promise((res) => {
  //     setTimeout(() => res(i), Math.random() * 1000);
  //   });
  //   console.log(k);
  // }
  const promises = [1, 2, 3, 4, 5].map(
    (i) => () =>
      new Promise((res) => {
        setTimeout(() => res(i), Math.random() * 1000);
      })
  );
  promises.slice(1).reduce((chain, promise) => {
    return chain.then((value) => {
      console.log(value);
      return promise();
    });
  }, promises[0]());
}
