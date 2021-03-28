const express = require('express')

const router = express.Router()
const userController = require('../controllers/user')
const postController = require('../controllers/post')


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
        updatedAttributes["phone"] = phone.toString()
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
    userController.editProfile(req.user, updatedAttributes)
    .then(editedUser => {
        res.json(editedUser)
    })
    .catch(err => console.log(err))
})


router.get('/friends', (req, res) => {
    // TODO: return all friends.



})

router.get('/users/:user_id', (req, res) => {

})

router.get('/friends/:friend_id', (req, res) => {
    // TODO: return all needed information of the user. and friendship relation.


})


router.post('/friend/:user_id', (req, res) => {
    const { user_id }  = req.params
    const { following } = req.body
    // change friendship.

    // add a friend

})

router.post('/posts', (req,res) => {
	// TODO: this must support polls.
    const { content, receiver_id } = req.body

    let receiverId = receiver_id || null
    postController.newPost(content, null, receiverId, req.user)
    .then(post => {
        res.json(post)
    })
    .catch(err => {
        console.log(err)
    }) 

})

router.get('/posts', (req, res) => {
	postController.getPosts()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        console.log(err)
    })

})

router.post('/react/post', (req, res) => {
	const { post_id, type } = req.body;

	// TODO: react to a post 
})


router.get('/react/post/:post_id', (req, res) => {
	const post_id = req.params.post_id;
	const detailed = req.query.detailed;

	if(detailed) {
		// return reacts and senders of them
	} else {
		// only return count of reacts of the post.
    }

	// TODO: return json of all likes and reacts to this post
	//       also must know who reacted to this post.
	//       [
	//       	{
	//       	type="like", 
	//       	count="40"
	//       	},
	//       	{
	//       	type="heart",
	//       	count="15"
	//       	}....
	//       	..
	//      ]
})

module.exports = router;
