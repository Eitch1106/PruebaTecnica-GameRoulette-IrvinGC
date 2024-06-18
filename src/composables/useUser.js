import { storeToRefs } from "pinia";
import { userStore } from '../stores/userStore.js';

export const useLogin = () => {

    const loginStore = userStore();
    const {user, isAuthenticated, isNew} = storeToRefs(loginStore);

    const logout = () => {
        loginStore.logout()
    }

    const login = async () => {
        if (!user.value.name) return;
        await loginStore.login()  
    }

    const updateAmount = async () => {
        await loginStore.updateSaldo()
    }

    return {
        user,
        isAuthenticated, 
        isNew,

        login,
        logout
    }
}