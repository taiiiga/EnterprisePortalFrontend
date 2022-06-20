import {View, Text, ScrollView, Pressable, StyleSheet} from "react-native";
import tw from "twrnc";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import React from "react";

export const DepartmentsScreen = ({navigation}) => {
    const [departments, setDepartments] = React.useState([]);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "Department/List", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then(response => {
                    const sortArray = response.data;
                    setDepartments(sortArray);
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

    return (
        <ScrollView style={tw`bg-white dark:bg-gray-900`}>
            <View style={tw`w-full h-full bg-white dark:bg-gray-900 px-4 flex flex-row flex-wrap`}>
                {departments
                    .map((item) =>
                        <Pressable key={item.id} style={tw`w-full h-30 rounded bg-slate-800 flex mt-5 items-center flex justify-center`}
                                   onPress={() => navigation.navigate('Отдел', {
                                       id: item.id,
                                   })}>
                            <Text style={[styles.text, tw`text-center text-2xl text-white font-bold`]}>{item.name}</Text>
                        </Pressable>
                    )}
            </View>
        </ScrollView>
    );
};

const style = {
    button: tw`w-full h-30 rounded bg-slate-800 items-center flex justify-center mt-5`,
    buttonPressIn: tw`w-full h-30 rounded bg-emerald-400 items-center flex justify-center mt-5`
}

const styles = StyleSheet.create({
    text: {
        textShadowColor: 'rgba(0, 0, 0, 0.95)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    }
});