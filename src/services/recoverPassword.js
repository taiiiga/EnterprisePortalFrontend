import axios from "axios";
import {apiUrl} from "../networking/ListOfUrl";
import {catchError} from "../constans";

export const recoverPassword = async (email) => {
    await axios.post(apiUrl + "Account/RecoverPassword", {
        email: data.email
    }, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
    .then(() => {
        alert("Письмо с паролем отправлено на почту!");
    })
    .catch((error) => {
        catchError(error)
    });
}