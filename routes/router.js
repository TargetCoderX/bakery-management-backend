const express = require('express');
const { login } = require('../controllers/authController');
const { getBecryptData } = require('../controllers/testController');

const router1 = express.Router();
const router2 = express.Router();

/* guest routes */
router1.post('/login', login)
// router1.get('/hash',getBecryptData)


/* protected route */

module.exports = {
    router1,
    router2,
};