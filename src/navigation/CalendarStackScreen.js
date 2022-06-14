import * as React from 'react';
import {ProfileScreen} from "../screens/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {EditProfileScreen} from "../screens/EditProfileScreen";
import CalendarScreen from "../screens/CalendarScreen";
import TaskScreen from "../screens/TaskScreen";
import header from "react-native/Libraries/NewAppScreen/components/Header";
import {Button} from "react-native";
import { HeaderBackButton } from '@react-navigation/stack'
import {EditTaskScreen} from "../screens/EditTaskScreen";

const Stack = createStackNavigator();

export const CalendarStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Календарь">
            <Stack.Screen name="Календарь задач" component={CalendarScreen} />
            <Stack.Screen name="Задача"
                          component={TaskScreen}
                          options={{headerBackTitle: 'Назад'}}/>
            <Stack.Screen name="Редактировать профиль" component={EditTaskScreen} options={{headerBackTitle: 'Назад'}}/>
        </Stack.Navigator>
    );
};