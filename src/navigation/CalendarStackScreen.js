import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import CalendarScreen from "../screens/CalendarScreen";
import TaskScreen from "../screens/TaskScreen";
import {EditTaskScreen} from "../screens/EditTaskScreen";

const Stack = createStackNavigator();

export const CalendarStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Календарь">
            <Stack.Screen name="Календарь задач" component={CalendarScreen} />
            <Stack.Screen name="Задача"
                          component={TaskScreen}
                          options={{headerBackTitle: 'Назад'}}/>
            <Stack.Screen name="Редактировать задачу" component={EditTaskScreen} options={{headerBackTitle: 'Назад'}}/>
        </Stack.Navigator>
    );
};