import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodosScreen } from '../modules/TodoScreen';

const TodosStack = createNativeStackNavigator();
export default function TodosRouter() {
    return (
        <TodosStack.Navigator>
            <TodosStack.Screen 
                name="Todos"
                component={TodosScreen}
                options={{ title: 'To-Dos'}}
            />
        </TodosStack.Navigator>
    );
}