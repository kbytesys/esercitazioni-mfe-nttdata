const express = require("express");
const morgan  = require("morgan");
const Podlet  = require("@podium/podlet");

const podlet = new Podlet({
    name: "buyButton",
    version: "1.0.0",
    pathname: "/buy-button",
    fallback: "/fallback",
    development: true
});

podlet.js({
    value: "http://localhost:3001/static/fragment.js",
    async: true
});

const app = express();

app.use(morgan("dev"));
app.use("/buy-button", podlet.middleware());
app.use("/static", express.static("./static"));

app.get("/buy-button/manifest.json", (req,res) => {
    res.status(200).json(podlet);
});


const ssr = (idprodotto, version) => {
    return `Qui renderizzero il contenuto del mio component ssr`;
}

app.get("/buy-button", (req, res) => {

    const idprodotto = req.query.idprodotto;
    const version = req.query.version;

    res.status(200).podiumSend(`
        <buy-button idprodotto="${idprodotto}" version="${version}">
            ${ssr(idprodotto, version)}
        </buy-button>
    `);
});

app.get("/buy-button/fallback", (req, res) => {
    res.status(200).podiumSend(
        `
        <div>
            Funzione non raggiungibile 
        </div>
        `
    )
});

app.listen(3001)
