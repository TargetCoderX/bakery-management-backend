const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const { router1 } = require('./routes/router');
const { mysqlConnection } = require('./database/mysql');
app.use(express.json());
app.use(cors());
app.use('/api', router1);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})