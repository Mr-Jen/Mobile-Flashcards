import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import { black, purple, white } from '../utils/colors'

class FlipCard extends Component {

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
    
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard() {
    this.props.onFlipped()
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true
      }).start();
    }
  }

  onPressCard = () => {
      this.flipCard()
      this.props.onPress()
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    const { length, position, deck } = this.props

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onPressCard()}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <View style={styles.header}>
                  <FontAwesome style={styles.headerIcon} name="question-circle-o" size={24} color={purple} />
                  <Text style={styles.headerText}>Question {position+1}:</Text>
                  <View style={{justifyContent: 'center', marginLeft: '45%'}}>
                      <Text style={{fontWeight: 'bold'}}>{position+1}/{length}</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.flipText}>
                        {deck.cards[position].question} ?
                    </Text>
                </View>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                <View style={styles.header}>
                  <FontAwesome5 style={styles.headerIcon} name="check-circle" size={24} color={'rgba(9, 119, 9, 0.795)'} />
                  <Text style={[styles.headerText, {color: 'rgba(9, 119, 9, 0.795)'}]}>Answer:</Text>
                  <View style={{justifyContent: 'center', marginLeft: '45%'}}>
                      <Text style={{fontWeight: 'bold', marginLeft: '30%'}}>{position+1}/{length}</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.flipText}>
                        {deck.cards[position].answer}
                    </Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingLeft: '9%',
    position: 'absolute',
    top: 15,
  },
  headerIcon: {
    alignSelf: 'center',
    marginLeft: '-3%',
    marginRight: '5%'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: purple
  },
  flipCard: {
    height: '70%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    backfaceVisibility: 'hidden',
    marginLeft: '10%',
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
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: 30,
    paddingLeft: 20
  }
});

export default FlipCard