import * as React from 'react';
import {View, Text} from 'react-native';

export default function FoodScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        onPress={() => navigation.navigate('EAT')}
        style={{fontSize: 26, fontWeight: 'bold'}}>
        fuuuuuud
      </Text>
    </View>
  );
}
