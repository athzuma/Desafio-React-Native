import React from 'react';
import { View } from 'react-native';
import { Subheading, Divider, Text } from 'react-native-paper';
import { styles } from './style';
import { CommentsItem } from '../CommentsItem';

export function CommentsSection({ comments }) {
  return (
    <View>
      <Subheading style={styles.commentsTitle}>Comentários</Subheading>
      <Divider style={styles.divider}/>
      {comments.length === 0 &&
        <Text style={styles.label}>Nenhum comentário.</Text>
      }
      {comments.map((comment, index) => {
        return (
          <CommentsItem key={index} comment={comment} />
        )
      })}
    </View>
  );
}