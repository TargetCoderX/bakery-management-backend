const { connection } = require("../database/mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    let { email, password } = req.body;
    connection.connect();
    connection.query(`select * from users where email='${email}'`, (err, result, fields) => {
        if (!result.length)
            res.json({
                "status": 0,
                "message": "No Record Found with this Email and Password",
            });
        else {
            bcrypt.compare(password.toString(), result[0].password, function (err, verify) {
                if (verify) {
                    let token = jwt.sign({
                        'id': result[0].id,
                        'name': result[0].name,
                        'email': result[0].email,
                    }, process.env.JWT_SECRET);
                    res.json({
                        'status': 1,
                        'token': token,
                    })
                }else{
                    res.json({
                        "status": 0,
                        "message": "No Record Found with this Email and Password",
                    });
                }
            })
        }
    });
}

module.exports = {
    login,
}