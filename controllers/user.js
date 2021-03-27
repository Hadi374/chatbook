const db = require('../util/database')
const auth = require('../util/auth')

const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.execute('SELECT * FROM users WHERE email=?;', [email], (err, result) => {
            if(err) {
                reject(err)
            }
            resolve(result[0])
        })
    })
}

const login = (email, password) => {
    console.log(email, password)

    return new Promise((resolve, reject) => {

        const hashedPassword = auth.hashPassword(password)
        
        getUserByEmail(email)
        .then(user => {
            if(user) {
                if(user.password === hashedPassword) {
                    // successuflly logged in.
                    // send authentication token.
                    resolve({
                        user: user,
                        token: auth.generateAccessToken(email)
                    })
                }
            }
            reject("Cannot login");
        })
        .catch(err => {
            console.log(err)
            return reject(err)
        })
    })
}

const signup = (first_name, last_name, password, password_verify, email) => {

    return new Promise((resolve, reject) => {

        if(!first_name || !last_name || !password || !password_verify || !email) {
            return res.status(400).end("Please fill all fields")
        }
        
        if(password !== password_verify) {
            return res.status(400).end("passwords does not match")
        }
        const hashedPassword = auth.hashPassword(password)
        
        // now add the new user to database.
        db.execute('INSERT INTO users(first_name, last_name, password, email) values(?,?,?,?)', [first_name, last_name, hashedPassword, email], (err, result) => {
            
            if(err) {
                if(err.code === 'ER_DUP_ENTRY') {
                    return res.end("You have account with this email address, try login.")
                }
                console.log(err)
            }
            // login as new user
            login(email, password)
            .then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    })
}
    
module.exports = {
    login,
    signup,
    getUserByEmail
}