import React, { Component } from 'react';
import { View, Button, GridRow, NavigationBar, Subtitle, Title, ListView, Image ,Tile, Overlay} from '@shoutem/ui';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';
import styles from './styles.js';

export default class RecipeList extends Component {
  renderRow = (data) => {
    const styles_recipeMeta = StyleSheet.flatten(styles.recipeMeta)
    const cells = data.map(item => {
      const cooked = item.cooked ? 'Cooked!': 'Lets cook'
      const icon = item.cooked? 'heart' : 'comment'
      return (
        <TouchableOpacity key={item.id} onPress={() => this.props.goToDetailPage({id: item.id})}>
          <Image
            key={ item.id }
            styleName="large-banner"
            source={{ uri: `https://spoonacular.com/recipeImages/${item.image}` }}
            >
          <Tile>
            <Title styleName="md-gutter-bottom">{item.title}</Title>
              <View styleName="actions">
                <View style={styles_recipeMeta} styleName=" horizontal v-center">
                  <Icon style={styles.icon} name="clock" size={15}/>
                  <Text style={styles.text}>{item.readyInMinutes} mins</Text>
                </View>
                <View style={styles_recipeMeta} styleName="horizontal v-center">
                  <Icon style={styles.icon} name={icon} size={15}/>
                  <Text style={styles.text}>{ cooked }</Text>
                </View>
              </View>
          </Tile>
        </Image>
      </TouchableOpacity>
      )
    })
    return (
      <GridRow columns = { 1 }>
        { cells }
      </GridRow>
    )
  }

  render () {
    const groupedData = GridRow.groupByRows(this.props.recipes, 1)
    return (
      <View style={{flex: 1}}>
        <NavigationBar
          styleName="inline"
          centerComponent={ <Title>RECIPES</Title> }
          rightComponent={
            <Button
              onPress={() => Actions.shoppingList()}>
              <Icon name="cart" size={30}/>
            </Button>
          }
        />
        <View>
        <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
            <ListView
              data={ groupedData }
              renderRow={ this.renderRow }
            />
        </ScrollView>
      </View>
    </View>
    )
  }
}
