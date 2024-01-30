import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View ,Dimensions} from 'react-native'
import React, { useState,useEffect } from 'react'

import { createGroup, getUserGroup } from '../hooks/signalr'
import CardList from './CardList'
import { connection } from '../hooks/signalr'
import AddGroup from './add/AddGroup'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/theme';


const DropdownForm = ({handleSubmit, toggleForm}) => {
  const [value, setValue] = useState("");  
  
  const handleInputChange = (value)=>{
    setValue(value);
    
   }
  const handlePress = (value)=>{
    handleSubmit(value);
    toggleForm();
  }
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your group name"
        onChangeText={(value) => handleInputChange(value)}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(value)}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}

const Group = () => {
  const [showForm, setShowForm] = useState(false);
  const [groups, setGroup] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  }
  const handleSubmit = async (value) => {
    const group = await createGroup(value)
    setGroup([...groups,group]);
    console.log("successfully created")
  }

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        
        const userGroups = await connection.invoke("GetUsergroups");
        setGroup(userGroups);
      } catch (error) {
        console.log('Error retrieving token/userId from AsyncStorage:', error);
      }
    };

    fetchUserGroups();
  }, []);
  connection.on("RecieveMessage", (message)=>{console.log(message)});
  console.log(groups);
  return (
    <>
      <CardList data={groups}/>     
      
      <View style={styles.container}>      
      <TouchableOpacity
        style={styles.buttons}
        onPress={toggleForm}
      >
        <Ionicons name="ios-add" size={32} color="white" />
      </TouchableOpacity>
    </View>
    {showForm && <DropdownForm handleSubmit={handleSubmit} toggleForm={toggleForm}/>}
    </>
  )
}

export default Group

const styles = StyleSheet.create({
  container: {
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#9e9e9e',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    padding: 20,
    borderRadius: 5,
    borderTopColor: '#0000',
    borderTopWidth: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
})