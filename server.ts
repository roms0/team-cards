const server = Bun.serve({
  port: 4000,
  fetch(req, server) {
    console.log(req.url);
    // use a library to parse cookies
    server.upgrade(req, {
      // this object must conform to WebSocketData
      data: {},
    });
    return undefined;
  },
  websocket: {
    async open(ws) {
      setInterval(() => {
        ws.send("hi");
      }, 1000);
    },
    // handler called when a message is received
    async message(ws, message) {},
  },
});

console.log(server.port);
