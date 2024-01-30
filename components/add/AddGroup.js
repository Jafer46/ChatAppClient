import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddGroup = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-add" size={32} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddGroup;