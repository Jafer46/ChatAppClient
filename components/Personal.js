import { SafeAreaView, 
         StyleSheet, 
         Text, 
         View, 
         TouchableOpacity,
         Modal, } from 'react-native'
import React,{useState, useEffect} from 'react'
import { connection, getUserFreindes } from '../hooks/signalr'
import {Ionicons} from '@expo/vector-icons'
import { COLORS } from '../theme/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalContentSearch from "./UserSearch"
import TrimedUserCard from "./TrimedUserCard"
import UserCardList from './UserCardList'
import CardList from './CardList'

const Personal = () => {
  const [freinds, setFreinds] = useState([]);
  const [isModalVisibleSearch, setModalVisibleSearch] = useState(false);

  useEffect(() => {
    const fetchUserFreinds = async() => {
      const userData = await getUserFreindes();
      setFreinds(userData);
    }
    fetchUserFreinds();
  },[])

  const toggleModalSearch = () => {
    setModalVisibleSearch(!isModalVisibleSearch);
  };
  const updateUserFreinds = () =>{
    const fetchUserFreinds = async() => {
      const userData = await getUserFreindes();
      setFreinds(userData);
      toggleModalSearch();
    }
    fetchUserFreinds();
  };

  return (
    <>
     <UserCardList data={freinds} />
     <View style={styles.searchContainer}>
      
      <TouchableOpacity
        style={styles.buttons}
        onPress={toggleModalSearch}
      >
        <Ionicons name="search" size={32} color="white" />
        </TouchableOpacity>
      
       <Modal
        visible={isModalVisibleSearch}
        animationType="fade"
        transparent={false}
        onRequestClose={toggleModalSearch}
        >
        <View style={styles.modalContent}>
          <ModalContentSearch onClose={toggleModalSearch} update={updateUserFreinds}/>
        </View>
      </Modal>
    </View>
    
    
    </>
  )
}

export default Personal

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons:{
    backgroundColor:"ffffff",
    borderColor:"#9e9e9e",
    justifyContent:'center',
  },
})