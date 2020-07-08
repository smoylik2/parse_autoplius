const express = require('express');
const {createHtml} = require('./create_html');
const bodyParser = require("body-parser");

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const PORT = process.env.PORT || 80;

/* add path to static data (css) */
app.use('/static', express.static(__dirname + '/public'));

/* response main page  */
app.get('/', urlencodedParser, (req, res) => {
    res.sendFile(__dirname + '/main.html')
});

/* response html with content */
app.post('/', urlencodedParser, (req, res) => {
    /* validate request */
    if (req.body.link.indexOf('https://ru.autoplius.lt/') < 0) res.sendStatus(400);

    /* create data and return html-page with list of cars */
    createHtml(req.body.link).then((data) => {
        /* send html to user */
        res.send(data)
    })
});

/* start server */
app.listen(PORT, () => {
    console.log(`Server was started ...`)
});