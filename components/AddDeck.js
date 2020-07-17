import React, { Component} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { white, purple } from '../utils/colors'

function SubmitBtn ({ onPress }) {
    return (
        <TouchableOpacity
            style={styles.submitBtn}
            onPress={onPress}
            enabled='false'
        >
            <Text style={styles.submitBtnText}>Create</Text>
        </TouchableOpacity>
    )
  }

class Decks extends Component {
    state = {
        name: ''
    }

    handleChangeName = (name) => {
        this.setState(() => ({
            name
        }))
    }

    handleOnPress = () => {
        alert(this.state.name)
        // Dispatch new deck name
    }

    render (){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add New Deck Here</Text>
                <TextInput
                    placeholder='Deck Name'
                    style={styles.input}
                    value={this.state.name}
                    onChange={(name) => this.handleChangeName(name.nativeEvent.text)}
                />
                <SubmitBtn onPress={this.handleOnPress}/>
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
        margin: 20
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

export default Decks

