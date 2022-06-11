import {Button, Text, View} from "react-native";
import React from "react";
import {AuthContext} from "../../App";
import {t} from "react-native-tailwindcss";
import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";

export default function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            await axios.post(apiUrl + "News/List", {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            })
            .then(response => {
                setNews(response.data);
            })
            .catch(function (error) {
                catchError(error);
            });
        };

        bootstrapAsync();
    }, []);

    return (
        <View style={[t.hFull, t.p8, t.itemsCenter, t.pT2]}>
            <Button title="Выйти" onPress={signOut} />
        </View>
    );
}