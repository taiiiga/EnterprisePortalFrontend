import {Alert, FlatList, ImageBackground, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import {Button, Icon} from "react-native-elements";


export default function ListScreen({route, navigation}) {
    const {model} = route.params;
    const [list, setList] = React.useState([]);
    const [editButtonStyle, setEditButtonStyle] = React.useState(style.editButton);
    const [roleButtonStyle, setRoleButtonStyle] = React.useState(style.roleButton);
    const [removeButtonStyle, setRemoveButtonStyle] = React.useState(style.removeButton);
    const Item = ({item}) => (
        <View key={item.id} style={style.elements}>
            <Pressable style={({pressed}) => [
                pressed ? style.editButtonPressIn : editButtonStyle
            ]}
                       onPress={() => edit(item.id)}>
                <ImageBackground
                    source={{uri: "https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/pencil-icon.png"}}
                    resizeMode="contain"
                    style={tw`justify-center w-full h-full`}
                >
                </ImageBackground>
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? style.roleButtonPressIn : roleButtonStyle
            ]}
                       onPress={() => read(item.id)}>
                <Text style={[t.textWhite, t.fontMedium, t.textXl]}>{item.id}</Text>
            </Pressable>
            <Pressable style={({pressed}) => [
                pressed ? style.removeButtonPressIn : removeButtonStyle
            ]}
                       onPress={() => removeAlert(item.id)}>
                <ImageBackground
                    source={{uri: "https://static.wikia.nocookie.net/baldi-fanon/images/7/7a/B889B0A9-4717-4D37-9ADD-AB7B5E11FAEF.png/revision/latest?cb=20190226222946"}}
                    resizeMode="contain"
                    style={tw`justify-center w-full h-full`}>
                </ImageBackground>
            </Pressable>
        </View>);

    React.useEffect(() => refresh(), []);

    const removeAlert = (id) =>
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
                {text: "Да", onPress: () => remove(id)}
            ],
            {cancelable: true},
        );
    const refresh = () => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + model + "/List", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then(response => {
                    setList(response.data);
                })
                .catch(function (error) {
                    catchError(error);
                });
        };
        bootstrapAsync();
    }

    const create = () => {
        navigation.navigate('Создание ' + model, {
            "item": model
        })
    };
    const read = (id) => {
        navigation.navigate('Просмотр ' + model, {
            "item": model,
            "id": id
        })
    };
    const edit = (id) => {
        navigation.navigate('Изменение ' + model, {
            "item": model,
            "id": id
        })
    };
    const remove = async (id) => {
        await axios.delete(apiUrl + model + "/Delete",
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
                refresh()
            })
            .catch(function (error) {
                catchError(error);
            });
    };


    const [isFetching, setIsFetching] = React.useState(false);

    const onRefresh = async () => {
        setIsFetching(true);
        refresh()
        setIsFetching(false);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Button
                        icon={
                            <Icon
                                name="add"
                                size={30}
                                color="#5a67d8"
                            />
                        }
                        type="clear"
                        title=""
                        onPress={create}
                    />
                </View>
            )
        });
    }, [navigation]);

    return (
        <View>
            <FlatList onRefresh={onRefresh}
                      refreshing={isFetching}
                      data={list}
                      renderItem={Item}/>
        </View>
    );
}

const style = {
    roleButton: tw`w-4/6 h-12 rounded bg-slate-800 items-center flex justify-center`,
    roleButtonPressIn: tw`w-4/6 h-12 rounded bg-emerald-400 items-center flex justify-center`,
    removeButton: tw`w-1/6 h-12 items-center flex justify-center`,
    removeButtonPressIn: tw`w-1/6 h-12 items-center flex justify-center p-1`,
    editButton: tw`w-1/6 h-12 items-center flex justify-center`,
    editButtonPressIn: tw`w-1/6 h-12 items-center flex justify-center p-1`,
    button: tw`w-full h-12 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-12 rounded bg-emerald-400 items-center flex justify-center mt-5`,
    elements: tw`flex flex-nowrap flex-row mt-5`,
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});