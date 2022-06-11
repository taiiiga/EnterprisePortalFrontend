import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "./src/screens/SignInScreen";
import SplashScreen from "./src/screens/SplashScreen";
import * as SecureStore from "expo-secure-store";
import {AuthReducer} from "./src/reducers/AuthReducer";
import {apiUrl} from "./src/networking/ListOfUrl";
import axios from "axios";
import {recoverPassword} from "./src/services/recoverPassword";
import AdminScreen from "./src/screens/AdminScreen";
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import tw, {useDeviceContext} from "twrnc";
import LogRocket from '@logrocket/react-native';
import CalendarScreen from "./src/screens/CalendarScreen";
import 'moment';
import 'moment/locale/ru';  // language must match config
export const AuthContext = React.createContext();

const Stack = createStackNavigator();

export default function App({ navigation }) {
    useDeviceContext(tw, { withDeviceColorScheme: false });

    const [state, dispatch] = React.useReducer(AuthReducer,
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            admin: false
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
        LogRocket.init('7fecav/iuo');
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                await axios.post(apiUrl + "Account/Token", {
                    username: data.username,
                    password: data.password,
                }, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                })
                .then(response => {
                    const token = response.data.access_token;
                    const admin = response.data.admin;
                    SecureStore.setItemAsync("userToken", token);
                    dispatch({ type: 'SIGN_IN', token: token, admin: admin });
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
            recoverPassword: async (data) => recoverPassword(data.email),
        }),
        []
    );

    return (
        <TailwindProvider utilities={utilities}>
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
                            state.admin
                                ? <Stack.Screen name="Администрирование" component={AdminScreen} />
                                : <Stack.Screen name="Главная" component={CalendarScreen} />
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </TailwindProvider>
    );
}