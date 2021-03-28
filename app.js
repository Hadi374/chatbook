const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const authMiddleware = require('./middlewares/auth')
const allRoutes = require('./routes/index')

const userController = require('./controllers/user')

dotenv.config()


const app = express();
app.use(bodyParser.urlencoded({extended: true}))




app.use('/api/v1', authMiddleware.authenticateToken, allRoutes);


app.get('/', (req, res) => {
    res.end("welcome")
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    userController.login(email, password)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json(err)
    })
})


app.post('/signup', (req, res) => {
    const {first_name, last_name, password, password_verify, email } = req.body;
    userController.signup(first_name, last_name, password, password_verify, email)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.json(err)
    })
  
})

app.post('/logout', (req, res) => {
    // TODO: clear cookies and disable the user's authorization header.
    res.end("logged out successfully")

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port)
})