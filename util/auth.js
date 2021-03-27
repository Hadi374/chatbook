const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const crypto = require('crypto')


dotenv.config()

const secret = process.env.TOKEN_SECRET;

exports.hashPassword = (passowrd) => crypto.createHash('sha1').update(passowrd).digest('hex')

exports.generateAccessToken = (email) => {
    return jwt.sign({email}, secret, {expiresIn: '1800s' })
}