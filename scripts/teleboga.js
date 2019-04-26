#!/usr/bin/env nodejs

'use strict';
const rosnodejs = require('rosnodejs');
const std_msgs  = rosnodejs.require('std_msgs').msg;
const geometry_msgs  = rosnodejs.require('geometry_msgs').msg;
const express   = require('express');
const path	= require('path');
const app	= express();
const port 	= 3000;

const twist = new geometry_msgs.Twist();

app.use(express.static(path.join(__dirname, 'public')));
var router = express.Router();

function teleboga() {
	
	twist.linear.x = 0.0; 
	twist.angular.z = 0.0;
	
	rosnodejs.initNode('/teleboga_node')
		.then(function(rosNode) {
		let pub = rosNode.advertise('/cmd_vel', geometry_msgs.Twist);
		app.post('/left', function(req, res) {
			console.log("Command left called!");
			twist.angular.z -= 0.1;
			pub.publish(twist);
			res.send({
				success: true,
				angular: twist.angular.z,
				linear: twist.linear.x
			});
		});

		app.post('/right', function(req, res) {
			console.log("Command right called!");
			twist.angular.z += 0.1;
			pub.publish(twist);
			res.send({
				success: true,
				angular: twist.angular.z,
				linear: twist.linear.x
			});
		});

		app.post('/forward', function(req, res) {
			console.log("Command forward called!");
			twist.linear.x += 0.02;
			pub.publish(twist);
			res.send({
				success: true,
				angular: twist.angular.z,
				linear: twist.linear.x
			});
		});

		app.post('/backward', function(req, res) {
			console.log("Command backward called!");
			twist.linear.x -= 0.02;
			pub.publish(twist);
			res.send({
				success: true,
				angular: twist.angular.z,
				linear: twist.linear.x
			});
		});
		app.post('/stop', function(req, res) {
			console.log("Command stop called!");
			twist.angular.z = 0.0;
			twist.linear.x  = 0.0;
			pub.publish(twist);
			res.send({
				success: true,
				angular: twist.angular.z,
				linear: twist.linear.x
			});
		});

		app.listen(port, function() {
			console.log(`Running app in http://localhost:${port}!`);			
		});
	});
}

if (require.main === module) {
	teleboga();
}
