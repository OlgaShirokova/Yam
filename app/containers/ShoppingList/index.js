import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { Title } from '@shoutem/ui'
import ShoppingListComponent from '../../components/ShoppingListComponent/'

class ShoppingList extends Component  {

  render() {
    return (
        <ShoppingListComponent
          data={ this.props.recipes }
          title = { <Title>SHOPPING</Title> }
        />
    )
  }

}

const mapStatetoProps = (state) => {
  const newValues = [];
  Object.keys(state.recipes.recipe).forEach(el=>{
    newValues.push(state.recipes.recipe[el])
  })
  return { recipes: newValues }
}

export default connect(mapStatetoProps)(ShoppingList)
