import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { CardPhotos } from '../../components/CardPhotos';
import { StatusIndicator } from '../../components/StatusIndicator';

import Photos from '../../services/sqlite/Photos';

export function PhotosScreen({ route }) {
  const { albumId } = route.params;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPhotos(albumId);
  }, []);

  function getPhotos(albumId) {
    Photos.findByAlbum(albumId)
    .then(savedPhotos => {
      setPhotos(savedPhotos);
      setLoading(false);
    })
  }

  return (
    <View>
      {photos.length === 0 &&
        <StatusIndicator message="Não há fotos." loading={loading} />
      }
      <FlatList
        data={photos}
        renderItem={({item}) => (
          <CardPhotos photo={item} />
        )}
        keyExtractor={item => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
      />
    </View>
  );
}
