import * as React from 'react';
import {View, Text} from 'react-native';

const SelectionScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        onPress={() => navigation.navigate('SELECTION')}
        style={{fontSize: 26, fontWeight: 'bold'}}>
        SELEKKKT
      </Text>
    </View>
  );
};

export default SelectionScreen;
