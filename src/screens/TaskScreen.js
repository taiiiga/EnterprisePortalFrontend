import {ScrollView, Text, View} from "react-native";
import React from "react";
import tw from "twrnc";
import {Button, Icon} from "react-native-elements";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";

export default function TaskScreen({ route, navigation }) {
    const { item } = route.params;

    const [name, setName] = React.useState(item.name);
    const [text, setText] = React.useState(item.text);
    const [employee, setEmployee] = React.useState(item.employeeId);
    const [project, setProject] = React.useState(item.projectId);
    const [status, setStatus] = React.useState(item.taskTypeId);
    const [date, setDate] = React.useState(item.deadline);

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
                setEmployee(task.employeeName);
                setProject(task.projectName);
                setStatus(task.taskTypeName);
                setDate(task.deadline);
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert("Войдите еще раз в аккаунт, пожалуйста!");
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
                    onPress={() => navigation.navigate('Редактировать задачу', { item: item })}
                />
            )
        });
    }, [navigation]);

    return (
        <ScrollView style={tw`w-full h-full p-5`}>
            <Text style={tw`text-black font-bold text-center mb-5`}>Статус задачи:
                {status !== "Закрыта"
                        ? <Text style={tw`text-green-500 font-bold text-center mb-5`}> {status}</Text>
                        : <Text style={tw`text-red-500 font-bold text-center mb-5`}> {status}</Text>}
            </Text>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>{name}</Text>
            </View>
            <View style={tw`bg-slate-500 p-5`}>
                <Text style={tw`text-white text-center`}>{text}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>Задача #{JSON.stringify(item.id)}, Ответственный: {employee}</Text>
                <Text style={tw`text-white text-center`}>Проект: {project}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5 border`}>
                <Text style={tw`text-white text-center`}>Крайний срок: {date}</Text>
            </View>
        </ScrollView>
    );
}
