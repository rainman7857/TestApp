import React, { useState, useEffect } from 'react';
import TestScreen from './src/containers/TestScreen'
import AsyncStorage from '@react-native-community/async-storage';

import { useStores } from "./src/store";

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  const [loaded, setLoaded] = useState(false)
  const { MainStore } = useStores();
  useEffect(() => {
    getStorage()
  }, [])
  async function getStorage() {
    try {
      const value = await AsyncStorage.getItem('data')
      if(value !== null) {
        const obj = JSON.parse(value)
        MainStore.changeMain(obj)
        setLoaded(true)
      } else { setLoaded(true) }
    } catch(e) {
      setLoaded(true)
      console.log("get e", e)
    }
  }
  return (
    <>
      {loaded ? <TestScreen /> : null}
    </>
  );
};

export default App;
