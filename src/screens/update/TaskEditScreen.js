import {FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';
import axios from "axios";
import {apiUrl} from "../../networking/ListOfUrl";
import {catchError} from "../../constans";
import {Button, Icon} from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function TaskEditScreen({route, navigation}) {
    const {item, id} = route.params;

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + item + "/Get", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                params: {
                    id: id
                },

            })
                .then(response => {
                    const model = response.data
                    setName(model.name);
                    setEmployeeId(model.employeeId);
                    setProjectId(model.projectId);
                    setText(model.text);
                    setTaskTypeId(model.taskTypeId);
                    setDeadLine(new Date(model.deadLine));
                })
                .catch(function (error) {
                    catchError(error);
                });
        };
        bootstrapAsync();
    }, []);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [employeeId, setEmployeeId] = React.useState("");
    const [projectId, setProjectId] = React.useState("");
    const [name, setName] = React.useState("");
    const [text, setText] = React.useState("");
    const [taskTypeId, setTaskTypeId] = React.useState("");
    const [deadLine, setDeadLine] = React.useState(new Date());
    const save = async () => {
        await axios.post(apiUrl + item + "/Update", {
            id: id,
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || deadLine;
        setDeadLine(currentDate);
    };

    return (
        <ScrollView style={tw`h-full w-full bg-white p-5`}>
            <Text style={tw`mt-2 font-bold mb-1`}>????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="????????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID ????????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmployeeId}
                value={employeeId}
                placeholder="5"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID ??????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setProjectId}
                value={projectId}
                placeholder="4"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>????????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="??????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID ???????? ????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTaskTypeId}
                value={taskTypeId}
                placeholder="1"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>??????????????</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={deadLine}
                mode='time'
                display='clock'
                onChange={onChange}/>
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