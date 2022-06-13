import React from 'react';
import { Pressable } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

const AlbumAvatar = props => <Avatar.Icon {...props} icon="folder-image" />

export function CardAlbums({ album, onPress }) {
  return (
    <Pressable onPress={onPress} >
      <Card>
        <Card.Title
          title={album.title}
          subtitle={`@${album.username} • ${album.name}`}
          left={AlbumAvatar}
        />
      </Card>
    </Pressable>
  )
};