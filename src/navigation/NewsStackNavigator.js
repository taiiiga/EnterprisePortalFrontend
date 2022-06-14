import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import NewsScreen from "../screens/NewsScreen";

const Stack = createStackNavigator();

export const NewsStackScreen = () => {
    return (
        <Stack.Navigator initialRouteName="Новости">
            <Stack.Screen name="Новости" component={HomeScreen} />
            <Stack.Screen name="Новость"
                          component={NewsScreen}
                          options={{headerBackTitle: 'Назад'}}/>
        </Stack.Navigator>
    );
};