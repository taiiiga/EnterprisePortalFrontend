import {TextInput, View, Text, Button, Pressable} from "react-native";
import React from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";
import tw, {useAppColorScheme} from "twrnc";
import {recoverPassword} from "../services/recoverPassword";
import { AsyncStorage } from 'react-native';

export default function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);

    const [buttonStyle, setButtonStyle] = React.useState(style.button);

    return (
        <View style={tw`bg-white dark:bg-gray-900 flex justify-center h-screen p-4`}>
            <View style={tw`items-center text-center`}>
                <Text style={tw`text-4xl font-bold dark:text-white text-center`}>
                    Корпоративный портал
                </Text>
            </View>
            <TextInput
                style={tw`w-full py-2 items-center, rounded mt-6 border dark:text-white p-2 text-xl dark:border-white`}
                placeholder="Ваш логин"
                value={username}
                placeholderTextColor="gray"

                onChangeText={setUsername}
            />
            <TextInput
                style={tw`w-full py-2 items-center, rounded mt-6 border dark:text-white p-2 text-xl dark:border-white`}
                placeholder="Ваш пароль"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="gray"
                secureTextEntry
            />
            <Pressable style={buttonStyle}
                       onPress={() => signIn({ username, password })}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setButtonStyle(style.buttonPressOut)}
                       >
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]} autoFocus={true}>Войти</Text>
            </Pressable>
            <Text style={tw`underline mt-6 dark:text-white text-center`} onPress={() => recoverPassword({ email })}>Восстановить пароль</Text>
        </View>
    );
}

const style = {
    button: [t.bgIndigo600, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6],
    buttonPressIn: [t.bgIndigo400, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6],
    buttonPressOut: [t.bgIndigo500, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6]
}