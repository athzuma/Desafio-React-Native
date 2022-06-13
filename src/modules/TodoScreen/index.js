import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TodoItem } from '../../components/TudoItem';
import { StatusIndicator } from '../../components/StatusIndicator';
import { styles } from './style';

import Todos from '../../services/sqlite/Todos';

export function TodosScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    Todos.all()
    .then(savedTodos => {
      setTodos(savedTodos);
      setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      {todos.length === 0 &&
        <StatusIndicator message="Não há To-Dos." loading={loading} />
      }
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <TodoItem todo={item} onPress={() => {}}/>
        )}
        keyExtractor={item => `${item.id}`}
      />
    </View>
  );
}
