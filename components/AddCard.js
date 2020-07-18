import React, { Component} from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { white, purple } from '../utils/colors'

function SubmitBtn ({ onPress, disabled }) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.submitBtnText}>Add</Text>
        </TouchableOpacity>
    )
}

class Decks extends Component {
    static navigationOptions = () => {

        return {
            title: 'Add New Card'
        }
    }

    state = {
        question : '',
        answer : ''
    }

    onChangeQuestion = (question) => {
        this.setState(() => ({
           question 
        }))
    }
    onChangeAnswer = (answer) => {
        this.setState(() => ({
            answer
        }))
    }

    handleSubmit = () => {
        this.setState(() => ({
            question: '',
            answer: ''
        }))

        const { deckName } = this.props.navigation.state.params

        /*this.props.navigation.navigate(
            'DeckView', 
            { deckName: deckName}
        )*/
        this.props.navigation.goBack(null)

    }

    render (){
        const { question, answer } = this.state
        const validate = (question === '' || answer === '')
        return (
            <View style={styles.containers}>
                <Text style={styles.title}>Add New Card Here</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.question}
                    onChange={event => this.onChangeQuestion(event.nativeEvent.text)}
                    placeholder={`Add Question`}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.answer}
                    onChange={event => this.onChangeAnswer(event.nativeEvent.text)}
                    placeholder={`Add Answer`}
                />
                <SubmitBtn onPress={this.handleSubmit} disabled={validate ? true : false}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    title: {
        alignSelf: 'center',
        color: purple,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 20,
        paddingLeft: 10
    },
    submitBtn: {
        backgroundColor: purple,
        width: 200,
        height: 40,
        borderRadius: 50,
        padding: 20,
        marginTop: 17,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: 'center',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
  })

export default Decks

