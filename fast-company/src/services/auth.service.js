import axios from "axios";

const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    //  password: passw,
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, passw }) => {
        console.log(email, passw);
        const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
            email,
            password: passw,
            returnSecureToken: true
        });
        return data;
    }
};

export default authService;
