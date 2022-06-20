import {Alert, FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';
import axios from "axios";
import {apiUrl} from "../../networking/ListOfUrl";
import {catchError} from "../../constans";
import {Button, Icon} from "react-native-elements";
import {Dropdown} from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as SecureStore from "expo-secure-store";


export default function EmployeeCreateScreen({route, navigation}) {
    const {item} = route.params;
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [firstName, setFirstName] = React.useState("");
    const [secondName, setSecondName] = React.useState("");
    const [fatherName, setFatherName] = React.useState("");
    const [sex, setSex] = React.useState(true);
    const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
    const [isFocus, setIsFocus] = React.useState(false);
    const [telegram, setTelegram] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [image, setImage] = React.useState(null);
    const save = async () => {
        await axios.post(apiUrl + item + "/Create", {
            login: login,
            firstName: firstName,
            secondName: secondName,
            fatherName: fatherName,
            sex: sex,
            dateOfBirth: dateOfBirth,
            phone: phone,
            email: email,
            telegram: telegram
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                navigation.goBack();
            })
            .catch(function (error) {
                catchError(error);
            });
    };

    return (
        <ScrollView style={tw`h-full w-full bg-white p-5`}>
            <Text style={tw`mt-2 font-bold mb-1`}>Имя</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                placeholder="Иван"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Фамилия</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSecondName}
                placeholder="Иванов"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Отчество</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFatherName}
                placeholder="Иванович"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Пол</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}, styles.input]}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Выберите пол' : '...'}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSex(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Дата рождения</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                mode='date'
                display='calendar'
                onChange={onChange}/>
            <Text style={tw`mt-2 font-bold mb-1`}>Мобильный телефон</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPhone}
                placeholder="Иванович"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Электронная почта</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                placeholder="mail@mail.com"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Telegram</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTelegram}
                placeholder="@ivan"
                placeholderTextColor={'gray'}
            />
            <Pressable style={buttonStyle} onPress={() => save()}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Сохранить</Text>
            </Pressable>
        </ScrollView>
    );
}

const style = {
    button: tw`w-full h-18 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-18 rounded bg-emerald-400 items-center flex justify-center mt-5`
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});