import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { purple, white, blue, green } from '../utils/colors'

class Quiz extends Component {
    state = {
        correct: 0,
        wrong: 0,
        option: null,
        position: 0,
        showAnswer: false
    }

    handleNext = () => {
        this.setState((currentState) => ({
            position: currentState.position + 1,
            showAnswer: false
        }))
    }

    render (){
        const { deckName } = this.props.navigation.state.params
        const deck = this.props.decks[deckName]
        const { position, correct, wrong, showAnswer, option } = this.state
        const length = deck.cards.length

        if (!length){
            return <View style={styles.noDeck}><Text style={styles.noDeckText}>Create cards first</Text></View>
        }
        else {
            if(position === length){
                return (
                    <View>
                        <Text>Results</Text>
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.container}>
                        <View style={styles.item}>
                            <Text style={styles.title}>Question {position+1}:</Text>
                            <Text style={{fontSize: 20}}>{deck.cards[position].question} ?</Text>
                        </View>
                        {showAnswer 
                        ?   <View style={styles.item}>
                                <Text style={styles.title}>Answer:</Text>
                                <Text style={{fontSize: 20}}>{deck.cards[position].answer}</Text>
                            </View>
                        : null
                        
                        }
                        <TouchableOpacity style={styles.showAnswer} onPress={
                                () => this.setState((currentState) => ({showAnswer: !currentState.showAnswer}))
                            }>
                                <Text style={styles.nextText}>Show Answer</Text>
                        </TouchableOpacity>
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionTitle}>Did you get it right?</Text>
                            <View style={styles.options}>
                                <TouchableOpacity styles={styles.optionYes}>
                                    <Text>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity styles={styles.optionNo}>
                                    <Text>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.nextBtn} onPress={this.handleNext}>
                                <Text style={styles.nextText}>Next Question  ---></Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    optionContainer: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center'
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    optionYes: {
        backgroundColor: purple,
        width: 200,
        height: 40,
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    title: {
        marginTop: -10,
        marginBottom: 10,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: purple,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: 'rgb(238, 232, 225)',
        borderRadius: 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    noDeck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDeckText: {
        color: purple,
        fontWeight: 'bold',
        fontSize: 20
    },
    nextBtn: {
        backgroundColor: purple,
        width: 200,
        height: 40,
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    nextText: {
        color: white
    },
    showAnswer: {
        backgroundColor: blue,
        width: 150,
        height: 20,
        borderRadius: 10,
        padding: 20,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
})

function mapStateToProps (decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)