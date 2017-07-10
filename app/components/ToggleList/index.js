import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListView, NavigationBar, Title } from '@shoutem/ui';

import ToggleListItem from '../ToggleListItem/';

export default class ToggleList extends Component {

  renderRow = (row) => {
    return (
      <ToggleListItem
        name = { row }
        handleData={() => this.props.handleData (row)}
      />
    )
  }

  render() {
    return (
    <View style={{flex: 1, paddingBottom: 60}}>
        <NavigationBar
          styleName="inline"
          centerComponent={ this.props.title }
        />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListView
          data={ this.props.data }
          renderRow = {(row) => this.renderRow(row) }
        />
      </ScrollView>
    </View>
    );
  };
}
