import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {DepartmentScreen} from "../screens/DepartmentScreen";
import {DepartmentsScreen} from "../screens/DepartmentsScreen";
import TaskScreen from "../screens/TaskScreen";
import {ProjectScreen} from "../screens/ProjectScreen";
import {EmployeeScreen} from "../screens/EmployeeScreen";

const Stack = createStackNavigator();

export const DepartmentStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Отделы">
            <Stack.Screen name="Отделы" component={DepartmentsScreen} />
            <Stack.Screen name="Отдел" component={DepartmentScreen} options={{headerBackTitle: 'Назад'}}/>
            <Stack.Screen name="Проект" component={ProjectScreen} options={{headerBackTitle: 'Назад'}}/>
            <Stack.Screen name="Задача" component={TaskScreen} options={{headerBackTitle: 'Назад'}}/>
            <Stack.Screen name="Сотрудник" component={EmployeeScreen} options={{headerBackTitle: 'Назад'}}/>
        </Stack.Navigator>
    );
};