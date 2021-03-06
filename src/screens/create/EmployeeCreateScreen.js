import {Pressable, ScrollView, StyleSheet, Text, TextInput} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';
import axios from "axios";
import {apiUrl} from "../../networking/ListOfUrl";
import {catchError} from "../../constans";
import {Dropdown} from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";


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
        { label: '??????????????', value: true },
        { label: '??????????????', value: false },
    ];
    const save = async () => {
        await axios.post(apiUrl + item + "/Create", {
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
            "sex": sex ? "??????????????" : "??????????????",
            "dateOfBirth": dateOfBirth,
            "phone": phone,
            "email": email,
            "telegram": telegram,
            "workTime": "string",
            "workTimeBegin": workTimeBegin.toLocaleString(),
            "workTimeEnd": workTimeEnd.toLocaleString(),
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
            <Text style={tw`mt-2 font-bold mb-1`}>??????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFirstName}
                value={firstName}
                placeholder="????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>??????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setSecondName}
                value={secondName}
                placeholder="????????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFatherName}
                value={fatherName}
                placeholder="????????????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>??????</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }, styles.input]}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? '???????????????? ??????' : '...'}
                value={sex}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setSex(item.value);
                    setIsFocus(false);
                }}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>???????? ????????????????</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={ dateOfBirth }
                mode='date'
                display='calendar'
                onChange={onChange} />
            <Text style={tw`mt-2 font-bold mb-1`}>?????????????????? ??????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="????????????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>?????????????????????? ??????????</Text>
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
            <Text style={tw`mt-2 font-bold mb-1`}>?????????? ???????????? ????????????</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={ workTimeBegin }
                mode='time'
                display='clock'
                onChange={onChangeBegin} />
            <Text style={tw`mt-2 font-bold mb-1`}>?????????? ?????????? ????????????</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={ workTimeEnd }
                mode='time'
                display='clock'
                onChange={onChangeEnd} />
            <Pressable style={buttonStyle} onPress={() => save()}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>??????????????????</Text>
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