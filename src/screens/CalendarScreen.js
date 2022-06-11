import {View, StyleSheet, Text, Pressable, ScrollView} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {t} from "react-native-tailwindcss";
import tw from "twrnc";
import React from "react";
import {AuthContext} from "../../App";

export default function CalendarScreen() {
    const { signOut } = React.useContext(AuthContext);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);
    const [taskStyle, setTaskStyle] = React.useState(style.button);

    return (
        <View style={styles.container}>
            <CalendarStrip
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
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
                <Pressable style={taskStyle}
                           onPressIn={() => setTaskStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Задачка</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-indigo-600 items-center flex justify-center mt-5`,
}