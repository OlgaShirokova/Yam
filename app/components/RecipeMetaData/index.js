import React from 'react';
import { Text, ScrollView } from 'react-native';
import { View, Image, Tile, Caption} from '@shoutem/ui';

export default ({data, width, imageHeight, tileHeight}) => {
  return (
      <Tile key={data.id} style={{width, height: tileHeight, marginRight: 10}}>
        <Image
          style={{width, height: imageHeight}}
          source={{uri: `${data.image}`}}
        />
        <Caption style={{width, textAlign: 'center'}}>{data.name}</Caption>
      </Tile>

  )
}
