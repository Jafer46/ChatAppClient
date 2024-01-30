import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connection, getGroupById } from '../hooks/signalr'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../theme/theme'
import {Ionicons} from "@expo/vector-icons"
import { isUserFreind } from '../hooks/signalr'


export default function TrimedUserCard({user, handleOptions}) {
  const userId = user.id;
  const [isFreind, setIsUserFreind] = useState(false);
  useEffect(()=>{
    const checkUserFreind = async () => {
      const res = await isUserFreind(userId);
      console.log(res)
      setIsUserFreind(res);
    };

    checkUserFreind();
  },[])
    
  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatarContainer}>      
      </View>
      <View style={styles.contentContainer}>
          <Text style={styles.title}>{user.userName}</Text>
      </View>
      <TouchableOpacity style={styles.options} onPress={()=>handleOptions(userId)}>
          {true && <Ionicons name='options' size={24} color={COLORS.passvieIcon}/>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#ffff'
      },
      avatarContainer: {
        position: 'relative',
        marginRight: 12,
      },
      avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
      },
      statusIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primaryGreen,
        borderColor: 'white',
        borderWidth:3,
       
      },
      contentContainer: {
        flex: 1,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: COLORS.fontHeader
      },
      options: {
        alignSelf: 'flex-end',
      }
})