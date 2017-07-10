import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListView, NavigationBar, Title, Row, Text, Image, Button, Subtitle, Caption, Divider } from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/EvilIcons'


export default class ShoppingListComponent extends Component {
  renderHeader = (section, index, isActive) => {
    const icon = isActive ? "chevron-down" : "chevron-right"
    return (
        <Row>
          <Text>{section.title}</Text>
          <Icon name={icon} size={30}/>
        </Row>
    );
  }

  renderContent = (section) => {
    console.log(section);
    return (
      section.ingredients.map(el => {
        const unit = el.unitLong === 'grs' || el.unitLong === 'gr'  ? 'g' : el.unitLong === 'ounces'  ? 'oz' : el.unitLong.toLowerCase()
        const amount = el.amount < 1 ? `${1}/${1/el.amount}` : el.amount
        const name = `${amount} ${unit} ${el.name}`
console.log(el.id);
        return (
          <View key={el.id}>
            <Subtitle style={{margin: 15, marginBottom:0}}>{name}</Subtitle>
            <Row style={{paddingTop: 5}}>
              <View styleName="horizontal  space-between">
                <Caption>{section.cost[el.id].name}</Caption>
                <Caption>£{section.cost[el.id].price.toFixed(2)}</Caption>
              </View>
            </Row>
            <Divider styleName="line" />
          </View>
        )
      })
    );
  }

  render() {
    return (
    <View style={{flex: 1}}>
        <NavigationBar
          styleName="inline"
          centerComponent={ this.props.title }
          leftComponent={
            <Button
              onPress={() => Actions.recipeList()}>
              <Icon name="chevron-left" size={30}/>
            </Button>
          }
        />
      <ScrollView showsVerticalScrollIndicator={false} style={{margin: 10}}>
        <Accordion
          sections={ this.props.data }
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
        />
      </ScrollView>
    </View>
    );
  };
}
