const express = require('express')
const bodyParser = require('body-parser')
const db = require('./util/database')

const app = express();

// add all routes here.


app.get('/', (req, res) => {
    db.execute('SELECT 2 + 2;', (err, result) => {
        if(err) {
            console.log(err)
        }
        res.json(result[0])
    })
})


app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port)
})