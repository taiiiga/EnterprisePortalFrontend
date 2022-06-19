import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import AdminScreen from "../screens/AdminScreen";
import RoleCreateScreen from "../screens/create/RoleCreateScreen";
import RoleEditScreen from "../screens/update/RoleEditScreen";
import RoleReadScreen from "../screens/read/RoleReadScreen";

const Stack = createStackNavigator();

export const AdminStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Админ">
            <Stack.Screen name="Список" component={AdminScreen} />
            <Stack.Screen name="Общий список" component={ListScreen} />
            <Stack.Screen name="Создание Role" component={RoleCreateScreen} />
            <Stack.Screen name="Изменение Role" component={RoleEditScreen} />
            <Stack.Screen name="Просмотр Role" component={RoleReadScreen} />
        </Stack.Navigator>
    );
};