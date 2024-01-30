import React,{useState} from "react";
import { StyleSheet,  
         TouchableOpacity,        
         View, 
         Text, 
         TextInput, 
         FlatList,
         Dimensions } from "react-native";
import TrimedUserCard from "./TrimedUserCard";
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from "../theme/theme";
import { addFreind, searchUser } from "../hooks/signalr";

const DropdownForm = ({handleSubmit, toggleForm}) => {

    const handlePress = ()=>{
      handleSubmit();
      toggleForm();
    }
    return (
      <View style={styles.formContainer}>        
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress()}
        >
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
export default function ModalContentSearch ({ onClose, update }){
    const [results, setResults] = useState([]);
    const [value, setQuery] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [freindId, setFreindId] = useState("");
    const handleSearch = (value) => {      
        setQuery(value);
        const fetchSearchResults = async () => {
          const res = await searchUser(value);
          setResults(res);
        };
    
        fetchSearchResults();     
      
    };
    const toggleShowOptions = (freindId) =>{
        setFreindId(freindId);
        console.log(freindId);
        setShowOptions(!showOptions)
    }
    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
           <TrimedUserCard user={item} handleOptions={toggleShowOptions}/>
        </View>        
    );
    const handleSubmit = async () => {
        const res = await addFreind(freindId);
        if(res){
            update();
            onClose();
            return;
        }
        console.log("error occured when addin user to freind!")
    }
    return (
      <View >
         <View style={styles.searchbar}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <TextInput style={styles.input}
                   underlineColorAndroid="transparent"
                   placeholder='enter text here'
                   multiline
                   numberOfLines={2}
                   value={value}
                   onChangeText={(value) => handleSearch(value)}
        />
        </View>
        { <FlatList 
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />}
        {showOptions && <DropdownForm handleSubmit={handleSubmit} toggleForm={toggleShowOptions}/>}
      </View>
    );
  }

const styles = StyleSheet.create({
    searchbar: {
        flexDirection: "row",
        height: 80,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      input:{
        flex:1,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20,
        paddingLeft: 18,
        paddingTop: 10,
        fontSize: 18,
        backgroundColor: COLORS.secondaryBlue,
        maxHeight: 50,
      },
      cardContainer: {
        flexDirection: 'column',
        width: Dimensions.get('screen').width,
      },
      button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#9e9e9e',
        borderRadius: 5,
        marginVertical: 10,
      },
      
})