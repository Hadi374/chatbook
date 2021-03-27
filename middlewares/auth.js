
const jwt = require('jsonwebtoken');

// use this middleware in routes that need authentication.
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).end("Unauthorized, your request does not have authorization header")

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if(err) {
        res.json(err)
    }
    
    if (err) return res.status(403).end("Unauthorized, please login or create new Account.")

    req.user = user

    next()
  })
}

module.exports.authenticateToken = authenticateToken