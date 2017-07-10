import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Text, ScrollView } from 'react-native';
import { View, Image, Screen, Title, Tile} from '@shoutem/ui';
import Spinner  from 'react-native-spinkit';
import { Actions } from 'react-native-router-flux';
import { getRecipes } from '../../store/actions/index.js'
import SwipeComponentButton from '../SwipeComponentButton';

class Main extends Component {
  constructor(props) {
    super(props)
    if (__DEV__) {
      console.log('Development');
    } else {
      console.log('Production');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user.survey) {
      this.goToRecipes()
    } else {
      this.goToSurvey()
    }
  }

  componentDidMount() {
    this.goToSurvey()
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
    },6000)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Image
        style={{flex: 1}}
        source= {require('../../images/yam-homepage-2.png')}
        />
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
