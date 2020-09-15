const express = require("express");
const morgan = require("morgan");
const Podlet = require("@podium/podlet");

const podlet = new Podlet({
    name: "promotions",
    version: "0.0.1",
    pathname: "/promotions-area",
    fallback: "/fallback",
    development: true
});

podlet.js({
    value: "http://localhost:3002/static/fragment.js",
    async: true
});

podlet.css({
    value: "http://localhost:3002/static/style.css"
});

const app = express();

app.use(morgan("dev"));
app.use("/promotions-area", podlet.middleware());
app.use("/static", express.static("./static"));

app.get("/promotions-area/manifest.json", (req, res) => {
    res.status(200).json(podlet);
});

let ssr = () => {
    return "SSR..."
}

app.get("/promotions-area", (req, res) => {
    res.status(200).podiumSend(`
        <promotions-area>
            ${ssr()}
        </promotions-area>
    `)
});

app.get("/promotions-area/fallback", (_, res) => {
    res.status(200).podiumSend(`
        <div>Nessuna promozione disponibile</div>
    `)
});

app.listen(3002);