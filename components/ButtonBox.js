import React from 'react';
import { Pressable,Text} from 'react-native';
import commonStyle from '../styles/commonStyle';


function ButtonBox(props) {

    function pressing() {
        props.callback()
    }

    return (
        <Pressable  style={[commonStyle.buttonBox,commonStyle.titleBg,commonStyle.centerItems,props.bg]}>
            <Text style={[commonStyle.whiteColor,commonStyle.boldFont,props.styleCss]} onPress={pressing} >{props.label}</Text>
        </Pressable>
    );
};


export default ButtonBox;

