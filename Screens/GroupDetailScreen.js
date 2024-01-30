import { StyleSheet, 
        Text, 
        TouchableOpacity, 
        View, 
        Dimensions,
        FlatList, 
        Image,
        ImageBackground
        } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../theme/theme';
import { getGroupUsers } from '../hooks/signalr';
import GroupUserCard from '../components/GroupUserCard';

export default function GroupDetailScreen() {
  const navigator = useNavigation();
  const [users, setUsers] = useState();
  useEffect(()=>{
    const fechGroupUsers = async () => {
        const usersData = await getGroupUsers();
        setUsers(usersData);
    };
    fechGroupUsers();
  },[]);
  console.log(users)
  const renderGroup = ({ item }) => {
    
    return (
        <GroupUserCard
          user={item}
        />
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={()=>navigator.navigate("GroupChat")} style={styles.arrow}>
        <Ionicons name="arrow-back" size={32} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <ImageBackground source={{uri:"https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=900&t=st=1702005508~exp=1702006108~hmac=b438a7daeb87e21917d5c038b402c1166bbf2c38cb7b5a020e73f683e76f4f7b"} }style={styles.avatar}/>
        
      </View>
      <View style={styles.membersContainer}>
        <Text style={styles.text}>Members</Text>
      </View>
      <FlatList
        data={users}
        renderItem={renderGroup}
        keyExtractor={item => item.stringId}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator
      />
    </View>
  )
}

const styles = StyleSheet.create({
    arrow:{
        position:'absolute',
        color: 'black',
        zIndex:100,
        top: 10,
        left: 10,
    },
    imageContainer: {
        position: 'relative',
                
    },
    avatar: {
        height: Dimensions.get('screen').height *0.3,
        width: Dimensions.get('screen').width,
      },
    membersContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#7B8086',
        borderBottomWidth: 2,
        backgroundColor: 'white',
        padding: 20        
    },
    text:{
        color: '#F7F8FC',
        fontSize: 20,
    }
})