const db = require('../util/database')
const auth = require('../util/auth')

// This will have password. which is used for login.
const getUserByEmail = (email) => {

    return new Promise((resolve, reject) => {
        console.log(email)
        db.execute('SELECT * FROM users WHERE email=?;', [email], (err, result) => {
            if(err) {
                reject(err)
            }
            resolve(result[0])
        })
    })
}

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        console.log(id)
        db.execute('SELECT \
        id, first_name, last_name, profile_image \
        FROM users WHERE id=?;', [id], (err, result) => {
            if(err) {
                reject(err)
            }
            resolve(result[0])
        })
    })
}


const getFullUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.execute('SELECT \
        id, first_name, last_name, bio, gender, year_of_birth, phone, profile_image, cover_image, createdAt  \
        FROM users WHERE id=?;', [id], (err, result) => {
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
            
                console.log(user.password, hashedPassword)
                if(user.password === hashedPassword) {
                    // successuflly logged in.
                    // send authentication token.
                    const {password, ...rest} = user
                    resolve({
                        user: rest,
                        token: auth.generateAccessToken(user)
                    })
                } else {
                    reject("Invalid password.")
                }
            } else {
                reject("Cannot login");
            }
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
            return reject("Please fill all fields")
        }
        
        if(password !== password_verify) {
            return reject("passwords does not match")
        }
        const hashedPassword = auth.hashPassword(password)
        
        // now add the new user to database.
        db.execute('INSERT INTO users(first_name, last_name, password, email) values(?,?,?,?)', [first_name, last_name, hashedPassword, email], (err, result) => {
            
            if(err) {
                if(err.code === 'ER_DUP_ENTRY') {
                    reject("You have account with this email address, try login.")
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
    
const editProfile = (user, newValues) => {
    return new Promise((resolve, reject) => {

        
        let sqlCommand = "UPDATE users SET " 
        let attributesArray = []
        
        for(attr in newValues) {
            sqlCommand += attr + " =?,\n";
            attributesArray.push(newValues[attr])
        }
        // before this line a comma in in sqlCommand
        sqlCommand += 'updatedAt=NOW() '
        
        sqlCommand += `WHERE id=?`;
        attributesArray.push(user.id)
        
        db.execute(sqlCommand, attributesArray, (err, result) => {
            if(err) {
                reject(err)
            }
            console.log(result)
            //  return the edited user.
            getFullUserById(user.id)
            .then(user => {
                resolve(user)
            }).
            catch(err => reject(err)) 
        })
    })
}

module.exports = {
    login,
    signup,
    getUserByEmail,
    getUserById,
    editProfile
}