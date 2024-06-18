import api from '../Api/api';

export const getUsers = async () => {
    return await api.get('/User');
};

export const getUserById = async (name) => {
    return await api.get(`/User/${name}`);
};

export const createUser = async (name) => {
    return await api.post('/User', { name });
};

export const updateUser = async (name, amount) => {
    return await api.put(`/User/${name}`,{ name, saldo : amount });
};
