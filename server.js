const express = require("express");
const path = require("path");

const app = express();

let client = null;
setTimeout(() => {
  try {
    client = require("./index.js");
  } catch {}
}, 2000);

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/stats", (req, res) => {
  if (!client) {
    return res.json({
      status: "starting",
      servers: 0,
      ping: 0
    });
  }

  res.json({
    status: "online",
    servers: client.guilds?.cache?.size || 0,
    ping: client.ws?.ping || 0
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Dashboard running on port " + PORT);
});