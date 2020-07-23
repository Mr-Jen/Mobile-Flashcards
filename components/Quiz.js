import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 

import { purple, white } from '../utils/colors'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'
import Result from './Result'
import FlipCard from './FlipCard'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params

        return {
            title: `${deckName} Quiz`
        }
    }
    state = {
        correct: 0,
        option: null,
        position: 0,
        showAnswer: false,
        flipped: false
    }

    handleNext = () => {
        if (this.state.option !== null){
            this.state.flipped && this.child.flipCard()
            this.setState((currentState) => ({
                position: currentState.position + 1,
                showAnswer: false,
                option: null
            }))

        }
        else {
            alert('Please answer first.')
        }
    }

    handleOption = (option) => {
        this.setState((currentState) => ({
            option,
            correct: option === true ? currentState.correct + 1 : currentState.correct
        }))
    }

    handleRestart = () => {
        this.setState(() => ({
            position: 0,
            correct: 0
        }))
    }

    onFlipped = () => {
        this.setState((currenState) => ({
            flipped: !currenState.flipped
        }))
    }

    render (){
        const { deckName } = this.props.navigation.state.params
        const deck = this.props.decks[deckName]
        const { position, correct, showAnswer, option } = this.state
        const length = deck.cards.length

        console.log(this.state.flipped)

        if (!length){
            return <View style={styles.noDeck}><Text style={styles.noDeckText}>Please create cards first</Text></View>
        }
        else {
            if(position === length){
                clearLocalNotification()
                    .then(setLocalNotification)
                if (correct/length >= 0.8){
                    alert('🎉 Great work! 🎉')
                } 
                return (
                    <Result 
                        correct={correct} 
                        length={length} 
                        deckName={deckName} 
                        handleRestart={this.handleRestart}
                        navigation={this.props.navigation}
                    />
                )
            }
            else {
                return (
                    <View style={styles.container}>
                            <FlipCard 
                                length={length} 
                                position={position} 
                                deck={deck} 
                                showAnswer={showAnswer}
                                onPress={() => this.setState(() => ({showAnswer: true}))}
                                onRef={ref => (this.child = ref)}
                                onFlipped={this.onFlipped}
                            />
                        {showAnswer 
                        ?   <View>                                
                                <View style={styles.optionContainer}>
                                    <Text style={styles.optionTitle}>Was your answer correct?</Text>
                                    <View style={styles.options}>
                                        <TouchableOpacity style={[styles.option, {borderTopRightRadius: 0, borderBottomRightRadius: 0}]} onPress={() => this.handleOption(true)}>
                                            <Text style={styles.nextText}>
                                                {option === true 
                                                    ? '▷ Yes ◁'
                                                    : 'Yes'
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.handleOption(false)} style={[styles.option, {borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: 'rgb(138, 15, 15)'}]}>
                                            <Text style={styles.nextText}>{option === false ? '▷ No ◁' : 'No'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        : null            
                        }
                        <View style={styles.nexBtnContainer}>
                            <TouchableOpacity style={styles.nextBtn} onPress={this.handleNext}>
                                    <Text style={styles.nextText}>Next Question</Text>
                                    <AntDesign name="arrowright" size={24} color={white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    result: {
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
        },
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: purple,
        borderBottomColor: purple,
        borderBottomWidth: 4
    },
    resultScore: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: purple
    },
    optionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -200
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '-25%'
    },
    options: {
        flex: 1,
        flexDirection: 'row',
    },
    option: {
        backgroundColor: 'rgb(31, 95, 22)',
        width: 130,
        height: 40,
        borderRadius: 10,
        padding: 20,
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
    nexBtnContainer: {
        position: 'absolute', 
        bottom: 0, 
        alignSelf:'center'
    },
    nextBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: purple,
        width: 200,
        height: 40,
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        justifyContent: 'flex-end',
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
        color: white,
        fontSize: 18,
        alignSelf: 'center',
        paddingRight: 7
    },
})

function mapStateToProps (decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)