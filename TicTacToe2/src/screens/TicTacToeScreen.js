// src/screens/GameScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Button, Text } from 'react-native';
import Square from '../components/Square';

const TicTacToeScreen = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handlePress = (index) => {
        const newBoard = board.slice();
        if (calculateWinner(board) || board[index]) return;
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const currentWinner = calculateWinner(newBoard);
        if (currentWinner) {
            setWinner(currentWinner);
            Alert.alert(`Player ${currentWinner} wins!`, '', [
                { text: 'OK', onPress: resetBoard }
            ]);
        }
    };

    const renderSquare = (index) => (
        <Square
            value={board[index]}
            onPress={() => handlePress(index)}
        />
    );

    const resetBoard = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
    };

    const renderRetryButton = () => {
        if (!winner && board.every(square => square !== null)) {
            return (
                <Button title="Retry" onPress={resetBoard} />
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.labels}>
                {/* <Text>Player 1 (X) - {isXNext ? 'Your Turn' : 'Opponent\'s Turn'}</Text>
                <Text>Player 2 (O) - {isXNext ? 'Opponent\'s Turn' : 'Your Turn'}</Text> */}
            </View>
            <View style={styles.board}>
                {Array(9).fill(null).map((_, i) => renderSquare(i))}
            </View>
            {renderRetryButton()}
        </View>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
    },
    labels: {
        marginBottom: 20,
    },
});

export default TicTacToeScreen;
