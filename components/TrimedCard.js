import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connection, getGroupById } from '../hooks/signalr'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../theme/theme'

export default function TrimedCard() {
    
    const [group, setGroup] = useState({});
    useEffect(() => {
        const fetchGroup = async () => {
            const groupData = await getGroupById()            
            setGroup(groupData);            
        };
        fetchGroup();
    }, []);
    
    
  return (
    <View style={styles.cardContainer}>
    <View style={styles.avatarContainer}>
      
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{group.title}</Text>
    </View>
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
})