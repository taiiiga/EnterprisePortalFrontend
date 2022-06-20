import React from "react";
import {Avatar, Button, Icon} from 'react-native-elements';
import {View, Text, ScrollView, Pressable, RefreshControl} from "react-native";
import { Badge } from 'react-native-paper';
import tw from "twrnc";
import {t} from "react-native-tailwindcss";
import {AuthContext} from "../../App";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";

export const ProfileScreen = ({navigation}) => {
    const { signOut } = React.useContext(AuthContext);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [person, setPerson] = React.useState({});
    const [refreshing, setRefreshing] = React.useState(false);
    const [begin, setBegin] = React.useState('');
    const [end, setEnd] = React.useState('');
    const [dateBegin, setDateBegin] = React.useState(new Date());
    const [dateEnd, setDateEnd] = React.useState(new Date());

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
                setBegin(new Date(response.data.workTimeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
                setEnd(new Date(response.data.workTimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
                const be = new Date();
                be.setHours(new Date(response.data.workTimeBegin).getHours(), new Date(response.data.workTimeBegin).getMinutes(), new Date(response.data.workTimeBegin).getSeconds());
                setDateBegin(be);
                const en = new Date();
                en.setHours(new Date(response.data.workTimeEnd).getHours(), new Date(response.data.workTimeEnd).getMinutes(), new Date(response.data.workTimeEnd).getSeconds());
                setDateEnd(new Date(response.data.workTimeEnd));
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

    const getData = async () => {
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
            setBegin(new Date(response.data.workTimeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
            setEnd(new Date(response.data.workTimeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
            const be = new Date();
            be.setHours(new Date(response.data.workTimeBegin).getHours(), new Date(response.data.workTimeBegin).getMinutes(), new Date(response.data.workTimeBegin).getSeconds());
            setDateBegin(be);
            const en = new Date();
            en.setHours(new Date(response.data.workTimeEnd).getHours(), new Date(response.data.workTimeEnd).getMinutes(), new Date(response.data.workTimeEnd).getSeconds());
            setDateEnd(new Date(response.data.workTimeEnd));
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                alert("Войдите еще раз в аккаунт, пожалуйста!!!");
                signOut();
            }
            catchError(error);
        });
    };


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
        <ScrollView style={tw`h-full w-full bg-white`}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getData}
                        />
                    }>
            <View style={tw`bg-slate-800 w-full items-center pt-5 pb-5 text-white`}>
                <Avatar
                    size="xlarge"
                    rounded
                    title="CR"
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    source={{
                        uri: person.sex == "Мужской" ? 'https://14.img.avito.st/avatar/social/1024x1024/9441860814.jpg' : 'https://z0sqrs-a.akamaihd.net/1647-easthillmedical/staff/she.jpg',
                    }}
                    showEditButton
                />
                <Badge
                    status= "success"
                    style={new Date() >= dateBegin && dateEnd >= new Date()
                        ? { position: 'absolute', top: 30, right: 130, backgroundColor: 'rgba(0, 212, 35, 1)' }
                        : { position: 'absolute', top: 30, right: 130, backgroundColor: 'rgba(255, 0, 0, 1)' }}
                />
                <Text style={tw`text-xl font-bold mt-2 text-white`}>{person.fullName}</Text>
                <Text style={tw`text-lg font-bold mt-2 text-white`}>{person.groupName}</Text>
                <Text style={tw`text-md text-white`}>{person.projectName}</Text>
                <Text style={tw`text-sm font-bold mt-2 text-white`}>{person.role}</Text>
            </View>
            <View style={tw`bg-slate-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Должность: <Text style={tw`text-lg font-light`}>{person.positionName}</Text></Text>
                <Text style={tw`text-lg font-bold`}>Вид работы: <Text style={tw`text-lg font-light`}>{person.workTypeName}</Text></Text>
                <Text style={tw`text-lg font-bold`}>Стаж: <Text style={tw`text-lg font-light`}>{person.workTime == "1" ? person.workTime + " день" : ["2", "3", "4"].includes(person.workTime) ? person.workTime + " дня" : person.workTime + " дней"}</Text></Text>
                <Text style={tw`text-lg font-bold`}>Время работы: <Text style={tw`text-lg font-light`}>{begin} - {end}</Text></Text>
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