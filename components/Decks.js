import React, { Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'

class Decks extends Component {
    render (){
        return (
            <View>
                <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate(
                    'DeckView', 
                    { deckName: 'Deck 1'}
                )}>
                    <Text style={{fontSize: 20}}>Deck 1</Text>
                    <Text style={{fontSize: 16, color: gray}}>2 Cards</Text> 
                </TouchableOpacity>
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

