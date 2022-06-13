import React from 'react';
import { Pressable } from 'react-native';
import { List } from 'react-native-paper';
import { colors } from '../../constants';

export function TodoItem({ todo, onPress }) {
  return (
    <Pressable onPress={onPress} >
      <List.Item
        title={
          todo.title.charAt(0).toUpperCase() +
          todo.title.slice(1)
        }
        left={props => (
          <List.Icon
            {...props}
            color={todo.completed === 1 ? colors.primary : "gray"}
            icon={todo.completed === 1 ? "check-circle" : "check-circle-outline"}
          />
        )}
      />
    </Pressable>
  )
};
