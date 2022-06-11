import {t} from "react-native-tailwindcss";

const catchError = (error) => {
    if (error.response) {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Ошибка!");
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
};

const style = {
    button: [t.bgIndigo600, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6],
    buttonPressIn: [t.bgIndigo400, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6],
    buttonPressOut: [t.bgIndigo500, t.wFull, t.pY2, t.itemsCenter, t.rounded, t.mT6]
}