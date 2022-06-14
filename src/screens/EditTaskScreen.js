import React from "react";
import {Avatar, Icon} from 'react-native-elements';
import {View, Text, ScrollView, Pressable, TextInput, StyleSheet, Switch} from "react-native";
import tw from "twrnc";
import {t} from "react-native-tailwindcss";
import {AuthContext} from "../../App";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import {Dropdown} from "react-native-element-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const EditTaskScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [name, setName] = React.useState(item.name);
    const [text, setText] = React.useState(item.text);
    const [employer, setEmployer] = React.useState(item.employeeName);
    const [status, setStatus] = React.useState(item.taskTypeId);
    const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
    const [isFocus, setIsFocus] = React.useState(false);
    const [telegram, setTelegram] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
    };

    const data = [
        { label: 'Мужской', value: true },
        { label: 'Женский', value: false },
    ];

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "Task/Get", {
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
                    const person = response.data;
                    setSecondName(person.fullName.split(' ')[0]);
                    setFirstName(person.fullName.split(' ')[1]);
                    setFatherName(person.fullName.split(' ')[2]);
                    setSex(person.sex === "Мужской");
                    const date = person.dateOfBirth.split('.');
                    setDateOfBirth(new Date(date[2], date[1], date[0]));
                    setPhone(person.phone);
                    setEmail(person.email);
                    setTelegram(person.telegram);
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        alert("Войдите еще раз в аккаунт, пожалуйста!");
                    }
                    catchError(error);
                });
        };

        bootstrapAsync();
    }, []);

    const saveTask = async () => {
        const login = await SecureStore.getItemAsync("login");
        await axios.post(apiUrl + "Task/Update", {
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
            <Text style={tw`mt-2 font-bold mb-1`}>Название</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="Иван"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Текст задачи</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSecondName}
                value={secondName}
                placeholder="Иванов"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Исполняющий сотрудник</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, styles.input]}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Выберите сотрудника' : '...'}
                value={sex}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSex(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Статус задачи</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, styles.input]}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Выберите статус' : '...'}
                value={sex}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSex(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Крайний срок</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={ dateOfBirth }
                mode='date'
                display='calendar'
                onChange={onChange} />
            <Pressable style={style.button} onPress={() => saveTask()}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Сохранить</Text>
            </Pressable>
        </ScrollView>
    );
};

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-emerald-400 items-center flex justify-center mt-5`
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
});