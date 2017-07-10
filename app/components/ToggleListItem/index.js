import React, { Component } from 'react';
import { Switch } from 'react-native';
import { Button, Row, Subtitle, Caption } from '@shoutem/ui';

export default class ToggleListItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      switchIsOn: false,
    }
  };

  handleSwitch = (value) => {
    this.props.handleData()
    this.setState({ switchIsOn: value })
  }


  render() {
    return (
      <Row>
        <Subtitle>{this.props.name}</Subtitle>
        <Button styleName="right-icon">
          <Switch
            value={ this.state.switchIsOn }
            onValueChange={(value) => { this.handleSwitch(value) }}
          />
        </Button>
      </Row>
    );
  }
};
