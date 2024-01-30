import { Button, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import ReceiverMessage from './RecieverMessage';
import SenderMessage from './SenderMeassage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MessageScreen = ({messages,messageHandler}) => {

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('userId');
        setUserId(user);
      } catch (error) {
        console.log('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
      behavior={Platform.OS==="android" ? "padding" :"height"}
      style={styles.mScreec}
      keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={messages}
          inverted
          style={tw`pl-4`}
          keyExtractor={item => item?.id}
          renderItem={({item:message})=>
          message.senderId === userId ?(
          <SenderMessage key={message.id} message={message} messageHandler={messageHandler}/>):
          ( <ReceiverMessage key={message.id} message={message}/>)}
        />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>    
    </>
  )
}

export default MessageScreen

const styles = StyleSheet.create({
  mScreec: {
    flex: 1,
    flexGrow: 10,
  }
})