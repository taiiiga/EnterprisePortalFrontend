import {Alert, StyleSheet, Text, View} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';
import axios from "axios";
import {apiUrl} from "../../networking/ListOfUrl";
import {catchError} from "../../constans";
import {Button, Icon} from "react-native-elements";


export default function DepartmentReadScreen({route, navigation}) {
    const {item, id} = route.params;
    const [model, setModel] = React.useState([]);
    const removeAlert = () =>
        Alert.alert(
            "Предупреждение",
            "Вы уверены?",
            [
                {
                    text: "Отмена",
                    onPress: () => {
                    },
                    style: "cancel"
                },
                {text: "Да", onPress: () => remove}
            ],
            {cancelable: true},
        );

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
                    setModel(response.data);
                })
                .catch(function (error) {
                    catchError(error);
                });
        };
        bootstrapAsync();
    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={tw`flex flex-nowrap flex-row`}>
                    <Button
                        icon={
                            <Icon
                                name="edit"
                                size={30}
                                color="#5a67d8"
                            />
                        }
                        type="clear"
                        title=""
                        onPress={edit}
                    />
                    <Button
                        icon={
                            <Icon
                                name="delete"
                                size={30}
                                color="#5a67d8"
                            />
                        }
                        type="clear"
                        title=""
                        onPress={removeAlert}
                    />
                </View>
            )
        });
    }, [navigation]);

    const edit = () => {
        navigation.navigate('Изменение ' + item, {
            "item": item,
            "id": id
        })
    };
    const remove = async (id) => {
        await axios.delete(apiUrl + item + "/Delete",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                params: {
                    id: id
                }
            }
        )
            .then(response => {
                navigation.goBack();
            })
            .catch(function (error) {
                catchError(error);
            });
    };

    return (
        <View key={model.id} style={style.elements}>
            <Text style={[t.textWhite, t.fontMedium, t.textXl]}>ID: {model.id}</Text>
            <Text style={[t.textWhite, t.fontMedium, t.textXl]}>Название: {model.name}</Text>
            <Text style={[t.textWhite, t.fontMedium, t.textXl]}>ID менеджера: {model.managerId}</Text>
            <Text style={[t.textWhite, t.fontMedium, t.textXl]}>Имя менеджера: {model.managerName}</Text>
        </View>
    );
}

const style = {
    elements: tw`flex flex-nowrap mt-5 bg-slate-500 rounded mt-5 p-5`,
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});