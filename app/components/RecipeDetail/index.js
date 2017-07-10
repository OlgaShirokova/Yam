import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationBar, Title, Subtitle, Image, Tile, Button, ListView , Caption} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/EvilIcons'
import { Actions } from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import Cookie from 'react-native-cookie';

import RecipeInstructions from '../RecipeInstructions/';
import RecipeMetaData from '../RecipeMetaData/';
import styles from './styles';

import { ingredientsUlabox } from '../../data/index.js';

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  postCart = () => {
    console.log('-------RECIPE-------', this.props.recipe);
    let mappedIngredients = [];
    let encodedIngredients = '';

    mappedIngredients = this.props.recipe.ingredients
    .map((el) => {
      if(ingredientsUlabox[el.id] !== undefined) return ingredientsUlabox[el.id].id
    })
    .filter((el) => el !== undefined)

    console.log('MAP', mappedIngredients);
    console.log('PROPS', this.props);
    if(mappedIngredients.length > 0) {
      encodedIngredients = mappedIngredients.reduce((accum, el) => {
        return accum + encodeURIComponent(`products[${el}][id]`)+`=`+encodeURIComponent(`${el}`)+`&`+encodeURIComponent(`products[${el}][qty]`)+`=1&`
      }, '')

      console.log('encodedIngredients ', encodedIngredients);
      Actions.checkout(encodedIngredients);
    } else {
      Actions.checkout()
    };

    // console.log(this.props.recipe.ingredients);
    // fetch(`https://www.ulabox.com/mi-carrito/productos/mas`,
    //   {
    //     method: 'POST',
    //     body: this.formData,
    //     headers: {
    //       'Content-Type': 'text/html',
    //     }
    //   }
    // )
    // .then(res => {
    //   console.log('---')
    //   return Cookie.get('https://www.ulabox.com/mi-carrito/productos/mas/')
    // })
    // .then(cookie => {
    //   Actions.checkout({cookie})
    // })
    // .catch(error => {
    //   console.log('error ', error);
    // });
  }


  render () {
    let renderInstructions
    let renderIngredients
    let renderEquipment
    const styles_sectionTitle = StyleSheet.flatten(styles.sectionTitle)
    const styles_buyTitle = StyleSheet.flatten(styles.buyTitle)
    if(this.props.instructions && this.props.recipe.ingredients) {
      renderInstructions = this.props.instructions.map((step) => {
        return (
          <RecipeInstructions step={step} key={this.props.recipe.id + step.number}/>
        )
      })

      renderIngredients = this.props.recipe.ingredients.map((el) => {
          return (
            <Tile key={el.id} style={{width:100, height: 150, marginRight: 10}}>
              <Image
                style={{width: 80, height: 80}}
                source={{uri: `${el.image}`}}
              />
              <Caption style={{width: 100, textAlign: 'center'}}>{el.amount} {el.unit}</Caption>
              <Caption style={{width: 100, textAlign: 'center'}}>{el.name}</Caption>
            </Tile>
          )
      })


      renderEquipment = this.props.instructions.map((step) => {
        return step.equipment.map(el => {
          return (
            <RecipeMetaData data={ el } width={ 90 } tileHeight= { 100 } imageHeight={ 50 }/>
          )
        })
      })
    }
    return (
    <View style={{flex:1}}>
      <NavigationBar
         styleName="inline"
         centerComponent={<Title>RECIPE</Title>}
         leftComponent={
           <Button
             onPress={() => Actions.recipeList()}>
             <Icon name="chevron-left" size={30}/>
           </Button>
         }
         rightComponent={
           <Button
             onPress={() => Actions.shoppingList()}>
             <Icon name="cart" size={30}/>
           </Button>
         }
      />
      <Image
        key={ this.props.recipe.id }
        styleName="large-banner"
        source={{ uri: `https://spoonacular.com/recipeImages/${this.props.recipe.image}` }}
        >
        <Tile>
          <Title styleName="md-gutter-bottom">{this.props.recipe.title}</Title>
        </Tile>
      </Image>
        <ScrollView style={{ margin: 20 }} showsVerticalScrollIndicator={false}>
          <View style={ styles_sectionTitle }>
            <Subtitle style={{ color: '#FFFFFF' }}>Equipment</Subtitle>
          </View>
          <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false }>
            {renderEquipment}
          </ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View style={styles_sectionTitle}>
              <Subtitle style={{color: '#FFFFFF'}}>Ingredients</Subtitle>
            </View>
            <Button onPress={() => this.postCart()} style={styles_buyTitle}>
              <Text>Buy now!</Text>
            </Button>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {renderIngredients}
          </ScrollView>
          <View style={styles_sectionTitle}>
            <Subtitle style={{color: '#FFFFFF'}}>Instructions</Subtitle>
          </View>
            { renderInstructions }
        </ScrollView>
        <ActionButton buttonColor='#000000'>
        <ActionButton.Item buttonColor='#9b59b6' title="Cooked!" onPress={() => this.props.handleCooked(this.props.recipe)}>
            <Icon name="chevron-left" size={30}/>
          </ActionButton.Item>
        </ActionButton>
    </View>
    )
  }
}
