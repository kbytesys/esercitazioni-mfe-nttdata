const morgan = require('morgan');
const express = require('express');
const Podlet = require('@podium/podlet');

const podlet = new Podlet({
    name: "navigation-bar",
    version: "1.0.0",
    pathname: "/navigation-bar",
    fallback: "/fallback",
    development: true
});

const app = express();
app.use(morgan("dev"));
app.use("/navigation-bar", podlet.middleware());

app.get("/navigation-bar/manifest.json", (req, res) => {
    res.status(200).json(podlet);
});

const content = `
<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
    </ul>
</nav>
`

app.get("/navigation-bar", (req, res) => {
    res.status(200).podiumSend(content);
});

app.get("/navigation-bar/fallback", (req, res) => {
    res.status(200).podiumSend(content);
});

app.listen(3004);
