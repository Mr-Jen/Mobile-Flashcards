import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';

import { black, purple, white, gray } from '../utils/colors'

class FlipCard extends Component {
    
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
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.flipCard()}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Question 1:</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.flipText}>
                        How tall are the pyramids in Egypt?ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    </Text>
                </View>
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                <Text style={styles.flipText}>
                    This text is flipping on the back.
                </Text>
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
    alignSelf: 'flex-start',
    paddingLeft: '15%',
    position: 'absolute',
    top: 15,
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