import * as React from 'react';
import {ProfileScreen} from "../screens/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {EditProfileScreen} from "../screens/EditProfileScreen";

const Stack = createStackNavigator();

export const ProfileStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Профиль сотрудника">
            <Stack.Screen name="Профиль сотрудника" component={ProfileScreen} />
            <Stack.Screen name="Редактировать профиль" component={EditProfileScreen} options={{headerBackTitle: 'Назад'}}/>
        </Stack.Navigator>
    );
};