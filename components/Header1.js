import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../theme/theme";
import { useState, useEffect } from "react";
import { searchUser } from "../hooks/signalr";


const Header1 = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  
  
  return (
    <View style={styles.mainHeader}>
      <View style={styles.firstHeader}>
        <Text style={styles.logotxt}>Chatting</Text>        
      </View>
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={false}
        onRequestClose={toggleModal}
      >
        
      </Modal>
      
    </View>
  );
};



export default Header1;

const styles = StyleSheet.create({
  firstHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 40,
    height: Dimensions.get('screen').height *0.16,
    backgroundColor: "white",
  },
  userInfo: {
    marginRight: 10,
  },
  search: {
    marginLeft: 10,
    flex:1,
    alignSelf: 'flex-end'
  },
  logotxt: {
    color: "#2B3558",
    fontSize: 33,
    fontWeight: "bold",
    alignSelf: 'flex-start'
  },
  modalContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  modalButton: {
    display: "flex",
    justifyContent: "center",
    position: "fixed",
    bottom: 1,
    padding: 20,
  },
  modalText: {
    marginBottom: 20,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    padding: 20,
    marginBottom: 20,
  },
  profileMain: {
    backgroundColor: "#9e9e9e",
    width: "100%",
    display: "flex",
    padding: 20,
    justifyContent: "center",
  },

  profileText: {
    color: "white",
    fontSize: 18,
    fontWeight: 900,
  },
  subpart: {
    display: "flex",
    paddingVertical: 10,
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
    outline: 'none',
  },
});

// function ModalContent({ onClose }) {
//   return (
//     <View style={styles.modalContentContainer}>
//       <View style={styles.profileMain}>
//         <TouchableOpacity>
//           <Image
//             style={styles.profile}
//             source={{
//               uri: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=900&t=st=1704492776~exp=1704493376~hmac=07b3e498beb9e9847b3b303b6e733c203d78452df5b512c24b50a412aaabdab7",
//             }}
//           />
//         </TouchableOpacity>
//         <Text style={styles.profileText}>Mrs. Gelila</Text>
//         <Text style={{ color: "#ddd" }}>gelila@gmail.com</Text>
//       </View>
//       <View style={styles.subpart}>
//         <TouchableOpacity
//           style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
//         >
//           <Ionicons name="ios-person-add" size={24} color="black" />
//           <Text style={{ marginLeft: 5 }}>New Friend</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
//         >
//           <MaterialIcons name="group" size={24} color="black" />
//           <Text style={{ marginLeft: 5 }}>New Group</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{ flexDirection: "row", alignItems: "center", padding: 20 }}
//         >
//           <Ionicons name="ios-settings-sharp" size={24} color="black" />
//           <Text style={{ marginLeft: 5 }}>Settings</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
//         >
//           <AntDesign name="questioncircle" size={24} color="black" />
//           <Text>Chatting Features</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.modalButton} onPress={onClose}>
//         <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
//       </TouchableOpacity>
//     </View>
//   );
// }