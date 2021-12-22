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

    forward = () => {
        console.log("hello forwards")
        this.twist = new ROSLIB.Message({
            linear: {
                x: 1.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
        })

        this.pub.publish(this.twist)
    }

    backward = () => {
        console.log("hello backwards")
        this.twist = new ROSLIB.Message({
            linear: {
                x: -0.2,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
        })

        this.pub.publish(this.twist)
    }

    right = () => {
        this.twist = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: -0.3,
            },
        })

        this.pub.publish(this.twist)
    }

    left = () => {
        this.twist = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.3,
            },
        })

        this.pub.publish(this.twist)
    }

    stop = () => {
        this.twist = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
        })

        this.pub.publish(this.twist)
    }

    render() {
        return (
            <>
                <Text>Control the robot</Text>
                <Button
                    title="Forward"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.forward}
                >
                </Button>
                <Button
                    title="Backward"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.backward}
                >
                </Button>
                <Button
                    title="Right"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.right}
                >
                </Button>
                <Button
                    title="Left"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.left}
                >
                </Button>
                <Button
                    title="stop"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.stop}
                >
                </Button>
            </>
        );
    }
}
