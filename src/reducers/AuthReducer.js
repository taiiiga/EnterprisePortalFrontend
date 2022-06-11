export const AuthReducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
                admin: action.admin,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
                admin: false
            };
    }
};