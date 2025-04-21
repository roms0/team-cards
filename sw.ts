self.addEventListener("install", (event) => {
  console.log(event);
});

//@ts-ignore
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  //@ts-ignore
  event.respondWith(cacheFirst(event.request));
});

self.addEventListener("install", (event) => {
  //@ts-ignore
  event.waitUntil(addResourcesToCache);
});

const addResourcesToCache = async () => {
  const cache = await caches.open("v1");
  await cache.addAll(["/"]);
  console.log("cached: ");
  console.log(cache.keys());
};
