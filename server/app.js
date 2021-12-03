const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 7071 });

const initialScores = Array.from({ length: 50 }, () => Math.random() * 10);
let currentScores = [];

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send(JSON.stringify(initialScores));

  setInterval(() => {
    currentScores = initialScores.map((score) =>
      Math.max(0, score + (Math.random() * 10 - 5))
    );
    if (Math.random() > 0.6) {
      ws.send(JSON.stringify(currentScores));
    }
  }, 2000);
});
