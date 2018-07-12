const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dbConnection = require('./index');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8080;

/** set up routes {API Endpoints} */
routes(router);

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

app.use(
    session({
        secret: "secretsecret",
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: true
    })
);

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});