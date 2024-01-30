import { Image, StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from  'react'
import tw from 'twrnc';
import { COLORS } from '../../theme/theme';
import {Ionicons} from '@expo/vector-icons'
const SenderMessage = ({message,messageHandler}) => {
  const [messageId, setMessageId ] = useState("");
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.7;
  useEffect(()=>{
    const id = message.id;
    setMessageId(id);
  },[])
  return (
    <TouchableOpacity onPress={() => messageHandler(messageId)}>
      <View style={[tw` px-5 py-3 mx-3 my-2 ml-14`,styles.textContainer, {maxWidth: containerWidth}]}>
      <Text style={styles.text}>{message.text}</Text>
      <View style={styles.statusContainer}>
      {(!message.seen && <Ionicons name='checkmark' size={16} color={'black'}/>) ||
      message.seen && <Ionicons name='checkmark-done' size={16} color={'black'}/>}
      </View>   
      </View>
    </TouchableOpacity>
    
  )
}

export default SenderMessage

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: COLORS.primaryBlue,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'flex-end'
  },
  text: {
    flexWrap: 'wrap',
    color: 'white',
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  }
})