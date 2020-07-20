import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ConfirmDialog } from 'react-native-simple-dialogs'

import { gray, purple, white, red } from '../utils/colors'
import { removeDeckFromStorage } from '../utils/api'
import { removeDeck } from '../actions'

class DeckView extends Component {
    state = {
        dialogVisible: false
    }

    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params

        return {
            title: deckName
        }
    }

    delete = () => {
        const { deckName } = this.props.navigation.state.params

        this.setState({
            dialogVisible: false
        })

        this.props.navigation.navigate('Decks')
        removeDeckFromStorage(deckName)
        this.props.dispatch(removeDeck(deckName))
    }

    noDelete = () => {
        this.setState({
            dialogVisible: false
        })
    }


    render (){
        const { deckName } = this.props.navigation.state.params
        const deck = this.props.decks[deckName]
        const num = deck && deck.cards.length

        return (
            <View>
                <View style={styles.item}>
                    <Text style={{fontSize: 20}}>{deckName}</Text>
                    <Text style={{fontSize: 16, color: gray}}>{`${num} ${num !== 1 ? 'cards' : 'card'}`}</Text> 
                </View>
                <View style={styles.option}>                    
                    <TouchableOpacity style={styles.optionBtn} onPress={() => this.props.navigation.navigate(
                        'AddCard',
                        { deckName: deckName}
                    )}>
                        <Text style={styles.optionText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn} onPress={() => this.props.navigation.navigate(
                        'Quiz',
                        { deckName: deckName}
                    )}>
                        <Text style={styles.optionText}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => this.setState({dialogVisible: true})}>
                        <Text style={styles.delete}>Delete Deck</Text>
                    </TouchableOpacity>
                    <ConfirmDialog
                        title="Confirm Delete"
                        message="Are you sure you want to delete this deck?"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({dialogVisible: false})}
                        positiveButton={{
                            title: "YES",
                            onPress: () => this.delete()
                        }}
                        negativeButton={{
                            title: "NO",
                            onPress: () => this.noDelete()
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
        },
    },
    option: {
        alignItems: 'center',
        marginTop: 100
    },
    optionBtn: {
        backgroundColor: purple,
        width: 200,
        height: 40,
        borderRadius: 50,
        padding: 20,
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
    deleteBtn: {
        width: 200,
        height: 40,
        padding: 20,
        marginTop: 10,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    },
    delete: {
        color: red,
        alignSelf: 'center'
    },
    optionText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: white
    }
})

function mapStateToProps (decks){
    return {
        decks
    }
}


export default connect(mapStateToProps)(DeckView)