const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const { router1, router2 } = require('./routes/router');
app.use(express.json());
app.use(cors());
app.use('/api', router1);
app.use('/api', router2);
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})