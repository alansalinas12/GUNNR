const express = require("express")
const routes = require('./routes/')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')

const app = express()
const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://alan:uymt3vaa@ds133621.mlab.com:33621/heroku_fdh40q73"

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

let port = 5000 || process.env.PORT

/** set up routes {API Endpoints} */
routes(router)

/** set up middlewares */
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});