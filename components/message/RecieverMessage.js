import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import tw from 'twrnc';
import { COLORS } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';

const ReceiverMessage = ({message}) => {
  const date = new Date(message.dateSent);
  const hours = date.getHours();
  const min = date.getMinutes();
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.6;
  return (
    <View style={[tw` px-5 py-3 mx-3 my-2 ml-10 `,styles.textContainer,{maxWidth: containerWidth}]}>
    <Image
        style={tw`h-10 w-10 rounded-full absolute top-0 -left-10`}
        source={{uri:'https://img.freepik.com/free-photo/portrait-young-candid-man-student-boy-with-clean-face-relaxed-facial-expression-casual-smile-checked-shirt-t-shirt-summer-outfit-look-white-background_176420-45901.jpg?w=900&t=st=1704900938~exp=1704901538~hmac=e87ad01633272c2ba5311a1c8b15542c7dd7b19879f14d30cd8b137edd21b60c'}}
    />
    <Text style={styles.text}>{message.text}</Text>
    <Text style={styles.textSmall}>{hours+":"+min}</Text>
    <View style={styles.statusContainer}>
    
    </View>
    </View>
  )
}


export default ReceiverMessage

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: COLORS.secondaryBackGround,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignSelf: 'flex-start'
  },
  text: {
    flexWrap: 'wrap',
    color: COLORS.fontHeader,
    fontSize: 18,
  },
  textSmall: {
    color: COLORS.passvieIcon,
    fontSize: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  }
})