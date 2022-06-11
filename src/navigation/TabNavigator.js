import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from "../screens/CalendarScreen";
import {RequestScreen} from "../screens/RequestScreen";
import HomeScreen from "../screens/HomeScreen";
import {ProfileScreen} from "../screens/ProfileScreen";
import {DepartmentScreen} from "../screens/DepartmentScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Помощь') {
                        iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
                    } else if (route.name === 'Календарь') {
                        iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
                    } else if (route.name === 'Главная') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Отдел') {
                        iconName = focused ? 'account-group' : 'account-group-outline';
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Профиль') {
                        iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#5a67d8',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Календарь" component={CalendarScreen} />
            <Tab.Screen name="Помощь" component={RequestScreen} />
            <Tab.Screen name="Главная" component={HomeScreen} />
            <Tab.Screen name="Отдел" component={DepartmentScreen} />
            <Tab.Screen name="Профиль" component={ProfileScreen} />
        </Tab.Navigator>
    );
};