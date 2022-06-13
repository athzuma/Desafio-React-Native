import React, { useEffect, useState } from 'react';
import { FlatList, View, StatusBar } from 'react-native';
import { CardPosts } from '../../components/CardPosts';
import { StatusIndicator } from '../../components/StatusIndicator';
import { styles } from './style';

import Posts from '../../services/sqlite/Posts';

export function PostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  function getPosts() {
    Posts.allWithUsers()
    .then(posts => {
      setPosts(posts);
      setLoading(false);
    })
  }

  function goToDetails(post) {
    navigation.navigate('PostDetails', {
      post: post,
      title: post.title
    });
  }

  return (
    <View style={styles.container}>
      {posts.length === 0 &&
        <StatusIndicator message="Não há postagens" loading={loading} />
      }
      
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <CardPosts post={item} onPress={() => goToDetails(item)}/>
        )}
        keyExtractor={item => `${item.id}`}
      />
      <StatusBar style="dark"/>  
    </View>
  );
}
