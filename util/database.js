const mysql = require('mysql2')
const config = require('../config.js')

module.exports = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})