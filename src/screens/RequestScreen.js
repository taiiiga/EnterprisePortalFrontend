import {View, Text, StyleSheet, ScrollView, TextInput} from "react-native";
import {Dropdown} from "react-native-element-dropdown";
import tw from "twrnc";
import {useState} from "react";

export const RequestScreen = () => {
    const [text, onChangeText] = useState("Useless Text");
    const [number, onChangeNumber] = useState(null);

    const data = [
        { label: 'Причина 1', value: '1' },
        { label: 'Причина 2', value: '2' },
        { label: 'Причина 3', value: '3' },
        { label: 'Причина 4', value: '4' },
        { label: 'Причина 5', value: '5' },
        { label: 'Причина 6', value: '6' },
        { label: 'Причина 7', value: '7' },
        { label: 'Причина 8', value: '8' },
    ];

    const [value, setValue] = useState(null);
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

    return (
        <View>
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
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Выберите причину заявки' : '...'}
                    searchPlaceholder="Поиск..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}
                />
            </View>
            <ScrollView style={tw`w-full bg-white h-full`}>
                <Text>text</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                />
            </ScrollView>
        </View>
    );
};

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