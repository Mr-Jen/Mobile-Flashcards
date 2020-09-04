import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
 
class EditDeck extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckName } = navigation.state.params

        return {
            title: deckName
        }
    }

    render (){
        return (
            <View>
                <Text>
                    Edit view
                </Text>
            </View>
        )
    }
}

export default connect()(EditDeck)