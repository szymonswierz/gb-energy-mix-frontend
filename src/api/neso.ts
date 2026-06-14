import axios from "axios";

const API = "http://localhost:8080/api/v1";

export const getDailyEnergyMix = async () => {
    const response = await axios.get(`${API}/energy-mix-daily`)
    return response.data;
};

export const getOptimalChargingWindow = async (hours: number)=> {
    const response = await axios.get(`${API}/optimal-charging-window/${hours}`)
    return response.data;
};