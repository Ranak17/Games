import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, PanResponder } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const PADDLE_SIZE = 80;
const PUCK_SIZE = 50;
const GOAL_WIDTH = 200;

const AirHockey = () => {
    const puckX = useSharedValue(width / 2 - PUCK_SIZE / 2);
    const puckY = useSharedValue(height / 2 - PUCK_SIZE / 2);

    const [player1Position, setPlayer1Position] = useState({ x: width / 2 - PADDLE_SIZE / 2, y: height - 150 });
    const [player2Position, setPlayer2Position] = useState({ x: width / 2 - PADDLE_SIZE / 2, y: 50 });

    const player1PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            setPlayer1Position({
                x: Math.min(Math.max(gestureState.moveX - PADDLE_SIZE / 2, 0), width - PADDLE_SIZE),
                y: Math.min(Math.max(gestureState.moveY - PADDLE_SIZE / 2, height / 2), height - PADDLE_SIZE),
            });
        },
    });

    const player2PanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            setPlayer2Position({
                x: Math.min(Math.max(gestureState.moveX - PADDLE_SIZE / 2, 0), width - PADDLE_SIZE),
                y: Math.min(Math.max(gestureState.moveY - PADDLE_SIZE / 2, 0), height / 2 - PADDLE_SIZE),
            });
        },
    });

    const puckStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: withSpring(puckX.value) },
                { translateY: withSpring(puckY.value) },
            ],
        };
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Basic puck movement, update this with more complex physics
            puckX.value += Math.random() * 10 - 5;
            puckY.value += Math.random() * 10 - 5;

            // Puck collision with walls
            if (puckX.value <= 0 || puckX.value >= width - PUCK_SIZE) puckX.value *= -1;
            if (puckY.value <= 0 || puckY.value >= height - PUCK_SIZE) puckY.value *= -1;
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View
                style={[styles.goal, styles.topGoal]}
            />
            <View
                style={[styles.goal, styles.bottomGoal]}
            />
            <Animated.View style={[styles.puck, puckStyle]} />
            <View
                style={[
                    styles.paddle,
                    { left: player1Position.x, top: player1Position.y },
                ]}
                {...player1PanResponder.panHandlers}
            />
            <View
                style={[
                    styles.paddle,
                    { left: player2Position.x, top: player2Position.y },
                ]}
                {...player2PanResponder.panHandlers}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    puck: {
        position: 'absolute',
        width: PUCK_SIZE,
        height: PUCK_SIZE,
        borderRadius: PUCK_SIZE / 2,
        backgroundColor: '#e74c3c',
    },
    paddle: {
        position: 'absolute',
        width: PADDLE_SIZE,
        height: PADDLE_SIZE,
        borderRadius: PADDLE_SIZE / 2,
        backgroundColor: '#2980b9',
    },
    goal: {
        position: 'absolute',
        width: GOAL_WIDTH,
        height: 10,
        backgroundColor: '#27ae60',
    },
    topGoal: {
        top: 0,
        left: width / 2 - GOAL_WIDTH / 2,
    },
    bottomGoal: {
        bottom: 0,
        left: width / 2 - GOAL_WIDTH / 2,
    },
});

export default AirHockey;
