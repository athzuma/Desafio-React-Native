import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { CommentsSection } from '../../components/CommentsSection';
import { styles } from './style';
import Comments from '../../services/sqlite/Comments';

export function PostDetailScreen({ route }) {
  const { post } = route.params;
  const [comments, setComments] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    Comments.findByPost(post.id)
    .then(savedComments => setComments(savedComments))
    .catch(() => setHasError(true))
  }

  const dismissErrorMessage = () => setHasError(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.userLabel}>@{post.username} • {post.name}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>

      <CommentsSection comments={comments}/>
      
      <Snackbar
        visible={hasError}
        onDismiss={dismissErrorMessage}
        action={{
          label: 'Fechar',
          onPress: () => dismissErrorMessage,
        }}
      >
        Não foi possível carregar os comentários.
      </Snackbar>
    </ScrollView>
  );
}
