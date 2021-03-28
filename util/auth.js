const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const crypto = require('crypto')


dotenv.config()

const secret = process.env.TOKEN_SECRET;

exports.hashPassword = (passowrd) => crypto.createHash('sha1').update(passowrd).digest('hex')

exports.generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }
    return jwt.sign(payload, secret, {expiresIn: '1800s' })
}