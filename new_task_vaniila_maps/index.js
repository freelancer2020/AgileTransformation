const express = require('express');
const app = express();
app.use(express.static('public'));

const port = 8080 || process.env.PORT;
app.listen(port);