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


export default function TaskCreateScreen({route, navigation}) {
    const {item} = route.params;
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [employeeId, setEmployeeId] = React.useState("");
    const [projectId, setProjectId] = React.useState("");
    const [name, setName] = React.useState("");
    const [text, setText] = React.useState("");
    const [taskTypeId, setTaskTypeId] = React.useState("");
    const [deadLine, setDeadLine] = React.useState(new Date());
    const save = async () => {
        await axios.post(apiUrl + item + "/Create", {
            name: name,
            employeeId: employeeId,
            projectId: projectId,
            text: text,
            taskTypeId: taskTypeId,
            deadline: deadLine
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
                onChangeText={setName}
                placeholder="Задача"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID сотрудника</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmployeeId}
                placeholder="5"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID проекта</Text>
            <TextInput
                style={styles.input}
                onChangeText={setProjectId}
                placeholder="4"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Содержание</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                placeholder="Текст"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID типа задачи</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTaskTypeId}
                placeholder="1"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>Дедлайн</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                mode='date'
                display='calendar'
                onChange={onChange}/>
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