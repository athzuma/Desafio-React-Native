import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { StatusIndicator } from '../../components/StatusIndicator';
import { CardAlbums } from '../../components/CardAlbums';
import { styles } from './style';

import Albums from '../../services/sqlite/Albums';

export function AlbumsScreen({ navigation }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbums();
  }, []);

  function getAlbums() {
    Albums.allWithUsers()
    .then(savedAlbums => {
      setAlbums(savedAlbums);
      setLoading(false);
    })
  }

  function goToDetails(album) {
    navigation.navigate('Photos', {
      title: album.title,
      albumId: album.id
    });
  }

  return (
    <View style={styles.container}>
      {albums.length === 0 &&
        <StatusIndicator message="Não há álbuns." loading={loading}/>
      }
      <FlatList
        data={albums}
        renderItem={({item}) => (
          <CardAlbums album={item} onPress={() => goToDetails(item)}/>
        )}
        keyExtractor={item => `${item.id}`}
      /> 
    </View>
  );
}
