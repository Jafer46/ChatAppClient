import React from 'react';
import { View, StyleSheet, FlatList} from 'react-native';

import UserCard from './UserCard';

const UserCardList = ({data}) => { 

  const renderUser = ({ item }) => (
    <UserCard
      id = {item.id}
      name={item.userName}
      image={item.avatarUrl}
      isOnline={item.isOnline}
    />
  );
  return (
    <>
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderUser}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default UserCardList;