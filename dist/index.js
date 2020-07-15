"use strict";
const express = require('express');
const app = express();
app.get('/', function (req, res) {
    res.status(200).json({ message: 'index' });
});
app.listen(3000);
