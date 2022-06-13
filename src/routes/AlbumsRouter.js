import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AlbumsScreen } from '../modules/AlbumsScreen';
import { PhotosScreen } from '../modules/PhotosScreen';

const AlbumsStack = createNativeStackNavigator();
export default function AlbumsRouter() {
    return (
        <AlbumsStack.Navigator>
            <AlbumsStack.Screen 
                name="Posts"
                component={AlbumsScreen}
                options={{ title: 'Álbuns'}}
            />
            <AlbumsStack.Screen
                name="Photos"
                component={PhotosScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </AlbumsStack.Navigator>
    );
}