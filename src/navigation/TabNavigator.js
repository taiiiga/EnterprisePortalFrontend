import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RequestScreen} from "../screens/RequestScreen";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DepartmentScreen} from "../screens/DepartmentScreen";
import {ProfileStackScreen} from "./ProfileStackScreen";
import {CalendarStackScreen} from "./CalendarStackScreen";
import {NewsStackScreen} from "./NewsStackNavigator";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Главная"
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
            <Tab.Screen name="Календарь" component={CalendarStackScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Помощь" component={RequestScreen} />
            <Tab.Screen name="Главная" component={NewsStackScreen} options={{headerShown: false}}/>
            <Tab.Screen name="Отдел" component={DepartmentScreen} />
            <Tab.Screen name="Профиль" component={ProfileStackScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};