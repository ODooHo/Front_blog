import axios from "axios";

const defaultUrl = 'http://localhost:4000'


export const signInApi = async (data: any) => {
    const url = `${defaultUrl}/api/auth/signIn`
    const response = await axios.post(url, data).catch((error) => null);
    if (!response) {
        return null;
    }

    const result = response.data;
    return result
}

export const signUpApi = async (data: any) => {
    const url = `${defaultUrl}/api/auth/signUp`
    const response = await axios.post(url, data).catch((error) => null);
    if (!response) {
        return null;
    }

    const result = response.data;
    return result
}


export const getAccessTokenApi = async (data: any) => {
    const url = `${defaultUrl}/api/auth/getAccess`
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