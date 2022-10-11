import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import commonStyle from '../styles/commonStyle';
import InputBox from './InputBox';
import ButtonBox from './ButtonBox';

const ModalBox = (props) => {

  const [modalVisible, setModalVisible] = useState(false);

  function modalCallback(e){
    props.AppCalback(e)
  }

  function modalButtonCallback(){
    props.AppButtonCallback()
  }


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <InputBox
           callback={modalCallback}
           />
        <ButtonBox
        label={'ADD'}
        callback={modalButtonCallback}
        />
            <Pressable
              style={[commonStyle.buttonBox]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[commonStyle.boldFont,commonStyle.lineButton]}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width:'90%',
    height:'30%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'blueviolet',
    height:60,
    width:60,
    borderRadius:60,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#101010",
    shadowOffset: {
    width: 0,
    height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,
    elevation: 12,
  },
  buttonClose: {
    backgroundColor: 'blueviolet',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalBox;