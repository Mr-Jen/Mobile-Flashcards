import React, { Component} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { white, purple, orange, red, green, brown, yellow, blue } from '../utils/colors'
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
        title: '',
        color: null
    }

    handleChangeTitle = (title) => {
        this.setState(() => ({
            title
        }))
    }

    handleOnAdd = () => {
        const {title, color } = this.state

        // Dispatch new deck title
        const deck = {
            title: title,
            color: color,
            cards: []
        }

        this.props.dispatch(addDeck({
            [title]: deck
        }))
        
        submitDeck({ title, deck })
        this.setState(() => ({
            title: '',
            color: null
        }))
        
        this.props.navigation.navigate(
            'DeckView', 
            { deckName: title}
        )
    }

    onChangeColor = (color) => {
        this.setState({
            color
        })
    }

    render (){
        const { title, color } = this.state

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add New Deck Here</Text>
                <TextInput
                    placeholder={`Deck name`}
                    style={styles.input}
                    value={title}
                    onChange={(title) => this.handleChangeTitle(title.nativeEvent.text)}
                />
                <View styles={styles.colorPicker}>
                    <Text style={styles.colorPickerTitle}>Pick a color for your deck:</Text>
                    <View style={styles.colors}>
                        <TouchableOpacity 
                            onPress={() => this.onChangeColor('yellow')} 
                            style={
                                [styles.color, 
                                {
                                    backgroundColor: yellow, 
                                    borderColor: color === 'yellow' ? 'rgb(0, 0, 0)' : null,
                                    borderWidth: color === 'yellow' ? 3 : null,
                                }]
                            }
                        ></TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.onChangeColor('orange')} 
                            style={
                                [styles.color, 
                                {
                                    backgroundColor: orange, 
                                    borderColor: color === 'orange' ? 'rgb(0, 0, 0)' : null,
                                    borderWidth: color === 'orange' ? 3 : null,
                                }]
                            }
                        ></TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.onChangeColor('red')} 
                            style={
                                [styles.color, 
                                {
                                    backgroundColor: red, 
                                    borderColor: color === 'red' ? 'rgb(0, 0, 0)' : null,
                                    borderWidth: color === 'red' ? 3 : null,
                                }]
                            }
                        ></TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.onChangeColor('brown')} 
                            style={
                                [styles.color, 
                                {
                                    backgroundColor: brown, 
                                    borderColor: color === 'brown' ? 'rgb(0, 0, 0)' : null,
                                    borderWidth: color === 'brown' ? 3 : null,
                                }]
                            }
                        ></TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.onChangeColor('green')} 
                            style={
                                [styles.color, 
                                {
                                    backgroundColor: green, 
                                    borderColor: color === 'green' ? 'rgb(0, 0, 0)' : null,
                                    borderWidth: color === 'green' ? 3 : null,
                                }]
                            }
                        ></TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.onChangeColor('blue')} 
                            style={
                                [styles.color, 
                                {
                                    backgroundColor: blue, 
                                    borderColor: color === 'blue' ? 'rgb(0, 0, 0)' : null,
                                    borderWidth: color === 'blue' ? 3 : null,
                                }]
                            }
                        ></TouchableOpacity>
                    </View>
                </View>
                <SubmitBtn onPress={this.handleOnAdd} disabled={title === '' ? true : false}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white,
      paddingTop: 40
    },
    colorPickerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 13,
        marginBottom: -5,
        marginTop: 30
    },
    colors: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        height: 50,
        width: 350,
        margin: 20,
        borderColor: purple,
        alignSelf: 'center',
    },
    color: {
        margin: 13,
        backgroundColor: purple,
        borderRadius: 50,
        width: 30,
        height: 30,
    },
    title: {
        alignSelf: 'center',
        color: purple,
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 20
    },
    input: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        margin: 20,
        padding: 10,
        borderRadius: 10
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
      borderRadius: 8,
      marginTop: 20
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

