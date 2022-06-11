import {Pressable, ScrollView, Text, View} from "react-native";
import React, {useEffect} from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";
import tw  from 'twrnc';
import { ImageBackground, StyleSheet, FlatList } from "react-native";
import * as SecureStore from "expo-secure-store";
import LogRocket from "@logrocket/react-native";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";


export default function ListScreen({navigation}, model) {

    const { signOut } = React.useContext(AuthContext);

    const [list, setList] = React.useState([]);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const Item = ({item}) => (<View style={style.elements}>
        <Pressable style={tw`flex-1 bg-indigo-500 h-12 w-12 items-center justify-center`} onPress={read}
                   onPressIn={() => current.setNativeProps({style:tw`flex-1 bg-slate-800 h-12 w-12 items-center justify-center`})}
                   onPressOut={() => current.setNativeProps({style:tw`flex-1 bg-indigo-500 h-12 w-12 items-center justify-center`})}>
            <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>{item.id}</Text>
        </Pressable>
        <Pressable style={tw`w-12 h-12 bg-indigo-500 items-center flex-initial justify-center`} onPress={remove}
                   onPressIn={() => setDeleteStyle(tw`w-12 h-12 bg-slate-800 items-center flex-initial justify-center`)}
                   onPressOut={() => setDeleteStyle(tw`w-12 h-12 bg-indigo-500 items-center flex-initial justify-center`)}>
            <ImageBackground source={{ uri: "https://static.wikia.nocookie.net/baldi-fanon/images/7/7a/B889B0A9-4717-4D37-9ADD-AB7B5E11FAEF.png/revision/latest?cb=20190226222946" }}
                             resizeMode="contain"
                             style={tw`justify-center w-full h-full`}>
            </ImageBackground>
        </Pressable>
    </View>);

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
            <FlatList data={list} renderItem={Item}/>
            <Pressable style={buttonStyle} onPress={create}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setButtonStyle(style.button)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Добавить</Text>
            </Pressable>

        </ScrollView>
    );
}

const style = {
    button: tw`w-full h-12 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-12 rounded bg-emerald-400 items-center flex justify-center mt-5`,
    elements: tw`flex flex-nowrap flex-row mt-5`,
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});