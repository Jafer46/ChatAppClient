import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header1 from '../components/Header1'
import TabBar from '../components/TabBar'
import connection, { isUserOnline } from '../hooks/signalr'
import { getUserById } from '../hooks/signalr'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = () => {
  
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchTokenAndUserId = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('userId');
        setToken(storedToken);
        setUserId(storedUserId);
        console.log(storedToken);
        console.log(storedUserId);
      } catch (error) {
        console.log('Error retrieving token/userId from AsyncStorage:', error);
      }
    };

    fetchTokenAndUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const user = getUserById(userId);
      console.log(user);
      if (user) {
        console.log('User found');
      }
    }
  }, [userId]);

  return (
    <SafeAreaView style={styles.mainHome}>
      <Header1/>
      <TabBar/>      
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   mainHome:{
    flex:1,
    backgroundColor:'white',
},
})