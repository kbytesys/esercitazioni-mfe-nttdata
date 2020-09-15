// MAIN SERVER ----------------------------------------------------------------
const http = require('http');
const Tailor = require('node-tailor');

const tailor = new Tailor({
    templatesPath: __dirname + '/templates'
});

http
    .createServer(
        (req, res) => tailor.requestHandler(req, res)
    )
    .listen(8080, () => {
        console.log("Main server is running on port 8080")
    });



//-----------------------------------------------------------------------------

http.createServer(
    (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end("<div>Hello from the fragment!</div>")
    }
).listen(8081, () => {
    console.log("Fragment server is running on port 8081")
})