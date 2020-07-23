import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import { gray, purple } from '../utils/colors'
import { fetchDeckResults, clearAll } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck from './Deck'

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
                            const color = deck.color
                            const num = deck.cards.length
                            return (                            
                                <View key={title} style={{flex: 1}}>
                                    <Deck title={title} num={num} color={color} navigation={this.props.navigation}/>
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

