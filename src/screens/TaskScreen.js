import {ScrollView, Text, View} from "react-native";
import React from "react";
import tw from "twrnc";
import {Button, Icon} from "react-native-elements";

export default function TaskScreen({ route, navigation }) {
    const { item } = route.params;

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
                {item.taskTypeName === "Анализ"
                        ? <Text style={tw`text-green-500 font-bold text-center mb-5`}> {item.taskTypeName}</Text>
                        : <Text style={tw`text-red-500 font-bold text-center mb-5`}> {item.taskTypeName}</Text>}
            </Text>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>{item.name}</Text>
            </View>
            <View style={tw`bg-slate-500 p-5`}>
                <Text style={tw`text-white text-center`}>{item.text}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>Задача #{JSON.stringify(item.id)}, Ответственный: {item.employeeName}</Text>
                <Text style={tw`text-white text-center`}>Проект {item.projectName}</Text>
                <Text style={tw`text-white text-center`}>Статус задачи: {item.taskTypeName}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5 border`}>
                <Text style={tw`text-white text-center`}>Крайний срок: {item.deadline}</Text>
            </View>
        </ScrollView>
    );
}
