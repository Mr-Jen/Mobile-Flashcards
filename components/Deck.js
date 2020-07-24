import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { gray } from '../utils/colors'

import { black, purple, white } from '../utils/colors'

class FlipCard extends Component {
  render() {
    const { title, color, num } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.fixedRatio}>
            <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate(
                        'DeckView', 
                        { deckName: title}
            )}>
                <View style={styles.flipCard}>
                    <View style={styles.cardContainer}>
                        <View style={styles.header}>
                            <Text style={[styles.headerText, {color: color}]}>{title}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.flipText}>
                                {`${num} ${num !== 1 ? 'cards' : 'card'}`}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
  },
  cardContainer: {
      flex: 1,
      alignSelf: 'flex-start',
      marginLeft: '8%'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 12,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: purple
  },
  flipCard: {
    height: '70%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(247, 244, 240)',
    backfaceVisibility: 'hidden',
    marginLeft: '10%',
    borderRadius: 10,
    marginTop: '10%',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  flipCardBack: {
    backgroundColor: white,
    position: "absolute",
    top: 0,
  },
  textContainer: {
      flex:1, 
      width: '95%', 
      justifyContent: 'flex-start', 
      marginTop: '20%'
  },
  flipText: {
    width: '90%',
    fontSize: 15,
    color: black,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: gray,
    lineHeight: 20,
  }
});

export default FlipCard