import React from 'react';
import { Text, ScrollView } from 'react-native';
import { View, Row , Divider, Caption, Subtitle, Image} from '@shoutem/ui';

export default ({step}) => {
  return (
      <View>
        <Row>
          <View styleName="vertical">
            <View style={{backgroundColor:'#000', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
              <Subtitle styleName="top" style={{color:'#FFF'}}>{step.number}</Subtitle>
            </View>
            <Subtitle>{step.step}</Subtitle>
          </View>
          <Divider styleName="line"/>
        </Row>
    </View>
  )
}
