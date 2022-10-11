// react import 
import { useState, useEffect } from 'react';
// expo import
import { Text, ScrollView, SafeAreaView, View, Pressable } from 'react-native';
// localstorage import
import AsyncStorage from '@react-native-async-storage/async-storage';
// component import
import ModalBox from './components/ModalBox';
// styles import
import commonStyle from './styles/commonStyle';
// variabile a ccui assegnare valore input
let inputValue = ''
// array d'appoggio
let toDoArray = []

function App() {

  // state
  const [state, setState] = useState({
    refresh: false,
    toDo: []
  })

  // useEffect per popolare array
  useEffect(() => {
    getData().then(() => {
      setState({
        ...state,
        refresh: !state.refresh
      })
    })
  }, [])

  // funzione per estrapolare dati da local storage
  async function getData() {
    toDoArray = JSON.parse(await AsyncStorage.getItem('TodoArray'))
  }

  // funzione per storare l'array
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('TodoArray', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  // estrapola valore input
  function getValueInput(e) {
    inputValue = e
  }

  // bottone inserimento toDo
  function insertToDo() {
    // push nell'array
    toDoArray.push({
      value: inputValue,
      complete: false
    })
    storeData(toDoArray)
    // variabile che cambia per mostrare il cambiamento
    setState({
      ...state,
      refresh: !state.refresh
    })
  }

  // funzione che elimina
  const deleteItem = (index) => () => {
    toDoArray.splice(index, 1)
    storeData(toDoArray)
    setState({
      ...state,
      refresh: !state.refresh
    })
  }

  // funzione per il completamento
  const completeItem = (index) => () => {
    // console.log(state.toDo[index].complete)
    toDoArray[index].complete = true
    storeData(toDoArray)
    setState({
      refresh: !state.refresh,
    })
  }


  return (
    <SafeAreaView style={[commonStyle.genericContainer, commonStyle.paddingContainer]}>
      <ScrollView>
        <View className="title" style={commonStyle.container2}>
          <Text style={commonStyle.titleFont}>TODOLIST</Text>
          <ModalBox
            AppCalback={getValueInput}
            AppButtonCallback={insertToDo}
          />
        </View>
        <View style={commonStyle.todoBox}>
          {toDoArray.length > 0 &&
            toDoArray.map((e, index) => {
              return (
                <View style={[commonStyle.itemListBox, commonStyle.titleBg]} key={index}>
                  <View style={commonStyle.halfWidth}>
                    <Pressable onLongPress={completeItem(index)}>
                      <Text style={[commonStyle.normalTextSize, commonStyle.whiteColor]}>{e.value}</Text>
                    </Pressable>
                  </View>
                  <View style={[commonStyle.halfWidth, { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }]}>
                    {toDoArray[index].complete &&
                      <Text style={commonStyle.normalTextSize}>👌🏻</Text>
                    }
                    <Pressable onPress={deleteItem(index)}>
                      <Text style={[commonStyle.deleteText, commonStyle.normalTextSize]}>🗑</Text>
                    </Pressable>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;