import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native'

function ButtonIcon(props) {
  const { uri_icon, disabled, fullIcon, onPress, size } = props
  const _styleBtn = {backgroundColor: fullIcon ? null : "#E7F8FA"}
  const _size = {width: size, height: size}
  return (
    <TouchableOpacity style={[styles.btn, _styleBtn]} onPress={() => onPress()} disabled={disabled}>
      <Image style={[styles.btn_icon, _size]} source={{uri: uri_icon}} resizeMode={"contain"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_icon: {

  }
});

export default ButtonIcon;
