const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes/router');
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})