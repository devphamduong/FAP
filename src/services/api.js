import axios from '../utils/axios-customize';

export const getAllSchedule = (query) => {
    return axios.get(`/api/v1/schedule?${query}`);
};