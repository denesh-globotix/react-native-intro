import React, { Component } from 'react';
import { Text, Button } from 'react-native';
import * as ROSLIB from 'roslib'

export default class Cat extends Component {
    constructor() {
        super()
        // this.ws = new WebSocket('ws://0.0.0.0:9090');
        this.ros = new ROSLIB.Ros({
            url: 'ws://0.0.0.0:9090'
        });

        this.ros.on('connection', function () {
            console.log('Connected to websocket server.');
        });

        this.pub = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        })
    }

    Topic_mode = () => {

        this.twist = new ROSLIB.Message({
            linear: {
                x: 1.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.5,
            },
        })

        this.pub.publish(this.twist)
    }

    render() {
        return (
            <>
                <Text>Hello, I am your cat!</Text>
                <Button
                    title="Send ROS Message"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.Topic_mode}
                >
                </Button>
            </>
        );
    }
}
