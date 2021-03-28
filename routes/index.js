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


router.post('/users/me', (req, res) => {
    const { first_name, last_name, bio,  gender, year_of_birth, phone, profile_image, cover_image } = req.body

    const updatedAttributes = {}

    console.log(first_name, last_name, bio, gender, year_of_birth, phone, profile_image, cover_image)
    /// only edit parts that changed.
    if(first_name) {
        updatedAttributes["first_name"] = first_name
    }
    if(last_name) {
        updatedAttributes["last_name"] = last_name
    }
    if(bio) {
        updatedAttributes["bio"] = bio
    }
    if(gender) {
        updatedAttributes["gender"] = gender
    }
    if(year_of_birth) {
        updatedAttributes["year_of_birth"] = year_of_birth
    }
    if(phone) {
        updatedAttributes["phone"] = phone
    }
    if(profile_image) {
        // TODO: Handle file upload
        // updatedAttributes.push(profile_image)
    }
    if(cover_image) {
        // TODO: Handle File upload
        updatedAttributes["cover_image"] = 'Address_of_file'
    }

    // run sql (from user controller)
    userController.editProfile(req.user.email, updatedAttributes)
    .then(editedUser => {
        res.json(editedUser)
    })
    .catch(err => console.log(err))
})


module.exports = router;