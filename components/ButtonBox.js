import React from 'react';
import { Pressable,Text} from 'react-native';
import commonStyle from '../styles/commonStyle';


function ButtonBox(props) {

    function pressing() {
        props.callback()
    }

    return (
        <Pressable  style={[commonStyle.buttonBox,commonStyle.titleBg]}>
            <Text style={[commonStyle.whiteColor,commonStyle.boldFont]} onPress={pressing} >{props.label}</Text>
        </Pressable>
    );
};


export default ButtonBox;

