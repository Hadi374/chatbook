const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const db = require('./util/database')
const auth = require('./util/auth')


dotenv.config()


const app = express();
app.use(bodyParser.urlencoded({extended: true}))

// add all routes here.


app.get('/', (req, res) => {
    db.execute('SELECT 2 + 2;', (err, result) => {
        if(err) {
            console.log(err)
        }
        res.json(result[0])
    })
})

app.post('/signup', (req, res) => {
    console.log(req.body)
    const {username, password, password_verify, email } = req.body;
    console.log(username, password, password_verify, email)
    console.log(auth.hashPassword(password));
})






const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port)
})