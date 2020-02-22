#!/usr/bin/env nodejs
const express = require('express');
const app = express();
const path = require('path');
const ip = require('ip');
const rosnodejs = require('rosnodejs');

const nh = rosnodejs.nh;

const pub = nh.advertise('/teste', 'std_msgs/String');
pub.publish({data: "hi"});

const port = 3000;
app.use(express.static(__dirname+'/public'));
app.listen(port, function() {
	var host = ip.address();
	console.log('Listening to http://%s:%s', host, port);
});
