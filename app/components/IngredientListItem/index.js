import React, { Component } from 'react';
import { Row, TextInput } from '@shoutem/ui';
import Swipeout from 'rc-swipeout/lib';
import AutoComplete from 'react-native-autocomplete';
import { AppRegistry, StyleSheet, Text, View, AlertIOS } from 'react-native';

// import { Apples } from '../../data/index.js'

const styles = StyleSheet.create({
  autocomplete: {
    alignSelf: 'stretch',
    height: 50,
    margin: 10,
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  }
});

export default class IngredientListItem extends Component {
  state = { data: [] }

  constructor(props) {
    super(props);
    this.onTyping = this.onTyping.bind(this)
  }

  onTyping(text) {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete?metaInformation=false&number=10&query=${text}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key':"U22l9xW2HymshjNYfrbP8U3Y4tPbp1stK76jsncRLKVTBHgxnO"
      }
    }).then(res => res.json())
      .then(data => {
        console.log('filtered 1 ', data);
        let filtered = data.filter(result => result.name.toLowerCase().startsWith(text.toLowerCase()))
            .map(result => result.name);
        console.log('filtered 2', filtered);
        this.setState({ data: filtered });
      });

  }

  onSelect = (value) => {
    // AlertIOS.alert('You choosed', value);
    this.handleValue(value);
    this.props.handleDislike(value, this.props.id)
  }

  handleValue = (value) => {
    this.props.onIngredient(value, this.props.id);
  }

  // <TextInput
  // placeholder={'e.g Bananas...'}
  // value={this.props.value}
  // onChangeText={(value) => this.handleValue(value)}
  // onEndEditing={(event) => this.props.handleDislike(event.nativeEvent.text, this.props.id)}
  // />

  render() {
    console.log('rendering id ', this.props.id);
    console.log('state to render', this.state.data);
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <AutoComplete
            style={styles.autocomplete}

            suggestions={this.state.data}
            onTyping={this.onTyping}
            onSelect={this.onSelect}


            autoCompleteTableViewHidden={false}
            placeholder="Search for an ingredient.."
            clearButtonMode="never"
            returnKeyType="go"
            textAlign="center"


            autoCompleteTableTopOffset={10}
            autoCompleteTableLeftOffset={20}
            autoCompleteTableSizeOffset={-40}
            autoCompleteTableBorderColor="lightblue"
            autoCompleteTableBackgroundColor="azure"
            autoCompleteTableCornerRadius={8}
            autoCompleteTableBorderWidth={1}

            autoCompleteFontSize={15}
            autoCompleteRegularFontName="Helvetica Neue"
            autoCompleteBoldFontName="Helvetica Bold"
            autoCompleteTableCellTextColor={'dimgray'}

            autoCompleteRowHeight={40}
            autoCompleteFetchRequestDelay={500}

            maximumNumberOfAutoCompleteRows={6}
          />
        </View>
      </View>
    );
  };
}
