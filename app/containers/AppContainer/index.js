import React, { Component } from 'react';
import { Scene, Router, Switch } from 'react-native-router-flux';
import { connect } from 'react-redux';

import SurveyContainer from '../SurveyContainer/';
import RecipeListContainer from '../RecipeListContainer';
import RecipeDetailPage from '../RecipeDetailPage';
import Main from '../../components/Main/';
import Loading from '../../components/Loading/';
import ShoppingList from '../ShoppingList';
import Checkout from '../Checkout';

export default class AppContainer extends Component {

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="main" component={ Main }  hideNavBar={true}/>
          <Scene key="survey" type="replace" component={ SurveyContainer }  hideNavBar={true}/>
          <Scene key="loading" component={ Loading }  hideNavBar={true}/>
          <Scene key="shoppingList" component={ ShoppingList }  hideNavBar={true}/>
          <Scene key="recipeList" component={ RecipeListContainer }  hideNavBar={true}/>
          <Scene key="recipesDetailPage" component={ RecipeDetailPage }  hideNavBar={true}/>
          <Scene key="checkout" component={ Checkout }  hideNavBar={true}/>
        </Scene>
      </Router>
    );
  }
}
