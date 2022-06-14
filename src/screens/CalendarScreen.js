import {View, StyleSheet, Text, Pressable, ScrollView, ImageBackground} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {t} from "react-native-tailwindcss";
import tw from "twrnc";
import React from "react";
import {AuthContext} from "../../App";
import {Dropdown} from "react-native-element-dropdown";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";

export default function CalendarScreen({navigation}) {
    const { signOut } = React.useContext(AuthContext);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [taskStyle, setTaskStyle] = React.useState(style.button);
    const [value, setValue] = React.useState('');
    const [isFocus, setIsFocus] = React.useState(false);
    const [data, setData] =  React.useState([]);
    const [tasks, setTasks] =  React.useState([]);
    const [selectedDate, setSelectedDate] =  React.useState(new Date());

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            const login = await SecureStore.getItemAsync("login");
            await axios.get(apiUrl + "Account/GetProjects", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                params: {
                    login: login
                },
            })
            .then(response => {
                setData(response.data == null ? [] : response.data);
                if (value) getTasks();
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert("Войдите еще раз в аккаунт, пожалуйста!!!");
                    signOut();
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

    const getTasks = async () => {
        const login = await SecureStore.getItemAsync("login");
        await axios.get(apiUrl + "Account/GetTasks", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            params: {
                login: login,
                projectId: value,
                selectedDate: selectedDate
            },
        })
        .then(response => {
            setTasks(response.data == null ? [] : response.data);
        })
        .catch(function (error) {
            if (error.response.status === 401) {
                alert("Войдите еще раз в аккаунт, пожалуйста!!!");
                signOut();
            }
            catchError(error);
        });
    };

    return (
        <View style={styles.container}>
            <Dropdown
                style={[styless.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styless.placeholderStyle}
                selectedTextStyle={styless.selectedTextStyle}
                inputSearchStyle={styless.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder={!isFocus ? 'Выберите проект' : '...'}
                searchPlaceholder="Поиск..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={async (item) => {
                    const prefValue = value;
                    if (item.id) setValue(item.id);
                    setIsFocus(false);
                    const login = await SecureStore.getItemAsync("login");
                    await axios.get(apiUrl + "Account/GetTasks", {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        params: {
                            login: login,
                            projectId: value == prefValue ? item.id : value,
                            selectedDate: selectedDate
                        },
                    })
                        .then(response => {
                            setTasks(response.data == null ? [] : response.data);
                        })
                        .catch(function (error) {
                            if (error.response.status === 401) {
                                alert("Войдите еще раз в аккаунт, пожалуйста!!!");
                                signOut();
                            }
                            catchError(error);
                        });
                }}
            />
            <CalendarStrip
                selectedDate={selectedDate}
                scrollToOnSetSelectedDate={true}
                onDateSelected={(date) => {
                    setSelectedDate(date);
                    getTasks();
                }}
                scrollable
                style={{height:90, paddingTop: 10, paddingBottom: 10}}
                calendarColor={'white'}
                calendarHeaderStyle={{color: 'black'}}
                dateNumberStyle={{color: 'black'}}
                dateNameStyle={{color: 'black'}}
                iconContainer={{flex: 0.1}}
                highlightDateNumberStyle={{color: '#5a67d8'}}
                locale={{
                    name: 'ru',
                    config: {
                        months: 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split('_'),
                        monthsShort: 'Янв_Февр_Март_Апр_Май_Июнь_Июль_Авг_Сент_Нояб_Nov_Дек'.split('_'),
                        weekdays: 'Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота'.split('_'),
                        weekdaysShort: 'Вск_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
                        weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
                        longDateFormat: {
                            LT: 'HH:mm',
                            LTS: 'HH:mm:ss',
                            L: 'DD/MM/YYYY',
                            LL: 'D MMMM YYYY',
                            LLL: 'D MMMM YYYY LT',
                            LLLL: 'dddd D MMMM YYYY LT'
                        },
                    }
                }}
            />
            <ScrollView style={tw`bg-white dark:bg-gray-900`}>
                {tasks.map((item) =>
                    <Pressable key={item.id} style={({ pressed }) => [
                        pressed ? style.buttonPressIn : taskStyle
                    ]} onPress={() => navigation.navigate('Задача', {
                            item: item,
                        })}>
                        <Text style={[t.textWhite, t.fontMedium]}>Задача №{item.id}</Text>
                        <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>{item.name}</Text>
                        <Text style={[t.textWhite, t.fontMedium]}>Крайний срок {item.deadline}</Text>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

const styless = StyleSheet.create({
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

const style = {
    button: tw`w-full h-30 rounded bg-slate-500 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-indigo-600 items-center flex justify-center mt-5`,
}