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
import TaskTypeReadScreen from "../screens/read/TaskTypeReadScreen";
import NewsTypeReadScreen from "../screens/read/NewsTypeReadScreen";
import RequestReadScreen from "../screens/read/RequestReadScreen";
import ProblemReadScreen from "../screens/read/ProblemReadScreen";
import TypesOfWorkReadScreen from "../screens/read/TypesOfWorkReadScreen";
import PositionReadScreen from "../screens/read/PositionReadScreen";
import TaskTypeCreateScreen from "../screens/create/TaskTypeCreateScreen";
import TaskTypeEditScreen from "../screens/update/TaskTypeEditScreen";
import NewsTypeCreateScreen from "../screens/create/NewsTypeCreateScreen";
import NewsTypeEditScreen from "../screens/update/NewsTypeEditScreen";
import RequestCreateScreen from "../screens/create/RequestCreateScreen";
import RequestEditScreen from "../screens/update/RequestEditScreen";
import ProblemCreateScreen from "../screens/create/ProblemCreateScreen";
import ProblemEditScreen from "../screens/update/ProblemEditScreen";
import PositionCreateScreen from "../screens/create/PositionCreateScreen";
import PositionEditScreen from "../screens/update/PositionEditScreen";
import TypesOfWorkCreateScreen from "../screens/create/TypesOfWorkCreateScreen";
import TypesOfWorkEditScreen from "../screens/update/TypesOfWorkEditScreen";

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
            <Stack.Screen name="Создание TaskType" component={TaskTypeCreateScreen} />
            <Stack.Screen name="Изменение TaskType" component={TaskTypeEditScreen} />
            <Stack.Screen name="Просмотр TaskType" component={TaskTypeReadScreen} />
            <Stack.Screen name="Создание NewsType" component={NewsTypeCreateScreen} />
            <Stack.Screen name="Изменение NewsType" component={NewsTypeEditScreen} />
            <Stack.Screen name="Просмотр NewsType" component={NewsTypeReadScreen} />
            <Stack.Screen name="Создание Request" component={RequestCreateScreen} />
            <Stack.Screen name="Изменение Request" component={RequestEditScreen} />
            <Stack.Screen name="Просмотр Request" component={RequestReadScreen} />
            <Stack.Screen name="Создание Problem" component={ProblemCreateScreen} />
            <Stack.Screen name="Изменение Problem" component={ProblemEditScreen} />
            <Stack.Screen name="Просмотр Problem" component={ProblemReadScreen} />
            <Stack.Screen name="Создание Position" component={PositionCreateScreen} />
            <Stack.Screen name="Изменение Position" component={PositionEditScreen} />
            <Stack.Screen name="Просмотр Position" component={PositionReadScreen} />
            <Stack.Screen name="Создание TypesOfWork" component={TypesOfWorkCreateScreen} />
            <Stack.Screen name="Изменение TypesOfWork" component={TypesOfWorkEditScreen} />
            <Stack.Screen name="Просмотр TypesOfWork" component={TypesOfWorkReadScreen} />
        </Stack.Navigator>
    );
};