import {FlatList, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';
import axios from "axios";
import {apiUrl} from "../../networking/ListOfUrl";
import {catchError} from "../../constans";
import {Button, Icon} from "react-native-elements";


export default function ProjectEditScreen({route, navigation}) {
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
                    setManagerId(model.managerId)
                    setPurpose(model.purpose)
                    setDepartmentId(model.departmentId)
                })
                .catch(function (error) {
                    catchError(error);
                });
        };
        bootstrapAsync();
    }, []);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [name, setName] = React.useState("");
    const [managerId, setManagerId] = React.useState("");
    const [purpose, setPurpose] = React.useState("");
    const [departmentId, setDepartmentId] = React.useState("");
    const save = async () => {
        await axios.post(apiUrl + item + "/Update", {
            id: id,
            name: name,
            managerId: managerId,
            purpose: purpose,
            departmentId: departmentId
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
            <Text style={tw`mt-2 font-bold mb-1`}>????????????????</Text>
            <Text style={tw`mt-2 font-bold mb-1`}>????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="????????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID ??????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setManagerId}
                value={managerId}
                placeholder="5"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPurpose}
                value={purpose}
                placeholder="????????"
                placeholderTextColor={'gray'}
            />
            <Text style={tw`mt-2 font-bold mb-1`}>ID ????????????????????????</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDepartmentId}
                value={departmentId}
                placeholder="?????????? ???? ??????????????"
                placeholderTextColor={'gray'}
            />
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