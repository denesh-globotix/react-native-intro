import React, { Component } from 'react';
import {
    Text,
    Button,
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import * as ROSLIB from 'roslib'

export default class Cat extends Component {
    constructor() {
        super()
        this.robot_ip = "192.168.1.25"
        this.ros = 0

        this.number = 0;

        this.pub = 0

        this.initialised  = false;
    }

    forward = () => {
        if (this.initialised === false) {
            return;
        }
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
        if (this.initialised === false) {
            return;
        }
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
        if (this.initialised === false) {
            return;
        }
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
        if (this.initialised === false) {
            return;
        }
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
        if (this.initialised === false) {
            return;
        }
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

    connected = () => {
        this.initialised = true;
        console.log("Connected to the robot")
        this.pub = new ROSLIB.Topic({
            ros: this.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        })
    }

    connect = () => {
        console.log(`connecting to ${this.number}`)
        this.ros = new ROSLIB.Ros({
            url: `ws://${this.number}:9090`
        });
        this.ros.on('connection', this.connected.bind(this));
    }

    onChangeNumber = (data) => {
        console.log(data)
        this.number = data.toString();
        console.log(`The number is now: ${this.number}`)
    }

    styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },
    });

    render() {
        return (
            <>
                <Text>Control the robot</Text>
                <TextInput
                    style={this.styles.input}
                    onChangeText={this.onChangeNumber}
                    value={this.number}
                    placeholder="IP Address"
                    keyboardType="numeric"
                />
                <Button
                    title="Connect"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.connect}
                    color={'red'}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title="Left"
                        accessibilityLabel="Learn more about this purple button"
                        onPress={this.left}
                    />
                    <Button
                        title="Forward"
                        accessibilityLabel="Learn more about this purple button"
                        onPress={this.forward}
                    />
                    <Button
                        title="Right"
                        accessibilityLabel="Learn more about this purple button"
                        onPress={this.right}
                    />
                </View>
                <Button
                    title="Backward"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.backward}
                />
                <Button
                    title="stop"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={this.stop}
                />
            </>
        );


    }
}
