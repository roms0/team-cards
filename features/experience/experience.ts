import { delay, from, of } from "rxjs";

export { install };

class Stone {
  public element: HTMLDivElement;
  constructor(x: number, y: number, scene: Scene) {
    this.element = document.createElement("div");
    this.element.style.cssText = `background: gray; width: ${10}px; height: ${10}px; transform: translate(${x}px, ${y}px)`;
    scene.element.appendChild(this.element);
  }
}

class Scene {
  public element: HTMLDivElement;
  private readonly width = 1000;
  private readonly height = 1000;
  constructor(parent: Element) {
    this.element = document.createElement("div");
    this.element.style.cssText = `background: snow; width: ${this.width}px; height: ${this.height}px;`;
    parent.appendChild(this.element);
  }
}

class Camera {
  public adjust(x: number, y: number) {
    const transx = x > 0 ? x : -x;
    const transy = y > 0 ? y : -y;
    this.scene.element.style.transform = `translate(${transx}px, ${transy}px)`;
  }
  constructor(private scene: Scene) {}
}

class Parent {
  public element: HTMLDivElement;
  constructor(fragment: DocumentFragment) {
    this.element = document.createElement("div");
    this.element.style.cssText = `width: 100%; height: 100%; overflow: hidden`;
    fragment.appendChild(this.element);
  }
}

function install(id: string) {
  const container = document.getElementById(id);
  if (!container) return;

  const FRAGMENT = document.createDocumentFragment();
  const parent = new Parent(FRAGMENT);
  const scene = new Scene(parent.element);
  const camera = new Camera(scene);

  container.appendChild(FRAGMENT);

  new Stone(40, 40, scene);
  new Stone(80, 40, scene);
  new Stone(30, 70, scene);
}
