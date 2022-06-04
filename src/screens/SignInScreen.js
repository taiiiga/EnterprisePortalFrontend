import {TextInput, View, Text} from "react-native";
import { StyleSheet } from 'react-native';
import React from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";

export default function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);

    return (
        <View style={[t.hFull, t.itemsCenter, t.p8, t.pT40]}>
            <Text style={[t.fontBold, t.text4xl]}>
                Авторизация
            </Text>
            <TextInput
                style={[t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6, t.border, t.textIndigo600, t.p2, t.textXl]}
                placeholder="Ваш логин"
                value={username}
                placeholderTextColor="gray"

                onChangeText={setUsername}
            />
            <TextInput
                style={[t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6, t.border, t.textIndigo600, t.p2, t.textXl]}
                placeholder="Ваш пароль"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="gray"
                secureTextEntry
            />
            <View style={[t.bgIndigo600, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6]}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}
                      onPress={() => signIn({ username, password })}>
                    Войти
                </Text>
            </View>
        </View>
    );
}