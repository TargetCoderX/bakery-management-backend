const express = require('express');
const { login } = require('../controllers/authController');
const router1 = express.Router();
const router2 = express.Router();

/* guest routes */
router1.post('/login', login)

/* protected route */

module.exports = {
    router1,
    router2,
};