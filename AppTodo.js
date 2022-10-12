// react import 
import { useState, useEffect, useCallback } from 'react';
// expo import
import { Text, ScrollView, SafeAreaView, View, Pressable, RefreshControl } from 'react-native';
// localstorage import
import AsyncStorage from '@react-native-async-storage/async-storage';
// component import
import ModalBox from './components/ModalBox';
import ButtonBox from './components/ButtonBox';
// styles import
import commonStyle from './styles/commonStyle';

// timeOut function
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
// variabile a ccui assegnare valore input
let inputValue = ''
// array d'appoggio
let toDoArray = []

function App() {

  // refreshing
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // state
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    refresh: false,
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
    let toDoStore = JSON.parse(await AsyncStorage.getItem('TodoArray'))
    if(toDoStore !== null){
      toDoArray = toDoStore
    }
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
    let objectTodo = {
      value: inputValue,
      complete: false
    }
    // push nell'array
    toDoArray.push(objectTodo)
    console.log(toDoArray)
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

  // funzione che elimina tutto
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('TodoArray').then(() => {
        toDoArray = []
      })
    } catch(e) {
      console.log(e)
    }
    console.log('all remove')
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
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} colors={[`#8a2be2`]} enabled={true} onRefresh={onRefresh} />}>
        <View className="title" style={commonStyle.container2}>
          <Text style={commonStyle.titleFont}>TODOLIST</Text>
          <ModalBox
            AppCalback={getValueInput}
            AppButtonCallback={insertToDo}
          />
        </View>
        <View style={commonStyle.todoBox}>
          { toDoArray.length > 0 &&
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
        { toDoArray.length > 1 &&
          <View style={commonStyle.container3}>
            <ButtonBox
            bg={commonStyle.secondaryBg}
            label={'Elimina tutto'}
            styleCss={commonStyle.normalTextSize}
            callback={removeValue}
            />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;