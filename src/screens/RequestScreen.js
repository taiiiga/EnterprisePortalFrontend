import {View, Text, StyleSheet, ScrollView, TextInput, Pressable} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import tw from "twrnc";
import {useEffect, useState} from "react";
import {t} from "react-native-tailwindcss";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";

export const RequestScreen = ({navigation}) => {
    const [text, setText] = useState("");
    const [buttonStyle, setButtonStyle] = useState(style.button);
    const [data, setData] = useState([]);

    useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "Problem/List", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then(response => {
                setData(response.data);
            })
            .catch(function (error) {
                catchError(error);
            });
        };
        const willFocusSubscription = navigation.addListener('focus', () => {
            bootstrapAsync();
        });

        bootstrapAsync();
        return willFocusSubscription;
    }, []);

    const [value, setValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Причина заявки
                </Text>
            );
        }
        return null;
    };

    const sendRequest = async () => {
        const login = await SecureStore.getItemAsync("login");
        if (!value) {
            alert("Выберите причину заявки!");
            return;
        }
        axios.post(apiUrl + "Request/Create", {
            login: login,
            problemId: value,
            commentary: text,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                alert("Запрос успешно отправлен!");
                setText("");
            })
            .catch(function (error) {
                alert("Запрос успешно отправлен!");
                setText("");
            });
    };

    return (
        <View style={tw`bg-white`}>
            <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="text"
                    valueField="id"
                    placeholder={!isFocus ? 'Выберите причину заявки' : '...'}
                    searchPlaceholder="Поиск..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.id);
                        setIsFocus(false);
                    }}
                />
            </View>
            <ScrollView style={tw`bg-white p-3 rounded border mx-5 mb-5 h-50`}>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Комментарий..."
                    placeholderTextColor={'gray'}
                />
            </ScrollView>
            <Pressable style={buttonStyle} onPress={sendRequest}
                       onPressIn={() => setButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setButtonStyle(style.button)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Отправить</Text>
            </Pressable>
        </View>
    );
};

const style = {
    button: tw`h-10 rounded bg-slate-800 items-center flex justify-center mx-5`,
    buttonPressIn: tw`h-10 rounded bg-emerald-400 items-center flex justify-center mx-5`
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 13,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});