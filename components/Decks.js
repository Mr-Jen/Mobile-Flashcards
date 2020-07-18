import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { gray } from '../utils/colors'
import { fetchDeckResults, submitDeck, clearAll } from '../utils/api'
import { receiveDecks } from '../actions'

class Decks extends Component {

    componentDidMount (){
        const { dispatch } = this.props

        //clearAll()

        fetchDeckResults()
            .then((decks) => dispatch(receiveDecks(decks)))
    }

    render (){
        const { decks } = this.props
        return (
            <View>                
                {
                    Object.keys(decks).map((title) => {
                        const deck = decks[title]
                        return (                            
                            <View key={title}>
                                <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate(
                                    'DeckView', 
                                    { deckName: title}
                                )}>
                                    <Text style={{fontSize: 20}}>{title}</Text>
                                    <Text style={{fontSize: 16, color: gray}}>{deck.cards.length}</Text> 
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
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
})

function mapStateToProps (decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)

