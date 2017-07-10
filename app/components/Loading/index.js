import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, ScrollView } from 'react-native';
import { View, Image, Screen, Title, Tile} from '@shoutem/ui';
import Spinner  from 'react-native-spinkit';
import { Actions } from 'react-native-router-flux';
import { getRecipes } from '../../store/actions/index.js'
import SwipeComponentButton from '../SwipeComponentButton';

class Main extends Component {

  componentDidMount() {
    if (this.props.lastFetched + 604800000 <= Date.now() || !this.props.lastFetched) {
      this.props.getRecipes()
    }
    this.goToRecipes()
  }

  goToSurvey = () => {
    setTimeout(() => {
      Actions.pop()
      Actions.survey()
    },3000)
  }

  goToRecipes = () => {
    setTimeout(() => {
      Actions.pop()
      Actions.recipeList()
    },8000)
  }

  render() {
    return (
      <View style={{flex:1, alignItems: 'stretch'}}>
        <Image
        style={{flex: 0.5 }}
        blurRadius={1}
        source= {{uri: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop='}}
        >
        <Tile>
          <Spinner isVisible={true} size={100} color={'#FFFFFF'} type={'Arc'}/>
          <Title>FINDING RECIPES JUST FOR YOU</Title>
        </Tile>
        </Image>
      </View>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    user: state.user,
    recipes: state.recipes.recipe,
    cooked: state.recipes.cooked,
    lastFetched: state.recipes.lastFetched
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes())
})



export default connect(mapStatetoProps, mapDispatchToProps)(Main)
