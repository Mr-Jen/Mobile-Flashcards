import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { gray, purple } from '../utils/colors'
import { fetchDeckResults, clearAll } from '../utils/api'
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

        if(!Object.keys(decks).length){
            return <View style={styles.noDeck}><Text style={styles.noDeckText}>No decks here so far</Text></View>
        }
        else {
            return (
                <ScrollView>                
                    {
                        Object.keys(decks).map((title) => {
                            const deck = decks[title]
                            const num = deck.cards.length
                            return (                            
                                <View key={title}>
                                    <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate(
                                        'DeckView', 
                                        { deckName: title}
                                    )}>
                                        <Text style={{fontSize: 20}}>{title}</Text>
                                        <Text style={{fontSize: 16, color: gray}}>{`${num} ${num !== 1 ? 'cards' : 'card'}`}</Text> 
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            )
        }
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
    noDeck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDeckText: {
        color: purple,
        fontWeight: 'bold',
        fontSize: 20
    }
})

function mapStateToProps (decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)

