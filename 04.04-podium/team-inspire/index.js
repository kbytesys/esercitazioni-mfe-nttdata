const express = require("express");
const morgan = require("morgan");
const Podlet = require("@podium/podlet");

const podlet = new Podlet({
    name: 'recos',
    version: '1.0.1',
    pathname: '/recos',
    fallback: '/fallback',
    development: true
});

podlet.css({
    value: "http://localhost:83/static/fragment.css"
})

podlet.js({
    value: "http://localhost:83/static/script.js"
})

const app = express();
app.use(morgan('dev'));
app.use("/static", express.static(("./static")));
app.use("/recos", podlet.middleware());

app.get("/recos/manifest.json", (req, res) => {
    console.log("Scaricato manifest");
    res.status(200).json(podlet)
});

app.get("/recos", (req, res) => {
    console.log("Scaricato html del fragment");
    res.status(200).podiumSend(`<div class="teaminspire__border">CONTENUTO DEL FRAGMENT!!!!!!</div>`)
})

app.get("/recos/fallback", (req, res) => {
    res.status(200).podiumSend(`<div>Problema nello scaricamento del fragment....</div>`)
})

app.listen(83);
