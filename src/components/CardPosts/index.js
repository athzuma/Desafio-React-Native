import React from 'react';
import { Pressable } from 'react-native';
import { Card, Title, Subheading, Paragraph } from 'react-native-paper';
import { styles } from './style';

export function CardPosts({ post, onPress }) {
  return (
    <Pressable onPress={onPress} >
      <Card style={styles.card}>
        <Card.Content>
          <Title>{post.title}</Title>
          <Subheading>@{post.username}</Subheading>
          <Paragraph>{post.body}</Paragraph>
        </Card.Content>
      </Card>
    </Pressable>
  )
};