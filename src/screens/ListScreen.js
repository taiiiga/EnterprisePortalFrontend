import {Pressable, ScrollView, Text, View} from "react-native";
import React, {useEffect} from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";
import tw  from 'twrnc';
import { ImageBackground, StyleSheet} from "react-native";
import * as SecureStore from "expo-secure-store";
import LogRocket from "@logrocket/react-native";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";


export default function ListScreen({navigation}, model) {

    const { signOut } = React.useContext(AuthContext);

    const [list, setList] = React.useState([]);
    const [deleteStyle, setDeleteStyle] = React.useState(style.delete);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [elementStyle, setElementStyle] = React.useState(style.element);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "Role"+"/List", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then(response => {
                    setList(response.data);
                })
                .catch(function (error) {
                    catchError(error);
                });
        };
        bootstrapAsync();
    }, []);

    const create = () => {

    };
    const read = () => {};
    const update = () => {};
    const remove = () => {};

    return (
        <ScrollView>
            {list.map((item) => { return (
                <View style={style.elements}>
                    <Pressable style={elementStyle} onPress={read}
                               onPressIn={() => setElementStyle(style.buttonPressIn)}
                               onPressOut={() => setElementStyle(style.element)}>
                        <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>{item.id}</Text>
                    </Pressable>
                    <Pressable style={deleteStyle} onPress={remove}
                               onPressIn={() => setDeleteStyle(style.deletePressIn)}
                               onPressOut={() => setDeleteStyle(style.delete)}>
                        <ImageBackground source={{ uri: "https://freesvg.org/img/close-button.png" }}
                                         resizeMode="contain"
                                         style={tw`justify-center w-14 h-14 shadow-xl border-2`}>
                        </ImageBackground>
                    </Pressable>
                </View>
            );
            })}
            <Pressable style={buttonStyle} onPress={create}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setButtonStyle(style.button)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Добавить</Text>
            </Pressable>
        </ScrollView>
    );
}

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-emerald-400 items-center flex justify-center mt-5`,
    delete: tw`w-14 h-30 rounded bg-slate-800 items-center flex-initial mt-5`,
    deletePressIn: tw`w-14 h-30 rounded bg-emerald-400 items-center flex-initial mt-5`,
    element: tw`bg-indigo-500 h-50`,
    elements: tw`flex items-baseline`,
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});