import React from "react";
import {Pressable, ScrollView, StyleSheet, Text, TextInput} from "react-native";
import tw from "twrnc";
import {t} from "react-native-tailwindcss";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import {Dropdown} from "react-native-element-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';

export const EditTaskScreen = ({route, navigation}) => {
    const {item} = route.params;
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [name, setName] = React.useState(item.name);
    const [text, setText] = React.useState(item.text);
    const [employeeId, setEmployeeId] = React.useState(item.employeeId);
    const [projectId, setProjectId] = React.useState(item.projectId);
    const [status, setStatus] = React.useState(item.taskTypeId);
    const [dateOfBirth, setDateOfBirth] = React.useState(new Date(item.deadline.split('.')[2], item.deadline.split('.')[1], item.deadline.split('.')[0]));
    const [isFocus, setIsFocus] = React.useState(false);
    const [isFocus2, setIsFocus2] = React.useState(false);
    const [employerData, setEmployerData] = React.useState([]);
    const [statusData, setStatusData] = React.useState([]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setDateOfBirth(currentDate);
    };

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "Task/Get", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                params: {
                    id: item.id
                },
            })
                .then(response => {
                    const task = response.data;
                    setName(task.name);
                    setText(task.text);
                    setEmployeeId(task.employeeId);
                    setProjectId(task.projectId);
                    setStatus(task.taskTypeId);
                    setDateOfBirth(new Date(item.deadline.split('.')[2], item.deadline.split('.')[1], item.deadline.split('.')[0]));
                })
                .catch(function (error) {
                    if (error.response.status === 401) {
                        alert("?????????????? ?????? ?????? ?? ??????????????, ????????????????????!");
                    }
                    catchError(error);
                });
            await getEmployers();
            await getStatuses();
        };

        bootstrapAsync();
    }, []);

    const saveTask = async () => {
        await axios.post(apiUrl + "Task/Update", {
            id: item.id,
            name: name,
            text: text,
            employeeId: employeeId,
            employeeName: '',
            projectId: projectId,
            projectName: '',
            taskTypeId: status,
            taskTypeName: '',
            deadline: dateOfBirth.toLocaleDateString('ru', {year: "numeric", month: "numeric", day: "numeric"}),
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
                alert(error);
                catchError(error);
            });
    };

    const getEmployers = async () => {
        await axios.get(apiUrl + "Account/List", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                setEmployerData(response.data);
            })
            .catch(function (error) {
                catchError(error);
            });
    };

    const getStatuses = async () => {
        await axios.get(apiUrl + "TaskType/List", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                setStatusData(response.data);
            })
            .catch(function (error) {
                catchError(error);
            });
    };

    return (
        <ScrollView style={tw`h-full w-full bg-white p-5`}>
            <Text style={tw`mt-2 font-bold mb-1`}>????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>?????????? ????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="????????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>?????????????????????? ??????????????????</Text>
            <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}, styles.input]}
                data={employerData}
                maxHeight={300}
                labelField="firstName"
                valueField="id"
                placeholder={!isFocus ? '???????????????? ????????????????????' : '...'}
                value={employeeId}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setEmployeeId(item.id);
                    setIsFocus(false);
                }}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>???????????? ????????????</Text>
            <Dropdown
                style={[styles.dropdown, isFocus2 && {borderColor: 'blue'}, styles.input]}
                data={statusData}
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={!isFocus2 ? '???????????????? ????????????' : '...'}
                value={status}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={item => {
                    setStatus(item.id);
                    setIsFocus2(false);
                }}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>?????????????? ????????</Text>
            <DateTimePicker
                style={tw`h-10 w-full`}
                value={dateOfBirth}
                mode='date'
                display='calendar'
                onChange={onChange}/>
            <Pressable style={style.button} onPress={() => saveTask()}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>??????????????????</Text>
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