const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let data = req.headers;
    jwt.verify((data.authorization.startsWith('Bearer') ? data.authorization.split(" ")[1] : data.authorization), process.env.JWT_SECRET, (err, decode) => {
        if (!err) {
            req.user = decode;
            next();
        } else {
            res.json({
                "error": err,
                "status": 0,
                "message": "Un-Authenticated"
            });
        }
    })
}

module.exports = {
    verifyToken,
}