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
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.cardNumber}>{`${num} ${num !== 1 ? 'cards' : 'card'}`}</Text> 
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    fixedRatio: {
        flex: 1,
     },
    item: {
        flex: 1,
        backgroundColor: 'rgb(238, 232, 225)',
        borderRadius: 2,
        padding: 20,
        height: 150,
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
    cardContent: {
        marginTop: '-15%',
        paddingLeft: '2%'
    },
    title: {
        fontSize: 20,
    },
    cardNumber: {
        fontSize: 16, 
        color: gray,
    }
})

export default Deck