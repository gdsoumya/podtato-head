const express = require("express");
const request = require("request");
const app = express();
const port = 9000;
const path = require("path");

const serviceMap = {
  hats: "podtato-hats:9001",
  "left-leg": "podtato-left-leg:9002",
  "left-arm": "podtato-left-arm:9003",
  "right-leg": "podtato-right-leg:9004",
  "right-arm": "podtato-right-arm:9005",
};

app.use("/static/", express.static(path.join(__dirname, "static")));

app.get("/parts/:service/:img", async (req, res) => {
  try {
    if (serviceMap.hasOwnProperty(req.params.service)) {
      request(
        {
          url: `http://${serviceMap[req.params.service]}/images/${
            req.params.img
          }`,
          encoding: null,
        },
        (err, resp, buffer) => {
          if (!err && resp.statusCode === 200) {
            res.set("Content-Type", "image/svg+xml");
            res.send(resp.body);
          } else if (!err) {
            res.status(resp.statusCode).send();
          } else {
            res.status(500).send("internal server error");
          }
        }
      );
    } else {
      res.status(404).send("invalid part");
    }
  } catch (err) {
    res.status(500).send("internal server error");
    console.log("error in /parts : ", err);
  }
});

app.get("/version", function (req, res) {
  res.send(process.env.VERSION);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "static/podtato-new.html"));
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
