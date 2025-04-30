import {
  animationFrames,
  BehaviorSubject,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  takeLast,
  takeWhile,
  tap,
  withLatestFrom,
} from "rxjs";

export { install };

export function media(query: string): Observable<boolean> {
  const mediaQuery = window.matchMedia(query);
  return fromEvent<MediaQueryList>(mediaQuery, "change").pipe(
    startWith(mediaQuery),
    map((list: MediaQueryList) => list.matches)
  );
}

const stones: number[][] = [];
for (let i = 0; i < 2000; i += 40) {
  for (let k = 0; k < 2000; k += 40) {
    stones.push([i, k]);
  }
}

const position = new BehaviorSubject([1000, 400]);
const shift = new BehaviorSubject([0, 0]);
const transformation = new BehaviorSubject([0, 0]);

function install(id: string) {
  const host = document.getElementById(id);
  if (!(host instanceof Element)) return;
  host.style.cssText = `position: relative; padding: 0`;

  const { width, height, x, y } = host.getBoundingClientRect();

  const unanimate = document.createElement("canvas");
  const animate = document.createElement("canvas");
  const touch = document.createElement("div");
  unanimate.id = "unanimate";
  unanimate.width = 2000;
  unanimate.height = 2000;
  unanimate.style.cssText = `position: absolute; z-index: 1`;

  animate.id = "animate";
  animate.width = width;
  animate.height = height;
  animate.style.cssText = `position: absolute; z-index: 2`;

  touch.id = "touch";
  touch.style.cssText = `height: ${height}px; width: ${width}px; position: absolute; z-index: 3; left: 0; top: 0`;
  host.appendChild(unanimate);
  host.appendChild(animate);
  host.appendChild(touch);

  const camera = (points: number[]) => [
    -points[0] + width / 2,
    -points[1] + height / 2,
  ];

  position.pipe(map(camera)).subscribe(transformation);
  transformation.subscribe((trans) => {
    unanimate.style.transform = `translate(${trans[0]}px, ${trans[1]}px)`;
  });

  const brush = unanimate.getContext("2d");
  const animatebrush = animate.getContext("2d");

  media("(prefers-color-scheme: dark)")
    .pipe(withLatestFrom(position))
    .subscribe(([isDark, pos]) => {
      if (animatebrush && brush) {
        brush.fillStyle = isDark ? "#36454F" : "snow";
        brush.fillRect(0, 0, 2000, 2000);
        brush.fillStyle = "black";
        stones.forEach((stone) => {
          brush.fillRect(stone[0], stone[1], 1, 1);
        });

        animatebrush.fillStyle = "tomato";
        animatebrush.fillRect(width / 2, height / 2, 8, 8);
      }
    });

  fromEvent(touch, "click")
    .pipe(
      filter((e) => e instanceof PointerEvent),
      withLatestFrom(position),
      map(([e, [px, py]]) => {
        const shiftx = -Math.trunc(width / 2 - (e.clientX - x));
        const shifty = -Math.trunc(height / 2 - (e.clientY - y));
        return [px + shiftx, py + shifty];
      }),
      filter((target) => {
        return (
          target[0] >= 0 &&
          target[0] <= 2000 &&
          target[1] >= 0 &&
          target[1] <= 2000
        );
      })
    )
    .subscribe(shift);

  const SPEED = 3;

  shift
    .pipe(
      filter((s) => s[0] !== 0 && s[1] !== 0),
      switchMap(([sx, sy]) => {
        return animationFrames().pipe(
          withLatestFrom(position),
          takeWhile(([_, [x, y]]) => {
            return x !== sx || y !== sy;
          }),
          map(([_, [x, y]]) => {
            return [
              Math.max(x, sx) - Math.min(x, sx) > SPEED
                ? x > sx
                  ? x - SPEED
                  : x + SPEED
                : sx,
              Math.max(y, sy) - Math.min(y, sy) > SPEED
                ? y > sy
                  ? y - SPEED
                  : y + SPEED
                : sy,
            ];
          })
        );
      })
    )
    .subscribe(position);
}
