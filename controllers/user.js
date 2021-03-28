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
    
const editProfile = (email, newValues) => {
    return new Promise((resolve, reject) => {

        
        let sqlCommand = "UPDATE users SET " 
        let attributesArray = []
        
        for(attr in newValues) {
            sqlCommand += attr + " =?,\n";
            attributesArray.push(newValues[attr])
        }
        // before this line a comma in in sqlCommand
        sqlCommand += 'updatedAt=NOW() '
        
        sqlCommand += `WHERE email=?`;
        attributesArray.push(email)
        
        
        console.log("Executing", sqlCommand)
        db.execute(sqlCommand, attributesArray, (err, result) => {
            if(err) {
                reject(err)
            }
            //  return the edited user.
            getUserByEmail(email)
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
    editProfile
}