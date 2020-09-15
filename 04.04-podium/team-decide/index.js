
const express = require("express");
const morgan = require("morgan");
const Layout = require("@podium/layout");

const layout = new Layout(
    {
        name: "film",
        pathname: "/film",
        development: true
    }
);

const recos = layout.client.register(
    {
        name: 'recos',
        uri: "http://localhost:83/recos/manifest.json",
        timeout: 500       
    }
)


const app = express();
app.use(morgan("dev"));
app.use(layout.middleware())
app.use("/static", express.static("./static"));

layout.css(
    [
        { value: "/static/stile.css" }
    ]
);

layout.js(
    [
        { value: "/static/script.js" }
    ]
);

app.get("/film", async (req, res, next) => {
    try{
        const incoming = res.locals.podium;
        const recoResponse = await recos.fetch(incoming, {})


        incoming.podlets = [recoResponse];
        incoming.view = { title: 'Pippo'};

        res.status(200).podiumSend(`
        <div class="p-3 bg-gray-900 border-red-400 border-4 text-white">
            Ace ventura, pet detective
            <div>
                ${recoResponse}
            </div>
        </div>
        `)

    }catch(e){
        console.error("BOOM!", e)
    }
})

app.listen(8080);
