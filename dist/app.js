const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const path = require('path');


const app = express()
const router = express.Router()
const url = "mongodb://alan:uymt3vaa@ds133621.mlab.com:33621/heroku_fdh40q73"

/** configure cloudinary */
cloudinary.config({
    cloud_name: 'dt2rc2nwo',
    api_key: '934924577691447',
    api_secret: 'zcdnCkU7Aw8qcBhxRCgdElpJzzM'
})

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        //useMongoClient: true
    })
} catch (error) {

}

let PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/api', router)
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${PORT}`);
});