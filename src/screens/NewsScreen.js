import {ScrollView, Text, View} from "react-native";
import React from "react";
import tw from "twrnc";

export default function NewsScreen({route, navigation}) {
    const {item} = route.params;
    return (
        <ScrollView style={tw`w-full h-full p-5`}>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>{item.header}</Text>
            </View>
            <View style={tw`bg-slate-500 p-5`}>
                <Text style={tw`text-white text-center`}>{item.text}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5`}>
                <Text style={tw`text-white text-center`}>Новость #{JSON.stringify(item.id)}, Автор: {item.author}</Text>
            </View>
            <View style={tw`bg-slate-700 p-5 border`}>
                <Text style={tw`text-white text-center`}>Дата: {item.date}</Text>
            </View>
        </ScrollView>
    );
}
