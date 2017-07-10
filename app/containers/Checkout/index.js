import React, { Component } from 'react';
import { View, Button, GridRow, NavigationBar, Subtitle, Title, ListView, Image ,Tile, Overlay} from '@shoutem/ui';
import { Text, TouchableOpacity, ScrollView, WebView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Checkout extends Component {

  constructor(props) {
    super(props)
    console.log('data   ----- ', this.props.data);
  }

  render () {
    return (
      <WebView
        source={{
          uri: 'https://www.ulabox.com/mi-carrito/productos/mas',
          method: 'POST',
          body: this.props.data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          }
        }}
        style={{marginTop: 20}}
      />
    )
  }
}

// https://www.ulabox.com/mi-carrito
