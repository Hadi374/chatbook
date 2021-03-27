const express = require('express')

const userController = require('../controllers/user')
const router = express.Router()


router.get("/", (req, res) => {
    
    //req.user is the email address of user
    userController.getUserByEmail(req.user)
    .then(user => {
        res.json({
            user: user
        })
    }) 
    .catch(err => {
        console.log(err)
    })
})


module.exports = router;