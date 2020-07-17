import React, { Component} from 'react'
import { View, Text, TextInput } from 'react-native'

class Decks extends Component {
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

    render (){
        return (
            <View>
                <Text>Add New Deck Here</Text>
                <TextInput
                    value={this.state.question}
                    onChange={question => this.onChangeQuestion(question)}
                />
                <TextInput
                    value={this.state.answer}
                    onChange={answer => this.onChangeAnswer(answer)}
                />
            </View>
        )
    }
}

export default Decks

