import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './style';

export function CommentsItem({ comment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Por: {comment.name}</Text>
      <Text style={styles.email}>{comment.email}</Text>
      <Text>{comment.body}</Text>
    </View>
  );
}