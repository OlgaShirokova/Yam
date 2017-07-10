import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ListView , ScrollView, Text } from 'react-native';
import { NavigationBar, Title, Button, Subtitle, View } from '@shoutem/ui';

import Icon from 'react-native-vector-icons/Ionicons'

import IngredientListItem from '../../components/IngredientListItem/';
import SwipeComponentButton from '../../components/SwipeComponentButton/';
import { dislikeIngredient } from '../../store/actions/'


class IngredientList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ingredients: [""]
    }
  }

  handleDislike = (ingredient, id) => {
    console.log(ingredient);
    this.props.dislikeIngredient(ingredient, id)
  }

  addInput = () => {
    // const length = this.state.ingredients.length
    // console.log(length, this.state.index);
    // console.log(this.state.ingredients);
    // if(length < this.state.index || this.state.ingredients[length-1] === "") return

    let nextIndex = this.state.index+1;
    this.setState({ ingredients: this.state.ingredients.concat(""), index: nextIndex })
    // console.log('state', this.state);
    // console.log('dislikes', this.props.state.user.dislikes);
    // console.log('prooops', this.props);
    // console.log('index', this.state.index);
  }

  getIngredient = (ingr, i) => {
    console.log('newINGR', ingr);
    const newIngredients = [
      ...this.state.ingredients.slice(0, i),
      ingr,
      ...this.state.ingredients.slice(i+1, this.state.ingredients.length)
    ]
    .filter(el => el !== "")
    .concat("")

    this.setState({
      ingredients: newIngredients
    })
    console.log('NEWINGR', newIngredients);

    // newIngredients[newIngredients.length-1]!=="" && this.addInput()
    //
    // const newnewIng = newIngredients.map((el, i) => {
    //   return el !== ""
    // }).concat("")
    // console.log('newIngr',newnewIng);
    // this.setState({
    //   ingredients: newIngredients
    // })

  }

  render() {
    console.log(this.state);
    let Arr = this.state.ingredients.map((el, i) => {
      // console.log('i', i);
      // console.log(this.state.ingredients);
      return (
        <IngredientListItem
          onIngredient={this.getIngredient}
          handleDislike={this.handleDislike}
          value={el}
          key={i}
          id={i}
        />
      )
    })
    return (
    <View style={{flex: 1}}>
      <NavigationBar
      styleName="inline"
      centerComponent={ <Title>I DONT LIKE</Title> }
      />
      <ScrollView style={{flex: 1}}>
          { Arr }
      </ScrollView>
    </View>
    )
  }
}

const mapStatetoProps = (state) => {
  return { state }
}

const mapDispatchToProps = (dispatch) => ({
  dislikeIngredient: (ingredient, id) => dispatch(dislikeIngredient(ingredient, id)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(IngredientList)
