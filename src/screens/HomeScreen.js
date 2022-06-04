import {Button, Text, View} from "react-native";
import React from "react";
import {AuthContext} from "../../App";

export default function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <Text>Signed in!</Text>
            <Button title="Выйти" onPress={signOut} />
        </View>
    );
}