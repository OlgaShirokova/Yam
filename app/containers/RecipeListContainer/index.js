import React , { Component } from 'react';
import { connect } from 'react-redux';

import { getRecipes, getRecipesDetail } from '../../store/actions/';
import RecipeList from '../../components/RecipeList/index.js';
import { Actions } from 'react-native-router-flux';
class RecipeListContainer extends Component  {
  constructor(props) {
    super(props)
  }


  goToDetailPage = (id) => {
    Actions.recipesDetailPage(id)
  }

  render() {
    return (
      <RecipeList
        recipes={ this.props.recipes }
        goToDetailPage = { this.goToDetailPage }
      />
    )
  }

}

const mapStatetoProps = (state) => {
  return {
      recipes: state.recipes.recipe,
      cooked: state.recipes.cooked,
      lastFetched: state.recipes.lastFetched
   }
}

const mapDispatchToProps = (dispatch) => ({
  getRecipes: () => dispatch(getRecipes()),
  getRecipesDetail: (id) => dispatch(getRecipesDetail(id)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(RecipeListContainer)
