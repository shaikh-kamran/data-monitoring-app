import axios from 'axios';
const baseURL = `https://${window.location.hostname}:${window.location.port}/api`;
// const baseURL = "http://localhost:5000/api";

export default {
    getDeviceList: () => {
        const api = baseURL + "/device";
        return axios.get(api)
    },
    getDeviceData: (params: any) => {
        const api = baseURL + "/readings";
        return axios.get(api, { params })
    }
}