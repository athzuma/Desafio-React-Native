import React from 'react';
import { Pressable } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { styles } from './style';

export function CardPhotos({ photo }) {
  return (
    <Pressable style={styles.card}>
      <Card>
        <Card.Cover source={{ uri: photo.thumbnailUrl }} />
        <Card.Content>
          <Paragraph style={styles.title}>{photo.title}</Paragraph>
        </Card.Content>
      </Card>
    </Pressable>
  )
};