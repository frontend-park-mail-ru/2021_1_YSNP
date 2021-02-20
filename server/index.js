'use strict'

const express = require("express");
const path = require('path');
const app = express();

app.use("/", express.static(path.resolve(__dirname, "..", "public")));
app.all('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, "..", "public/index.html"));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});