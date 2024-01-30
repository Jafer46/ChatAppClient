import React from 'react';
import { View, StyleSheet, FlatList, ScrollView} from 'react-native';
import Card from './Card';

const CardList = ({data}) => { 
 
  const renderGroup = ({ item }) => {
    
    return (
        <Card
          id={item.id}
          name={item.title}
          image={item.avatar}
          description={item.createdAt}
        />
    );
  };
  return (
      <FlatList
        data={data}
        renderItem={renderGroup}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator
      />
      
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    height: 100,
  },
  listContainer: {
    borderWidth: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardList;