import {ActivityIndicator, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import tw  from 'twrnc';
import {catchError} from "../constans";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";

export default function HomeScreen({navigation}) {
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
                    const sortArray = response.data;
                    setNews(sortArray);
                })
                .catch(function (error) {
                    catchError(error);
                });
        };
        const willFocusSubscription = navigation.addListener('focus', () => {
            bootstrapAsync();
        });

        bootstrapAsync();
        return willFocusSubscription;
    }, []);

    if (!news) {
        return (
            <ActivityIndicator
                animating={true}
                style={styles.indicator}
                size="large"
            />
        );
    } else {
        return (
            <ScrollView style={tw`bg-white dark:bg-gray-900`}>
                <View style={tw`w-full h-full bg-white dark:bg-gray-900 px-4 flex flex-row flex-wrap`}>
                    {news
                        .sort((a, b) => new Date(b.date.split('.')[2], b.date.split('.')[1], b.date.split('.')[0]) - new Date(a.date.split('.')[2], a.date.split('.')[1], a.date.split('.')[0]))
                        .map((item) =>
                            <View style={tw`mt-5 w-full`} key={item.id}>
                                <Pressable style={tw`w-full h-10 pt-6 bg-slate-900 flex items-center flex justify-center`}
                                           onPress={() => navigation.navigate('Новость', {
                                               item: item,
                                           })}
                                           onPressIn={() => setRoleButtonStyle(style.buttonPressIn)}
                                           onPressOut={() => setRoleButtonStyle(style.button)}>
                                    <Text style={[styles.text, tw`text-center text-white h-10`]}>{item.date}</Text>
                                </Pressable>
                                <Pressable style={tw`w-full h-30 p-5 bg-slate-800 flex items-center flex justify-center`}
                                           onPress={() => navigation.navigate('Новость', {
                                               item: item,
                                           })}
                                           onPressIn={() => setRoleButtonStyle(style.buttonPressIn)}
                                           onPressOut={() => setRoleButtonStyle(style.button)}>
                                    <Text style={[styles.text, tw`text-center text-2xl text-white font-bold`]}>{item.header}</Text>
                                </Pressable>
                            </View>
                        )}
                </View>
            </ScrollView>
        );
    }
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
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
});