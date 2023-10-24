import axios from '../utils/axios-customize';

export const getAllSchedule = (query) => {
    return axios.get(`/api/v1/schedule?${query}`);
};

export const getAllScheduleForTeacher = (query) => {
    return axios.get(`/api/v1/schedule/teacher?${query}`);
};

export const getScheduleById = (id) => {
    return axios.get(`/api/v1/schedule/detail?id=${id}`);
};

export const getUserById = (id) => {
    return axios.get(`/api/v1/user?id=${id}`);
};

export const getClassById = (id) => {
    return axios.get(`/api/v1/class?id=${id}`);
};

export const login = (data) => {
    return axios.post(`/api/v1/auth/login`, { ...data });
};

export const register = (data) => {
    return axios.post(`/api/v1/auth/register`, { ...data });
};

export const getAllSlot = () => {
    return axios.get(`/api/v1/code/slot`);
};

export const updateSchedule = (data) => {
    return axios.put(`/api/v1/schedule`, { ...data });
};

export const getAccount = () => {
    return axios.get(`/api/v1/auth/account`);
};

export const logout = () => {
    return axios.post(`/api/v1/auth/logout`);
};