import axios from '../utils/axios-customize';

export const getAllSchedule = (query) => {
    return axios.get(`/api/v1/schedule?${query}`);
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
    return axios.post(`/api/v1/auth`, { ...data });
};