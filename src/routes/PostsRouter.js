import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PostsScreen } from '../modules/PostsScreen';
import { PostDetailScreen } from '../modules/PostDetailScreen';

const PostsStack = createNativeStackNavigator();
export default function PostsRouter() {
    return (
        <PostsStack.Navigator>
            <PostsStack.Screen 
                name="Posts"
                component={PostsScreen}
                options={{ title: 'Postagens'}}
            />
            <PostsStack.Screen
                name="PostDetails"
                component={PostDetailScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </PostsStack.Navigator>
    );
}