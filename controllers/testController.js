const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = "12345678";
const getBecryptData = (req, res) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {    
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            // Store hash in your password DB.
            res.json({ hash });
        });
    });
}
module.exports = {
    getBecryptData
};