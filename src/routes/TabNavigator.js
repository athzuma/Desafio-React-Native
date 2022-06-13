import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants';

import PostsRouter from './PostsRouter';
import AlbumsRouter from './AlbumsRouter';
import TodosRouter from './TodosRouter';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Postagens':
              iconName = focused
              ? 'newspaper-variant'
              : 'newspaper-variant-outline';
              break;
            case 'Álbuns':
              iconName = focused
              ? 'folder'
              : 'folder-outline';
              break;
            case 'TO-DOs':
              iconName = focused
              ? 'format-list-bulleted-square'
              : 'format-list-checkbox';
              break;
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Postagens" component={PostsRouter} options={{headerShown: false}}/>
      <Tab.Screen name="Álbuns" component={AlbumsRouter} options={{headerShown: false}}/>
      <Tab.Screen name="TO-DOs" component={TodosRouter} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}
