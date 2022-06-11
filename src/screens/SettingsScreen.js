import {Pressable, Text, View} from "react-native";
import React from "react";
import {t} from "react-native-tailwindcss";
import tw, {useAppColorScheme} from 'twrnc';


export default function SettingsScreen() {
    const [roleButtonStyle, setRoleButtonStyle] = React.useState(style.button);
    const [colorScheme, toggleColorScheme, setColorScheme] = useAppColorScheme(tw);

    return (
        <View style={tw`bg-white dark:bg-black`}>
            <Pressable style={roleButtonStyle}
                       onPress={toggleColorScheme}
                       onPressIn={() => setRoleButtonStyle(style.buttonPressIn)}
                       onPressOut={() => setRoleButtonStyle(style.button)}>
                <Text style={[t.textWhite, t.fontMedium, t.text2xl]}>Настройка ролей</Text>
            </Pressable>
        </View>
    );
}

const style = {
    button: [t.bgIndigo600, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6],
    buttonPressIn: [t.bgIndigo400, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6]
}