import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Picker } from 'react-native'
import _ from 'lodash'
import AsyncStorage from '@react-native-community/async-storage';
import { useAppState } from '@react-native-community/hooks'
import { observer } from "mobx-react";
import { toJS } from 'mobx'
import { useStores } from "../store";

import { ButtonIcon } from '../components'

function TestScreen(props) {
  const { MainStore } = useStores();
  const main = toJS(MainStore)
  const [countries, setCountries] = useState(main.testState.countries)
  const [currencies, setCurrencies] = useState(main.testState.currencies)
  const [country, setCountry] = useState(main.testState.country);
  const [currency, setCurrency] = useState(main.testState.currency);
  const [currencyCustom, setCurrencyCustom] = useState(main.testState.currencyCustom);

  const [loadedCountry, setLoadedCountry] = useState(false);
  const [loadedCurrency, setLoadedCurrency] = useState(false);
  useEffect(() => {
    getCountries()
    getCurrencies()
  }, []);
  function getCountries(){
    fetch("https://api.raino.app/countries").then((res) => res.json()).then((data) => {
      setCountries(data.items)
      MainStore.changeMain({...main.testState, countries: data.items})
    })
  }
  function getCurrencies(){
    fetch("https://api.raino.app/currencies").then((res) => res.json()).then((data) => {
      setCurrencies(data.items)
      MainStore.changeMain({...main.testState, currencies: data.items})
    })
  }
  const currentAppState = useAppState()
  if(currentAppState === 'background' || currentAppState === 'inactive'){
    setDataStorage()
  }
  async function setDataStorage(){
    try {
      await AsyncStorage.setItem('data', JSON.stringify({countries, currencies, country, currency, currencyCustom}))
    } catch (e) { console.log('set e', e)}
  }
  return (
    <View style={styles.container}>
      <View style={styles.close_row}>
        <View style={styles.col_white}><View style={[styles.col_gray, { borderBottomRightRadius: 16 }]} /></View>
          <View style={styles.col_white_btn}>
            <View style={styles.col_gray_btn}>
              <Image style={styles.close_icon} source={{uri: "close_icon"}} resizeMode={"contain"} />
            </View>
          </View>
        <View style={styles.col_white}><View style={[styles.col_gray, { borderBottomLeftRadius: 16 }]} /></View>
      </View>
      <View style={styles.block}>
        <View style={styles.row_top}>
          <View style={styles.btn_picker}>
            <Picker selectedValue={country ? country._id : null}
              style={styles.btn_picker}
              onValueChange={(itemValue) => {
                if(!loadedCountry) {
                  setLoadedCountry(true)
                  setCountry(country ? country : itemValue)
                } else {
                  setCountry(itemValue)
                  if(!currencyCustom){
                    const curr_item = _.find(currencies, { _id: itemValue.preferredCurrency.id })
                    setCurrency(curr_item)
                  }
                }
              }}>
              {Array.isArray(countries) ? countries.map((item, i) => {
                return(
                  <Picker.Item key={i} label={item.translations.en} value={item._id}/>
                )
              }) : <Picker.Item label={"..."} value={"..."} />}
            </Picker>
          </View>
          <View style={{width: 36}} />
          <View style={styles.btn_picker}>
            <Picker selectedValue={currencyCustom ? currencyCustom._id : currency ? currency._id : null}
              style={styles.btn_picker}
              onValueChange={(itemValue) => {
                if(!loadedCurrency) {
                  setLoadedCurrency(true)
                  setCurrency(itemValue)
                } else {
                  setCurrencyCustom(itemValue)
                }
              }}>
              {Array.isArray(currencies) ? currencies.map((item, i) => {
                return(
                  <Picker.Item key={i} label={item.translations.en} value={item._id}/>
                )
              }) : <Picker.Item label={"..."} value={"..."} />}
            </Picker>
          </View>
        </View>
        <View style={styles.input}></View>
      </View>
      <View style={[styles.block, { borderRadius: 76 }]}>
        <View style={styles.row_bottom}>
          <ButtonIcon uri_icon={"plus_icon"} size={12} disabled={true} />
          <ButtonIcon uri_icon={"person_icon"} size={13} disabled={true} />
          <ButtonIcon uri_icon={"add_icon"} size={16} disabled={true} />
          <ButtonIcon uri_icon={"clock_icon"} size={20} disabled={true} />
          <ButtonIcon uri_icon={"mic_icon"} size={18} disabled={true} />
          <View style={styles.logo_icon}>
            <ButtonIcon uri_icon={"raino_icon"} size={40} disabled={true} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  block: {
    width: '100%',
    minHeight: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16
  },
  row_top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 100
  },
  btn_picker: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F4F8",
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn_title: {
    color: "#505B76",
    fontSize: 16,
    fontFamily: 'Inter-Medium'
  },
  btn_picker_icon: {
    width: 14,
    height: 9
  },
  row_bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo_icon: {
    marginLeft: 25
  },
  close_row: {
    flexDirection: 'row',
    width: '100%',
  },
  col_white: {
    flex: 1,
    backgroundColor: '#fff',
  },
  col_gray: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  col_white_btn: {
    width: 72,
    height: 55,
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  col_gray_btn: {
    marginTop: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F1F4F8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  close_icon: {
    width: 12,
    height: 12
  }
});

export default observer(TestScreen);
