import {Pressable, ScrollView, Text, View} from "react-native";
import tw from "twrnc";
import {t} from "react-native-tailwindcss";

export const DepartmentScreen = () => {
    return (
        <ScrollView style={tw`w-full h-full p-5`}>
            <View style={tw`bg-slate-700 rounded p-5`}>
                <Text style={tw`text-white text-center`}>Название отдела</Text>
            </View>
            <View style={tw`bg-slate-500 rounded p-5 mt-2`}>
                <Text style={tw`text-white text-center`}>Руководитель отдела</Text>
            </View>
            <Text style={tw`mt-2 font-bold`}>Проекты</Text>
            <View style={tw`bg-slate-300 rounded p-5 mt-2`}>
                <Text>-</Text>
            </View>
            <Text style={tw`mt-2 font-bold`}>Задачи</Text>
            <View style={tw`bg-slate-300 rounded p-5 mt-2`}>
                <Text>-</Text>
            </View>
            <Text style={tw`mt-2 font-bold`}>Сотрудники</Text>
            <View style={tw`bg-slate-300 rounded p-5 mt-2`}>
                <Text>-</Text>
            </View>
            <Pressable style={tw`h-10 rounded bg-slate-800 items-center flex justify-center mt-2`}
                       onPress={() => alert("Будет реализовано в будущих обновлениях!")}>
                <Text style={[t.textWhite, t.textXl]}>Обзор отделов</Text>
            </Pressable>
        </ScrollView>
    );
};