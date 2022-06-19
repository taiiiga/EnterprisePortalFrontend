import {ImageBackground, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";
import tw from 'twrnc';


export default function AdminScreen({navigation}) {
    const {signOut} = React.useContext(AuthContext);
    const [roleButtonStyle, setRoleButtonStyle] = React.useState(style.button);
    const [employeeButtonStyle, setEmployeeButtonStyle] = React.useState(style.button);
    const [departmentButtonStyle, setDepartmentButtonStyle] = React.useState(style.button);
    const [projectButtonStyle, setProjectButtonStyle] = React.useState(style.button);
    const [taskButtonStyle, setTaskButtonStyle] = React.useState(style.button);
    const [buttonStyle, setButtonStyle] = React.useState(style.button);

    return (
        <ScrollView style={tw`bg-white dark:bg-gray-900`}>
            <View style={tw`w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-row flex-wrap`}>
                <Pressable style={roleButtonStyle}
                           onPress={() =>
                               navigation.navigate('Общий список', {
                                   model: "Role"
                               })}
                           onPressIn={() => setRoleButtonStyle(style.buttonPressIn)}
                           onPressOut={() => setRoleButtonStyle(style.button)}>
                    <ImageBackground
                        source={{uri: "https://i.pinimg.com/originals/94/c0/ef/94c0ef39e71cf13e4d8b7e4a33677c8f.jpg"}}
                        resizeMode="cover"
                        style={tw`flex-1 justify-center w-full h-full shadow-xl border-2`}
                        blurRadius={5}>
                        <Text style={[styles.text, tw`text-center text-4xl text-white font-bold`]}>Настройка
                            ролей</Text>
                    </ImageBackground>
                </Pressable>
                <Pressable style={employeeButtonStyle}
                           onPress={() =>
                               navigation.navigate('Общий список', {
                                   model: "Account"
                               })
                           }
                           onPressIn={() => setEmployeeButtonStyle(style.buttonPressIn)}
                           onPressOut={() => setEmployeeButtonStyle(style.button)}>
                    <ImageBackground
                        source={{uri: "https://yandex-images.clstorage.net/DEw95b453/ae0dbf7_1p/kXbGTVuS0VZVS_xFy-z9YF3cicwam_aXPWqlOgzWAA96O_gAo6m5BIpJCprfTIUbIo-4afMRjqThgzVqLvjnMdcghAFAjJ5cVEv_SML39GdW1IbEHo_xlWU9vmMAll8PMnLxB8SVzHWtdCf7pTqtYGLctzumWcLg8u1dZ3mFpUy2bcNCRKaza0txmlDT-utRUaW22AP7-PszZc9lP6s1DzJmtGDauuFhvWctzJYIgHpSy7wwoUWh_ujgeylBkrVplVXze36SmHVEW6do6-vcSmiQrdk_1tXtN375Zx2eCCgFTIBw1ZvqU4VSLOGuBJRLbNi9DpZkpefBxVorbZaAQKZO2VtHhppQR2qIXejk1FNkp7DkKefn8BNryHovsSY6L0eEfNOI-ni7YR3GgR-iRUvevi2pQqHn1_NtL1GHu3yCcuFJTY6-SEZAqmTE4ON8b4qzwSX90s48d9JFLrYIIA9lg0Lpm8VZrFM96K8bl11vyLIpjUON8fL0VihchZFrg0fTWmKAkkh7TaFPzOPTQmenhOUFxNPwNkX2aCWfKyIyQ4Zh843_eKZnEdiWOrd4XO2SL7tpnf3i00M-T7a_f659_2VGo55DemC-SOP3_lFGhbD5LcHn0DBW30gZkAoSHFC1WvSl1GWKSDrsqQS9eVHFtB2Ve5n49_xpMXO3gGmxUf55QJWWX1BunmrH4dtPbJeAzwPXzsQ2Xet0Fag1Cz1MtWThgO5hmUwb3ZQ6nUt3-aMqrlur1u7EczN3iLREgEPQRkWliH5_drhky-7_SW6rnt4r0_DaBE3NcCaBBgk7W4hf7rrPWLpYIfmKH6NrSPivK41Qm8bT6G0KdYmRQJV_0F9KmbJZfXyzV8nAymtTnYPeLM32ySdi93o9thYdJ0i7btSZwUGebAXbqxWrWUPWuhunRb_awvl3I1itn2qeQPR8a4a2VElsnXjZ6Phva5Sr5xrZ5ekjWNJxF60"}}
                        resizeMode="cover"
                        style={tw`flex-1 justify-center w-full h-full shadow-xl border-2`}
                        blurRadius={5}>
                        <Text style={[styles.text, tw`text-center text-4xl text-white font-bold`]}>Настройка
                            сотрудников</Text>
                    </ImageBackground>
                </Pressable>
                <Pressable style={departmentButtonStyle}
                           onPress={() =>
                               navigation.navigate('Общий список', {
                                   model: "Department"
                               })
                           }
                           onPressIn={() => setDepartmentButtonStyle(style.buttonPressIn)}
                           onPressOut={() => setDepartmentButtonStyle(style.button)}>
                    <ImageBackground
                        source={{uri: "https://www.mpcl.in/wp-content/uploads/2020/05/LARGE-SCALE-IT-ASSET-ROLL-OUT-1.jpg"}}
                        resizeMode="cover"
                        style={tw`flex-1 justify-center w-full h-full shadow-xl border-2`}
                        blurRadius={5}>
                        <Text style={[styles.text, tw`text-center text-4xl text-white font-bold`]}>Настройка
                            отделов</Text>
                    </ImageBackground>
                </Pressable>
                <Pressable style={projectButtonStyle}
                           onPress={() =>
                               navigation.navigate('Общий список', {
                                   model: "Project"
                               })
                           }
                           onPressIn={() => setProjectButtonStyle(style.buttonPressIn)}
                           onPressOut={() => setProjectButtonStyle(style.button)}>
                    <ImageBackground
                        source={{uri: "https://www.e-spincorp.com/wp-content/uploads/2017/11/mechanical_resize.jpg"}}
                        resizeMode="cover"
                        style={tw`flex-1 justify-center w-full h-full shadow-xl border-2`}
                        blurRadius={5}>
                        <Text style={[styles.text, tw`text-center text-4xl text-white font-bold`]}>Настройка
                            проектов</Text>
                    </ImageBackground>
                </Pressable>
                <Pressable style={taskButtonStyle}
                           onPress={() =>
                               navigation.navigate('Общий список', {
                                   model: "Task"
                               })
                           }
                           onPressIn={() => setTaskButtonStyle(style.buttonPressIn)}
                           onPressOut={() => setTaskButtonStyle(style.button)}>
                    <ImageBackground source={{uri: "https://miro.medium.com/max/1140/1*ZD3KZIlKNZtgVKw-3JFUwQ.jpeg"}}
                                     resizeMode="cover"
                                     style={tw`flex-1 justify-center w-full h-full shadow-xl border-2`}
                                     blurRadius={5}>
                        <Text style={[styles.text, tw`text-center text-4xl text-white font-bold`]}>Настройка
                            задач</Text>
                    </ImageBackground>
                </Pressable>
                <Pressable style={buttonStyle} onPress={signOut}
                           onPressIn={() => setButtonStyle(style.buttonPressIn)}
                           onPressOut={() => setButtonStyle(style.button)}>
                    <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Выйти</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-emerald-400 items-center flex justify-center mt-5`
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
});