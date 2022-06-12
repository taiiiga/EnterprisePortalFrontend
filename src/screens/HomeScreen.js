import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";
import tw  from 'twrnc';
import {catchError} from "../constans";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";

export default function HomeScreen() {
    const [news, setNews] = React.useState([]);
    const [roleButtonStyle, setRoleButtonStyle] = React.useState(style.button);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "News/List", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then(response => {
                setNews(response.data);
            })
            .catch(function (error) {
                catchError(error);
            });
        };

        bootstrapAsync();
    }, []);

    return (
        <ScrollView style={tw`bg-white dark:bg-gray-900`}>
            <View style={tw`w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-row flex-wrap`}>
                {news.map((item) =>
                    <Pressable style={style.button}
                               onPress={roleButtonStyle}
                               onPressIn={() => setRoleButtonStyle(style.buttonPressIn)}
                               onPressOut={() => setRoleButtonStyle(style.button)}>
                        <ImageBackground source={{ uri: "https://i.pinimg.com/originals/94/c0/ef/94c0ef39e71cf13e4d8b7e4a33677c8f.jpg" }}
                                         resizeMode="cover"
                                         style={tw`flex-1 justify-center w-full h-full shadow-xl border-2`}
                                         blurRadius={5}>
                            <Text style={[styles.text, tw`text-center text-4xl text-white font-bold`]}>{item.id}</Text>
                        </ImageBackground>
                    </Pressable>
                )}
            </View>
        </ScrollView>
    );
}

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-emerald-400 items-center flex justify-center mt-5`
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});