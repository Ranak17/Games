// src/components/Square.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ value, onPress }) => {
    return (
        <TouchableOpacity style={styles.square} onPress={onPress}>
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
    },
});

export default Square;
