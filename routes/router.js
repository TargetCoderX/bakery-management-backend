const express = require('express');
const { login } = require('../controllers/authController');
const { getBecryptData } = require('../controllers/testController');
const { getCustomers } = require('../controllers/customerController');
const { verifyToken } = require('../middlewares/authVerifyMiddleware');

const router1 = express.Router();
const router2 = express.Router();
router2.use(verifyToken);

/* guest routes */
router1.post('/login', login)


// router1.get('/hash',getBecryptData)


/* protected route */
router2.get('/get-customers', getCustomers);

module.exports = {
    router1,
    router2,
};