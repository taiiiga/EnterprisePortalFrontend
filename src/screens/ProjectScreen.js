import {View, Text, ScrollView, Pressable, StyleSheet, RefreshControl} from "react-native";
import tw from "twrnc";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";
import React from "react";


export const ProjectScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [project, setProject] = React.useState({
        name: '',
        managerName: '',
        purpose: '',
        tasks: [],
        employees: []
    });
    const [refreshing, setRefreshing] = React.useState(false);

    const getData = async () => {
        await axios.get(apiUrl + "Project/Get", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            params: {
                id: id
            }
        })
            .then(response => {
                const sortArray = response.data;
                setProject(sortArray);
            })
            .catch(function (error) {
                catchError(error);
            });
    };

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.get(apiUrl + "Project/Get", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                params: {
                    id: id
                }
            })
                .then(response => {
                    const sortArray = response.data;
                    setProject(sortArray);
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
        <ScrollView style={tw`w-full h-full p-5`}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={getData}
                        />
                    }>
            <View style={tw`bg-slate-700 rounded p-5`}>
                <Text style={tw`text-white text-center`}>{project.name}</Text>
            </View>
            <View style={tw`bg-slate-500 rounded p-5 mt-2`}>
                <Text style={tw`text-white text-center`}>????????: {project.purpose}</Text>
            </View>
            <View style={tw`bg-slate-500 rounded p-5 mt-2`}>
                <Text style={tw`text-white text-center`}>???????????????????????? ??????????????: {project.managerName}</Text>
            </View>
            <Text style={tw`mt-2 font-bold`}>????????????</Text>
            <View style={tw`bg-slate-300 rounded p-5 mt-2`}>
                {project.tasks.map((item) =>
                    <Pressable key={item.id} style={tw`w-full h-10 rounded bg-slate-800 flex mt-2 items-center flex justify-center`}
                               onPress={() => navigation.navigate('????????????', {
                                   item: item,
                               })}>
                        <Text style={[styles.text, tw`text-center text-sm text-white`]}>{item.name}</Text>
                    </Pressable>
                )}
            </View>
            <Text style={tw`mt-2 font-bold`}>????????????????????</Text>
            <View style={tw`bg-slate-300 rounded p-5 mt-2`}>
                {project.employees.map((item) =>
                    <Pressable key={item.id} style={tw`w-full h-10 rounded bg-slate-800 flex mt-2 items-center flex justify-center`}
                               onPress={() => navigation.navigate('??????????????????', {
                                   item: item,
                               })}>
                        <Text style={[styles.text, tw`text-center text-sm text-white`]}>{item.fullName}</Text>
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