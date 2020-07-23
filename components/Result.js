import React, {Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

class Result extends Component {
    handleRestart = () => {
        this.props.handleRestart()
    }
    render (){
        const {correct, length, deckName } = this.props
        return (
            <View styles={{flex:1}}>
                <View style={styles.result}>
                    <Text style={styles.resultTitle}>Your Result:</Text>
                    <Text style={styles.resultScore}>You scored   {correct} / {length}</Text>
                    <Text style={styles.resultScore}>{Math.round(((correct/length)*100) * 100) / 100}% correct</Text>
                </View>
                <View style={styles.choice}> 
                    <TouchableOpacity style={styles.choiceBtn} onPress={this.handleRestart}>
                        <Text style={styles.choiceText}>Try again</Text>
                    </TouchableOpacity>                   
                    <TouchableOpacity style={styles.choiceBtn} onPress={() => this.props.navigation.navigate(
                        'DeckView',
                        { deckName: deckName}
                    )}>
                        <Text style={styles.choiceText}>Back To Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    result: {
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
    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: purple,
        borderBottomColor: purple,
        borderBottomWidth: 4
    },
    resultScore: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        color: purple
    },
    optionContainer: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center'
    },
    choice: {
        alignSelf: 'center',
        marginTop: 250
    },
    choiceBtn: {
        backgroundColor: purple,
        width: 200,
        height: 40,
        borderRadius: 10,
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
    choiceText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: white
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    options: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
    },
    option: {
        backgroundColor: 'rgb(31, 95, 22)',
        width: 100,
        height: 40,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    title: {
        marginTop: -10,
        marginBottom: 10,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: purple,
        fontWeight: 'bold'
    },
})

export default Result