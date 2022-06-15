import React from "react";
import {Avatar, Button, Icon} from 'react-native-elements';
import {View, Text, ScrollView, Pressable} from "react-native";
import tw from "twrnc";
import {t} from "react-native-tailwindcss";
import {AuthContext} from "../../App";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import {useFocusEffect} from "@react-navigation/native";

export const ProfileScreen = ({navigation}) => {
    const { signOut } = React.useContext(AuthContext);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [person, setPerson] = React.useState({});

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            const token = await SecureStore.getItemAsync("userToken");
            const login = await SecureStore.getItemAsync("login");
            await axios.get(apiUrl + "Account/Get", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                params: {
                    login: login
                },
            })
            .then(response => {
                setPerson(response.data);
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert("Войдите еще раз в аккаунт, пожалуйста!!!");
                    signOut();
                }
                catchError(error);
            });
        };
        const willFocusSubscription = navigation.addListener('focus', () => {
            bootstrapAsync();
        });

        bootstrapAsync();
        return willFocusSubscription;
    }, []);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    icon={
                        <Icon
                            name="edit"
                            size={20}
                            color="#5a67d8"
                        />
                    }
                    type="clear"
                    title=""
                    onPress={() => navigation.navigate('Редактировать профиль')}
                />
            )
        });
    }, [navigation]);

    return (
        <ScrollView style={tw`h-full w-full bg-white`}>
            <View style={tw`bg-slate-800 w-full items-center pt-5 pb-5 text-white`}>
                <Avatar
                    size="xlarge"
                    rounded
                    title="CR"
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    source={{
                        uri: 'https://avatars.mds.yandex.net/get-zen_doc/61795/pub_5d77e8b0fc69ab0117820e81_5d7be7391e8e3f00ad9bed19/scale_1200',
                    }}
                    showEditButton
                />
                <Text style={tw`text-xl font-bold mt-2 text-white`}>{person.fullName}</Text>
                <Text style={tw`text-md text-white`}>{person.projectName}</Text>
            </View>
            <View style={tw`bg-slate-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Должность: <Text style={tw`text-lg font-light`}>{person.positionName}</Text></Text>
                <Text style={tw`text-lg font-bold`}>Вид работы: <Text style={tw`text-lg font-light`}>{person.workTypeName}</Text></Text>
            </View>
            <View style={tw`bg-slate-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Пол: <Text style={tw`text-lg font-light`}>{person.sex}</Text></Text>
                <Text style={tw`text-lg font-bold`}>День рождение: <Text style={tw`text-lg font-light`}>{person.dateOfBirth}</Text></Text>
            </View>
            <View style={tw`bg-slate-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Мобильный телефон: <Text style={tw`text-lg font-light`}>{person.phone}</Text></Text>
                <Text style={tw`text-lg font-bold`}>E-mail: <Text style={tw`text-lg font-light`}>{person.email}</Text></Text>
                <Text style={tw`text-lg font-bold`}>Telegram: <Text style={tw`text-lg font-light`}>{person.telegram}</Text></Text>
            </View>
            <Pressable style={buttonStyle} onPress={signOut}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setButtonStyle(style.button)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Выйти</Text>
            </Pressable>
        </ScrollView>
    );
};

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-emerald-400 items-center flex justify-center mt-5`
}