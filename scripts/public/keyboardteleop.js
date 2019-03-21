/**
 * @author Russell Toris - rctoris@wpi.edu
 */

var KEYBOARDTELEOP = KEYBOARDTELEOP || {
  REVISION : '0.3.0'
};

/**
 * @author Russell Toris - rctoris@wpi.edu
 */

/**
 * Manages connection to the server and all interactions with ROS.
 *
 * Emits the following events:
 *   * 'change' - emitted with a change in speed occurs
 *
 * @constructor
 * @param options - possible keys include:
 *   * ros - the ROSLIB.Ros connection handle
 *   * topic (optional) - the Twist topic to publish to, like '/cmd_vel'
 *   * throttle (optional) - a constant throttle for the speed
 */
KEYBOARDTELEOP.Teleop = function(options) {
  var that = this;
  options = options || {};
  var ros = options.ros;
  var topic = options.topic || '/cmd_vel';
  // permanent throttle
  var throttle = options.throttle || 1.0;

  // used to externally throttle the speed (e.g., from a slider)
  this.scale = 1.0;

  // linear x and y movement and angular z movement
  var x = 0;
  var yaw = 0;

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : topic,
    messageType : 'geometry_msgs/Twist'
  });

  // sets up a key listener on the page used for keyboard teleoperation
  this.buttonChange = function(button) {
    switch(button) {
      case "left":
        yaw += 0.1;
      break;
      case "right":
        yaw -= 0.1;
      break;
      case "forward":
        x += 0.05;
      break;
      case "backward":
        x -= 0.05;
      break;
      case "stop":
        x = 0;
        yaw = 0;
      break;
    }
    var twist = new ROSLIB.Message({
      angular : {
        x : 0,
        y : 0,
        z : yaw
      },
      linear : {
        x : x,
        y : 0,
        z : 0
      }
    });
    cmdVel.publish(twist);

    // check for changes
    if (oldX !== x || oldY !== y || oldZ !== z) {
      that.emit('change', twist);
    }
  };

};
KEYBOARDTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;

