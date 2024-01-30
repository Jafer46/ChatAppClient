import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import React from 'react'
import { COLORS } from '../theme/theme';

export default function MessageHandlerScreen() {
  return (
    <View>
      <TouchableOpacity>
        <Ionicons name='' size={24} color={'black'}/>
        <Text>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
      <TouchableOpacity></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    height: 40,
    backgroundColor: COLORS.secondaryBackGround,
  }
})