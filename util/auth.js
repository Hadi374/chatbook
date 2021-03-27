const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const crypto = require('crypto')


dotenv.config()

const secret = process.env.SECRET_TOKEN;
console.log(secret)

exports.hashPassword = (passowrd) => crypto.createHash('sha1').update(passowrd).digest('hex')