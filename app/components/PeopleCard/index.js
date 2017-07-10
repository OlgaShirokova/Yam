import React, { Component } from 'react';

import { View , Card, Image, Title, Button, NavigationBar } from '@shoutem/ui';
import { Text, Slider, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles'

export default class PeopleCard extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <View>
        <NavigationBar
           styleName="inline"
           centerComponent={<Title>SERVINGS</Title>}
         />
        <Image
        style={{height: 300, width: 375}}
        source={{uri: 'https://images.unsplash.com/photo-1493274366568-b608e3895174?dpr=2&auto=format&fit=crop&w=1500&h=1060&q=80&cs=tinysrgb&crop=&bg='}}
        />
        <Picker
          style={{ margin: 0 }}
          selectedValue={this.props.value}
          onValueChange={(value) => this.props.handleChange(value)}>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
        <View style={{marginTop: 30}} styleName = "horizontal h-center v-center">
          <Icon size={30} name="person" color="#70C1B3" />
          <Text style={styles.people}>{this.props.value} people</Text>
        </View>
      </View>
    )
  }
}
