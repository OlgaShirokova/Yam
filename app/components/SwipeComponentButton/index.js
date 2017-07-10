import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, View } from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';

export default class SwipeComponentButton extends Component  {

  _onPress = () => {
    this.props.handleSurvey()
    Actions.loading()
  }

  render() {
    return (
      <View styleName="horizontal h-center">
      <Button
      styleName="full-width, dark"
      style={{borderRadius: 20, width: 125, padding: 5, backgroundColor: '#000', bottom: 22 }}
      onPress={() => this._onPress()}>
      <Text style={{color: '#FFF'}}>FINISH SURVEY</Text>
      </Button>
      </View>
    )
  }
}
