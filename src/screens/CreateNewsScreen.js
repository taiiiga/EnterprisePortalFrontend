import {Button, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import {t} from "react-native-tailwindcss";

export default function NewsScreen({ route, navigation }) {
    const { item } = route.params;
    const [header, setHeader] = React.useState('');
    const [text, setText] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [date, setDate] = React.useState('');

    const saveNews = async () => {
        const login = await SecureStore.getItemAsync("login");
        const da = {
            "id": 0,
            "login": login,
            "avatar": "string",
            "fullName": "string",
        }
        await axios.post(apiUrl + "Account/Update", da, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                navigation.goBack();
            })
            .catch(function (error) {
                alert(error.response.data);
                alert(error.response.status);
                alert(error.response.headers);
                alert(error.message);
                catchError(error);
            });
    };

    return (
        <ScrollView style={tw`w-full h-full p-5`}>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>{item.header}</Text>
            </View>
            <View style={tw`bg-slate-500 p-5`}>
                <Text style={tw`text-white text-center`}>{item.text}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>Новость #{JSON.stringify(item.id)}, Автор: {item.author}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5 border`}>
                <Text style={tw`text-white text-center`}>Дата: {item.date}</Text>
            </View>
            <Pressable style={tw`h-10 rounded bg-slate-800 items-center flex justify-center mx-5`} onPress={sendRequest}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setButtonStyle(style.button)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Отправить</Text>
            </Pressable>
        </ScrollView>
    );
}

const style = {
    button: tw`h-10 rounded bg-slate-800 items-center flex justify-center mx-5`,
    buttonPressIn: tw`h-10 rounded bg-emerald-400 items-center flex justify-center mx-5`
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 13,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
