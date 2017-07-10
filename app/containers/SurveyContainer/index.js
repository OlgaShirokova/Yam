import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Title, Text } from '@shoutem/ui';
import { Actions } from 'react-native-router-flux';

import { userServings, userAllergies, getRecipes, userDiet, userSurvey } from '../../store/actions/'
import PeopleCard from '../../components/PeopleCard/';
import ToggleList from '../../components/ToggleList/';
import SwipeComponentButton from '../../components/SwipeComponentButton/'
import IngredientList from '../IngredientList/';
import { allergies, diet } from '../../data/'

class SurveyContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: 1,
    }
  }

  clickDisLike = (ingredient) => {
    this.props.dislikeIngredient(ingredient);
  }

  handleSlideChange = (value) => {
    this.setState({value})
    this.props.userServings(value)
  }

  handleAllergy = (allergy) => {
    this.props.allergies(allergy)
  }

  handleDiet = (diet) => {
    this.props.diets(diet)
  }

  handleSurvey = () => {
    this.props.userSurvey()
  }

  renderPagination = (index, total, context) => {
    this.props.userSurvey
    if(index + 1  === total) {
      return (
        <SwipeComponentButton handleSurvey={ this.handleSurvey }/>
      )
    }
  }

  render() {
    return (
      <Swiper
          showsButtons={true}
          nextButton={<Text style={{color: '#000', fontSize: 50, fontFamily: 'Arial'}}>›</Text>}
          prevButton={<Text style={{color: '#000', fontSize: 50, fontFamily: 'Arial'}}>‹</Text>}
          buttonWrapperStyle={{ alignItems: 'flex-end' }}
          showsPagination={true}
          renderPagination={ this.renderPagination }
          paginationStyle={{
            bottom: 1000, left: null, right: 10
          }} loop={false}>
          <IngredientList />
          <PeopleCard
            value={ this.state.value }
            handleChange={ this.handleSlideChange }
          />
          <ToggleList
            data={ allergies }
            handleData={ this.handleAllergy }
            title = { <Title>ALLERGIES</Title> }
          />
          <ToggleList
            data={ diet }
            handleData={ this.handleDiet }
            title = { <Title>DIET</Title> }
          />
      </Swiper>
    );
  };
}

const mapStatetoProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = (dispatch) => ({
  likeIngredient: (ingredient) => dispatch(likeIngredient(ingredient)),
  dislikeIngredient: (ingredient) => dispatch(dislikeIngredient(ingredient)),
  userServings: (value) => dispatch(userServings(value)),
  allergies: (allergy) => dispatch(userAllergies(allergy)),
  diets: (diet) => dispatch(userDiet(diet)),
  getRecipes: () => dispatch(getRecipes()),
  userSurvey: () => dispatch(userSurvey())
})

export default connect(mapStatetoProps, mapDispatchToProps)(SurveyContainer)
