import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'

class Decks extends Component {
    decks = {
        1: {
            name: 'Deck 1',
            cards: 2
        },
        2: {
            name: 'Deck 2',
            cards: 5
        }
    }
    render (){
        console.log(this.decks[1].name)
        return (
            <View>                
                {
                    Object.keys(this.decks).map((id) => {
                        const deck = this.decks[id]
                        return (                            
                            <View key={id}>
                                <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate(
                                    'DeckView', 
                                    { deckName: this.decks[id].name}
                                )}>
                                    <Text style={{fontSize: 20}}>{deck.name}</Text>
                                    <Text style={{fontSize: 16, color: gray}}>{deck.name}</Text> 
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

export default Decks

