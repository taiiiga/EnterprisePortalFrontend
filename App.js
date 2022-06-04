import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "./src/screens/SignInScreen";
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import * as SecureStore from "expo-secure-store";
import {AuthReducer} from "./src/reducers/AuthReducer";
import {apiUrl} from "./src/networking/ListOfUrl";
import axios from "axios";

export const AuthContext = React.createContext();

const Stack = createStackNavigator();

export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(AuthReducer,
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                console.log(e);
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                await axios.post(apiUrl + "Account/token", {
                    username: data.username,
                    password: data.password,
                }, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                })
                .then(response => {
                    alert("Правильный логин или пароль!");
                    const token = response.data.access_token;
                    SecureStore.setItemAsync("userToken", token);
                    dispatch({ type: 'SIGN_IN', token: token });
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response);
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        if (error.response.status === 400) alert("Неправильный логин или пароль!");
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' }),
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isLoading ? (
                        <Stack.Screen name="Загрузка" component={SplashScreen} />
                    ) : state.userToken == null ? (
                        <Stack.Screen
                            name="Авторизация"
                            component={SignInScreen}
                            options={{
                                title: 'Авторизация',
                                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                headerShown: false,
                            }}
                        />
                    ) : (
                        <Stack.Screen name="Главная" component={HomeScreen} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}