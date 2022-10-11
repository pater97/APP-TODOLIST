import React from 'react';
import { TextInput, View } from 'react-native';
import commonStyle from '../styles/commonStyle';

function InputBox(props){

  function typing(e){
    props.callback(e)
  }

  return (
    <View>
      <TextInput style={commonStyle.inputBox} onChangeText={typing}  />
    </View>
  );
};


export default InputBox;