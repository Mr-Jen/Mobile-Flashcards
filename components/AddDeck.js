import React, { Component} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import { white, purple } from '../utils/colors'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'

function SubmitBtn ({ onPress, disabled }) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.submitBtnText}>Create</Text>
        </TouchableOpacity>
    )
  }

class AddDeck extends Component {
    state = {
        title: ''
    }

    handleChangeTitle = (title) => {
        this.setState(() => ({
            title
        }))
    }

    handleOnAdd = () => {
        const title = this.state.title
        // Dispatch new deck title
        const deck = {
            title: title,
            cards: []
        }

        this.props.dispatch(addDeck({
            [title]: deck
        }))
        
        submitDeck({ title, deck })
        this.setState(() => ({
            title: ''
        }))
        
        this.props.navigation.navigate(
            'DeckView', 
            { deckName: title}
        )
    }

    render (){
        const { title } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add New Deck Here</Text>
                <TextInput
                    placeholder={`Deck name`}
                    style={styles.input}
                    value={title}
                    onChange={(title) => this.handleChangeTitle(title.nativeEvent.text)}
                />
                <SubmitBtn onPress={this.handleOnAdd} disabled={title === '' ? true : false}/>
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
        fontSize: 25,
        fontWeight: 'bold'
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 20,
        padding: 10
    },
    submitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
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

export default connect()(AddDeck)

