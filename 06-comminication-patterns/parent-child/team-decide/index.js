const express = require("express");
const morgan = require("morgan");
const Layout = require("@podium/layout");

const layout = new Layout({
  name: "film",
  pathname: "/film",
  development: true,
});

const buyButtonClient = layout.client.register({
  name: "buy-button",
  uri: "http://localhost:3001/buy-button/manifest.json",
  timeout: 500,
});

const promotionsAreaClient = layout.client.register({
  name: "promotions-area",
  uri: "http://localhost:3002/promotions-area/manifest.json",
  timeout: 200
});

const trailerPlayerClient = layout.client.register({
  name: "trailer-player",
  uri: "http://localhost:3003/trailer-player/manifest.json",
  timeout: 200
});

const navigationBarClient = layout.client.register({
  name: "navigation-bar",
  uri: "http://localhost:3004/navigation-bar/manifest.json",
  timeout: 1000
});

const app = express();
app.use(morgan("dev"));
app.use(layout.middleware());
app.use("/static", express.static("./static"));

layout.css([{ value: "/static/tailwind.min.css" }]);
layout.js([{ value: "/static/page.js", defer: true }]);

app.get("/film", async (req, res, next) => {

  const incoming = res.locals.podium;

  let buyButtonResponse = await buyButtonClient.fetch(incoming, {
    query: {
      idprodotto: 1,
      version: "standard",
    },
  });
  let promotionsAreaResponse = await promotionsAreaClient.fetch(incoming, {});

  let trailerPlayerResponse = await trailerPlayerClient.fetch(incoming, {
    query: {
      filmid: 0
    }
  })

  let navigationBarResponse = await navigationBarClient.fetch(incoming, {});

  incoming.podlets = [buyButtonResponse, promotionsAreaResponse, trailerPlayerResponse, navigationBarResponse];

  res.status(200).podiumSend(`
  <div class="bg-gray-900">
    ${navigationBarResponse}
    <div class="w-1/3 mx-auto p-3">
        <img
        class="rounded w-full image"
        src="../static/cover-standard.jpg"
        alt=""
        />
        <h1 class="text-white text-center text-lg my-3">
        Ace ventura, acchiappa animali
        </h1>
        <h2 class="text-center text-gray-500 font-bold text-xs my-3">
        <span>Comico - 90'</span>
        <span class="text-yellow-400 ml-3">✩✩✩✩✩</span>
        </h2>
        <div class="bg-gray-800 rounded-lg p-3 my-3 flex">
            <label class="text-white uppercase font-bold">
            <input type="checkbox" name="edition" class="version_check"/>
            <span>Platinum Edition</span>
            </label>
        </div>
        <div class="text-gray-500">
        Specializzato nel recupero di animali smarriti, Ace Ventura, viene
        incaricato dai manager della squadra dei Dolphins, di ritrovare il
        delfino Snowflake, mascotte della squadra, rapito alla vigilia della
        finale del Super Bowl.
            <div>
                ${trailerPlayerResponse}
            </div>
        </div>
        ${buyButtonResponse}

        <div>
          ${promotionsAreaResponse}
        </div>
    </div>
    </div>
    `);
});

app.listen(3000);
