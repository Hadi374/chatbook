const express = require('express')

const router = express.Router()
const userController = require('../controllers/user')


router.get("/", (req, res) => {
    
    userController.getUserByEmail(req.user.email)
    .then(user => {
        res.end(`Hello, ${user.first_name} ${user.last_name} your bio is: ${user.bio}\n\
         and your email address is: ${req.user.email}`)
    })
    .catch(err => {
        console.log(err)
    })
})


router.get("/users/me", (req, res) => {
    
    userController.getUserByEmail(req.user.email)
    .then(user => {
        console.log(user)
        res.json({
            user: user
        })
    }) 
    .catch(err => {
        console.log(err)
    })
})




module.exports = router;