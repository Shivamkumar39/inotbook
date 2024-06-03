const jwt = require('jsonwebtoken')
const jwt_secret = 'shivamisabcd$oys'

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object

    const token = req.header('auth-token')

    if (!token) {
        res.status(401).send({ error: "please authentication using valid token" })
    }

    try {
        const data = jwt.verify(token, jwt_secret)
        req.user = data.user
        next()
    } catch (error) {
        res.status(500).send({ error: "Invalid please authentication using valid token" })
    }
}
module.exports = fetchuser
