import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ListScreen from "../screens/ListScreen";
import AdminScreen from "../screens/AdminScreen";
import RoleCreateScreen from "../screens/create/RoleCreateScreen";
import RoleEditScreen from "../screens/update/RoleEditScreen";
import RoleReadScreen from "../screens/read/RoleReadScreen";
import EmployeeCreateScreen from "../screens/create/EmployeeCreateScreen";
import EmployeeEditScreen from "../screens/update/EmployeeEditScreen";
import EmployeeReadScreen from "../screens/read/EmployeeReadScreen";
import DepartmentCreateScreen from "../screens/create/DepartmentCreateScreen";
import DepartmentEditScreen from "../screens/update/DepartmentEditScreen";
import DepartmentReadScreen from "../screens/read/DepartmentReadScreen";
import ProjectCreateScreen from "../screens/create/ProjectCreateScreen";
import ProjectEditScreen from "../screens/update/ProjectEditScreen";
import ProjectReadScreen from "../screens/read/ProjectReadScreen";
import TaskCreateScreen from "../screens/create/TaskCreateScreen";
import TaskEditScreen from "../screens/update/TaskEditScreen";
import TaskReadScreen from "../screens/read/TaskReadScreen";

const Stack = createStackNavigator();

export const AdminStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Админ">
            <Stack.Screen name="Список" component={AdminScreen} />
            <Stack.Screen name="Общий список" component={ListScreen} />
            <Stack.Screen name="Создание Role" component={RoleCreateScreen} />
            <Stack.Screen name="Изменение Role" component={RoleEditScreen} />
            <Stack.Screen name="Просмотр Role" component={RoleReadScreen} />
            <Stack.Screen name="Создание Account" component={EmployeeCreateScreen} />
            <Stack.Screen name="Изменение Account" component={EmployeeEditScreen} />
            <Stack.Screen name="Просмотр Account" component={EmployeeReadScreen} />
            <Stack.Screen name="Создание Department" component={DepartmentCreateScreen} />
            <Stack.Screen name="Изменение Department" component={DepartmentEditScreen} />
            <Stack.Screen name="Просмотр Department" component={DepartmentReadScreen} />
            <Stack.Screen name="Создание Project" component={ProjectCreateScreen} />
            <Stack.Screen name="Изменение Project" component={ProjectEditScreen} />
            <Stack.Screen name="Просмотр Project" component={ProjectReadScreen} />
            <Stack.Screen name="Создание Task" component={TaskCreateScreen} />
            <Stack.Screen name="Изменение Task" component={TaskEditScreen} />
            <Stack.Screen name="Просмотр Task" component={TaskReadScreen} />
        </Stack.Navigator>
    );
};