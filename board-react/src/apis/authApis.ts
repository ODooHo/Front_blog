import axios from "axios";

const testUrl = 'http://localhost:8080'
const defaultUrl = 'http://15.165.24.146:8080'


export const signInApi = async (data: any) => {
    const url = `${testUrl}/api/auth/signIn`
    const response = await axios.post(url, data).catch((error) => null);
    if (!response) {
        return null;
    }

    const result = response.data;
    return result
}

export const signUpApi = async (data: any) => {
    const url = `${testUrl}/api/auth/signUp`
    const response = await axios.post(url, data).catch((error) => null);
    if (!response) {
        return null;
    }

    const result = response.data;
    return result
}


export const getAccessTokenApi = async (data: any) => {
    const url = `${testUrl}/api/auth/getAccess`
    const response = await axios.post(url, data, {
        headers: {
            Authorization: `Bearer ${data}`,
        },
    }).catch((error) => null);
    if (!response) {
        return null;
    }

    const result = response.data;
    return result
}