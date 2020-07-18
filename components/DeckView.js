import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { gray, purple, white, red } from '../utils/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params

        return {
            title: deckName
        }
    }
    render (){
        const { deckName } = this.props.navigation.state.params
        const deck = this.props.decks[deckName]

        return (
            <View> 
                <Text>Deck Details - {deckName}</Text>
                <View style={styles.item}>
                    <Text style={{fontSize: 20}}>{deckName}</Text>
                    <Text style={{fontSize: 16, color: gray}}>{`${deck.cards.length} cards`}</Text> 
                </View>
                <View style={styles.option}>                    
                    <TouchableOpacity style={styles.optionBtn} onPress={() => this.props.navigation.navigate(
                        'AddCard',
                        { deckName: deckName}
                    )}>
                        <Text style={styles.optionText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn}>
                        <Text style={styles.optionText}>Start Quiz</Text>
                    </TouchableOpacity>
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