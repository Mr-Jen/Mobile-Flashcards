import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { gray } from '../utils/colors'

const Deck = (props) => {
    const { title, num } = props
    return (
        <View style={styles.container}>
            <View style={styles.fixedRatio}>
                <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate(
                    'DeckView', 
                    { deckName: title}
                )}>
                    <Text style={{fontSize: 20}}>{title}</Text>
                    <Text style={{fontSize: 16, color: gray}}>{`${num} ${num !== 1 ? 'cards' : 'card'}`}</Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
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

export default Deck