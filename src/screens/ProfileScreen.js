import React from "react";
import {Avatar, Button, Icon} from 'react-native-elements';
import {View, Text, ScrollView } from "react-native";
import tw from "twrnc";

export const ProfileScreen = ({navigation}) => {
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
                />
            )
        });
    }, [navigation]);

    return (
        <ScrollView style={tw`h-full w-full bg-white`}>
            <View style={tw`bg-indigo-500 w-full items-center pt-5 pb-5`}>
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
                <Text style={tw`text-xl font-bold mt-2`}>Искандер Хисамов Равилевич</Text>
                <Text style={tw`text-lg`}>ЖКХиСЗ</Text>
                <Text style={tw`text-md`}>Проект "Биллинг"</Text>
            </View>
            <View style={tw`bg-slate-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Место работы: <Text style={tw`text-lg font-light`}>АО БАРС Груп</Text></Text>
                <Text style={tw`text-lg font-bold`}>Должность: <Text style={tw`text-lg font-light`}>Младший разработчик</Text></Text>
                <Text style={tw`text-lg font-bold`}>Вид работы: <Text style={tw`text-lg font-light`}>Основная работа</Text></Text>
            </View>
            <View style={tw`bg-pink-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Пол: <Text style={tw`text-lg font-light`}>Мужской</Text></Text>
                <Text style={tw`text-lg font-bold`}>День рождение: <Text style={tw`text-lg font-light`}>08.04.2000</Text></Text>
            </View>
            <View style={tw`bg-green-500 rounded mt-5 p-5`}>
                <Text style={tw`text-lg font-bold`}>Мобильный телефон: <Text style={tw`text-lg font-light`}>+79534075488</Text></Text>
                <Text style={tw`text-lg font-bold`}>E-mail: <Text style={tw`text-lg font-light`}>iskanderkhisamov@gmail.com</Text></Text>
                <Text style={tw`text-lg font-bold`}>Telegram: <Text style={tw`text-lg font-light`}>@taiiiga</Text></Text>
            </View>
        </ScrollView>
    );
};