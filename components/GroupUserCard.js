import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connection, getGroupById } from '../hooks/signalr'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../theme/theme'

export default function GroupUserCard({user}) {
    console.log(user)
  return (
    <View style={styles.cardContainer}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{uri:'https://img.freepik.com/free-photo/portrait-young-candid-man-student-boy-with-clean-face-relaxed-facial-expression-casual-smile-checked-shirt-t-shirt-summer-outfit-look-white-background_176420-45901.jpg?w=900&t=st=1704900938~exp=1704901538~hmac=e87ad01633272c2ba5311a1c8b15542c7dd7b19879f14d30cd8b137edd21b60c'}} style={styles.avatar} />
        {user.isOnline && <View style={styles.statusIndicator} />}
      </View>
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{user.userName}</Text>
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