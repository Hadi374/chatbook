const db = require('../util/database')
const userController = require('./user')

const newPost = (content, files, receiver_id, user) => {
    return new Promise((resolve, reject) => {
        db.execute('INSERT INTO posts(creator_id, receiver_id, text) values(?,?,?);', [user.id, receiver_id, content], (err, result) => {
            if(err) {
                return reject(err)
            }
            db.execute('SELECT * FROM posts WHERE id=?;', [result.insertId], (err, post) => {
                if(err) {
                    return reject(err)
                }

                const {creator_id, ...restOfPost} = post[0]
                userController.getUserById(creator_id)
                .then(user => {
                    restOfPost['creator'] = user;
                    return resolve(restOfPost)
                })
                .catch(err => {
                    reject(err)
                })


            })
            // INSERT Files to post_files table.

        })

    })
}

const newPoll = (content, files, receiver, answers) => {
    return new Promise((resolve, reject) => {
        // TODO: add post to database


        // create new post. and set as poll.

        // add answers to poll.

    })
}





const newComment = (content, files, repliedTo) => {
    return new Promise((resolve, reject) => {
        // TODO: create new Post and set replied_to to the post_id
    })
}


const editComment = (comment_id, newContent) => {
    return new Promise((resolve, reject) => {
        // TODO: check if this is a comment
        // set content of the comment.
    })
}

const deleteComment = (comment_id) => {
    return new Promise((resolve, reject) => {
        // TODO: delete comment.
    })
}

const getComments = (post_id) => {
    return new Promise((resolve, reject) => {
        // TODO: get comments of the post with post_id.
        // including reacts.
    })
}

const getPosts = () => {
    return new Promise((resolve, reject) => {
        db.execute("SELECT * FROM posts;", (err, posts) => {
            if(err) {
                return reject(err)
            }
            return resolve(posts)
        })
        // TODO: return latest posts with count of reacts.
        // number of comments and shares.

        // if the post is of type poll:
        // return answers of the poll, and if the logged In user answered to poll:
        // return the result of post.
    })
}

const reactPost = (post_id, reactType) => {
    return new Promise((resolve, reject) => {
        // TODO: add react to post.
        if(reactType == null) {
            // remove react from database.
        }
    })
}

const getReacts = (post_id) => {
    return new Promise((resolve, reject) => {
        // return all reacts and users who reacted to the post.
    })
}

const sharePost = (post_id, isPrivate) => {
    return new Promise((resolve, reject) => {
        // TODO: shate a post.
    })
}

const editPost = (post_id, newContent) => {
    return new Promise((resolve, reject) => {
        // update post.
    })
}


const deletePost = (post_id) => {
    return new Promise((resolve, reject) => {
        // delete the post.
    })
}


module.exports = {
    newPost,
    newPoll,
    editPost,
    deletePost,
    getPosts,
    reactPost,
    getReacts,
    getComments,
    newComment,
    editComment,
    deleteComment,
    sharePost
}