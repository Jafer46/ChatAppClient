import { StyleSheet, Text, View , TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native'
import React, { useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import MessageScreen from '../components/message/Message';
import MessageHandlerScreen from '../components/messageHandler';
import { connection, addMessageHandler, sendMessage, setMessageAsSeen, updateMessageHandler } from '../hooks/signalr';
import EmojiSelector, { Categories } from '../components/emojis/index';
import TrimedCard from '../components/TrimedCard';
export default function GroupChatScreen() {

  const navigator = useNavigation();
  const [value, setValue] = useState("");  
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [showPaperPlane, setShowPaperPlane ] = useState(false);
  const [showMessageHandler, setShowMessageHanler ] = useState(false);
  const [currentMessage, setCurrentMessage ] = useState("");
  useEffect(() => {
    const fetchGroupMessage = async () => {
      try {
        const groupId = await AsyncStorage.getItem('groupId');
        const userId = await AsyncStorage.getItem('userId');       
        const pageNum = 1;
        const pagesize = 20;
        const  groupMessages = 
               await connection.invoke("GetGroupMessageHistry", groupId, pageNum, pagesize);
        groupMessages.forEach(async (message) => {
          if(!message.seen && userId !== message.senderId){
            message.seen = true;
            console.log(message.id);
            const id = message.id;
            const m = await setMessageAsSeen(id);
            if(!m){
              console.log("message was not updated", m);
            }
          }
        });
        setMessages(groupMessages);
        
        setPage(pageNum);
       
      } catch (error) {
        console.log('Error retrieving token/userId from AsyncStorage:', error);
      }
    };

    fetchGroupMessage();
  },[])

  useEffect(() => {
    addMessageHandler((message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });
  }, []);
  useEffect(() => {
    updateMessageHandler((message) => {
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((m) => {
          if (m.id === message.id) {
            return message;
          }
          return m;
        });
        return updatedMessages;
      });
    });
  }, [updateMessageHandler]);
  
  
  const handleNavigation = () => {
    navigator.navigate('Home');
  }
  const handleInputChange = (value) => {
    setValue(value);
    if(value === "")
    {
      setShowPaperPlane(false);
    }else{
      setShowPaperPlane(true);
    }
  }
  const handleSendMessage = async () => {    
    const m = await sendMessage(value);
    setValue("");
    setShowPaperPlane(false);
    console.log(m);
  }

  const handleEmojiSelect = (emoji) => { 
    setValue((prevValue) => prevValue + emoji);
    setShowPaperPlane(true);
    setShowPicker(false); 
  };

  const messageHandler = async (messageId) => {
    setCurrentMessage(messageId);
    setShowMessageHanler(true); 
  }
  return (
    < >
    <View style={{flexDirection:'row', backgroundColor: 'white', marginBottom:10}}>
      <TouchableOpacity onPress={handleNavigation}>
        <Ionicons name="arrow-back" size={32} color={COLORS.activeIcon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigator.navigate('GroupDetail')}>
        <TrimedCard />
      </TouchableOpacity>     
    </View>
    <View style={styles.chatContainer}>
    <MessageScreen messages={messages} messageHandler={messageHandler}/>
      <View style={styles.inputContainer}>
        <TouchableOpacity 
                onPress={() => setShowPicker(true)} 
                style={styles.pickerButton} 
        > 
          <Ionicons name="star-outline" size={24} color={COLORS.activeIcon} /> 
        </TouchableOpacity>        
        <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder='enter text here'
                   multiline
                   numberOfLines={2}
                   value={value}
                   onChangeText={(value) => handleInputChange(value)}
        />
        {showPaperPlane &&(
          <TouchableOpacity onPress={ handleSendMessage}>
          <Ionicons name="paper-plane" size={24} color={COLORS.primaryBlue} style={styles.sendIcon}/>
          </TouchableOpacity>
        )}        
        
      </View>
    </View>
    {showPicker && ( 
                <EmojiSelector 
                    onEmojiSelected={handleEmojiSelect} 
                    category={Categories.all} 
                    showTabs={true} 
                    showSearchBar={true} 
                    showHistory={true} 
                    columns={10} 
                    placeholder="Search emoji..."
                /> 
            )} 
     {showMessageHandler && <MessageHandlerScreen/>}       
    </>    
  )
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: COLORS.primaryBackGround
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    
    marginBottom: 40,
    marginHorizontal: 20,
    paddingRight: 10,
    backgroundColor: COLORS.secondaryBackGround,
    borderRadius: 20,
  },
  input:{
    flex:1,
    paddingLeft: 18,
    paddingTop: 10,
    fontSize: 18,
    color: COLORS.fontHeader,
    maxHeight: 50,
  },
  sendIcon: {
    
  }
 
})