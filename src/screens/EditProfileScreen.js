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

export const EditProfileScreen = ({navigation}) => {
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
    const [workTimeBegin, setWorkTimeBegin] = React.useState(new Date());
    const [workTimeEnd, setWorkTimeEnd] = React.useState(new Date());

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
    };

    const onChangeBegin = (event, selectedDate) => {
        const currentDate = selectedDate || workTimeBegin;
        setWorkTimeBegin(currentDate);
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || workTimeEnd;
        setWorkTimeEnd(currentDate);
    };

    const data = [
        { label: 'Мужской', value: true },
        { label: 'Женский', value: false },
    ];

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
                setWorkTimeBegin(new Date(person.workTimeBegin));
                setWorkTimeEnd(new Date(person.workTimeEnd));
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

    const saveUser = async () => {
        /*
        const formData = new FormData();
        formData.append();
        formData.append('photo', {
            uri: image,
            type: 'image/jpeg',
            name: "imagename.jpg",
        });
        */


        /*{
            id: 0,
            avatar: "string",
            fullName: "string",
            groupName: "string",
            projectName: "string",
            positionName: "string",
            workTypeName: "string",
            workTime: "string",
            login: login,
            firstName: firstName,
            secondName: secondName,
            fatherName: fatherName,
            sex: sex,
            dateOfBirth: dateOfBirth,
            phone: phone,
            email: email,
            telegram: telegram
        }*/

        const login = await SecureStore.getItemAsync("login");
        if (workTimeBegin > workTimeEnd) {
            alert("Время начала работы больше окончания!");
            return;
        }
        const da = {
            "id": 0,
            "role": "string",
            "login": login,
            "avatar": "string",
            "fullName": "string",
            "firstName": firstName,
            "secondName": secondName,
            "fatherName": fatherName,
            "groupName": "string",
            "projectName": "string",
            "positionName": "string",
            "workTypeName": "string",
            "sex": sex ? "Мужской" : "Женский",
            "dateOfBirth": dateOfBirth,
            "phone": phone,
            "email": email,
            "telegram": telegram,
            "workTime": "string",
            "workTimeBegin": workTimeBegin.toLocaleString(),
            "workTimeEnd": workTimeEnd.toLocaleString(),
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
            alert(error.response);
            catchError(error);
        });
    };

    return (
        <ScrollView style={tw`h-full w-full bg-white p-5`}>
            <Text style={tw`mt-2 font-bold mb-1`}>Имя</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="Иван"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Фамилия</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSecondName}
                value={secondName}
                placeholder="Иванов"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Отчество</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFatherName}
                value={fatherName}
                placeholder="Иванович"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Пол</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, styles.input]}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Выберите пол' : '...'}
                value={sex}
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
                value={ dateOfBirth }
                mode='date'
                display='calendar'
                onChange={onChange} />
            <Text style={tw`mt-2 font-bold mb-1`}>Мобильный телефон</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Иванович"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Электронная почта</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="mail@mail.com"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Telegram</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTelegram}
                value={telegram}
                placeholder="@ivan"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Время начала работы</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={ workTimeBegin }
                mode='time'
                display='clock'
                onChange={onChangeBegin} />
            <Text style={tw`mt-2 font-bold mb-1`}>Время конца работы</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={ workTimeEnd }
                mode='time'
                display='clock'
                onChange={onChangeEnd} />
            <Pressable style={style.button} onPress={() => saveUser()}
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