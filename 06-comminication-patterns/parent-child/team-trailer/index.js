const morgan = require('morgan');
const express = require('express');
const Podlet = require('@podium/podlet');

const podlet = new Podlet({
    name: "trailer-player",
    version: "1.0.0",
    pathname: "/trailer-player",
    fallback: "/fallback",
    development: true
});

podlet.js({
    value: "http://localhost:3003/static/fragment.js",
    defer: true
})

const app = express();
app.use(morgan("dev"));
app.use("/trailer-player", podlet.middleware());
app.use("/static", express.static("./static"));

app.get("/trailer-player/manifest.json", (req, res) => {
    res.status(200).json(podlet);
});

app.get("/trailer-player", (req, res) => {
    const filmid = req.query.filmid;
    res.status(200).podiumSend(`<trailer-player filmid=${filmid}></trailer-player>`);
});

app.get("/trailer-player/fallback", (req, res) => {
    res.status(200);
});

app.listen(3003);
