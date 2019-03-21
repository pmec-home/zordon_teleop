#!/usr/bin/env nodejs
const express = require('express');
const app = express();
const path = require('path');
//const router = express.Router();

console.log(path.dirname);

app.use(express.static(__dirname+'/public'));
//app.use('/', router);
app.listen(3000);
console.log("listening to port 3000");
