#!/usr/bin/env nodejs

'use strict';
const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

function talker() {
  rosnodejs.initNode('/talker_node')
    .then((rosNode) => {
      let pub = rosNode.advertise('/chatter', std_msgs.String);
      let count = 0;
      const msg = new std_msgs.String();
      setInterval(() => {
        msg.data = 'hello world ' + count;
        pub.publish(msg);
        rosnodejs.log.info('I said: [' + msg.data + ']');
        ++count;
      }, 100);
    });
}
talker();
/*if (require.main === module) {
  // Invoke Main Talker Function
  talker();
}*/
