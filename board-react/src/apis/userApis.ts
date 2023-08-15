import axios, { AxiosError } from "axios";
import { getAccessTokenApi } from "./authApis";

//403 -> 토큰 만료시 에러, 500 -> 토큰 만료시 userEntity 찾지 못하는 에러 

const defaultUrl = 'http://localhost:4000'

export const MyPageApi = async (token: string | null , refreshToken: string | null) => {
    const url = `${defaultUrl}/api/user/myPage`
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = response.data;
        return result;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && (axiosError.response.status === 403  || axiosError.response.status === 500) && refreshToken) {
            try {
                // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
                const refreshResponse = await getAccessTokenApi(refreshToken)

                if (refreshResponse.data) {
                    const token = refreshResponse.data.token;
                    const newResponse = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const result = newResponse.data;
                    localStorage.setItem('token',token);
                    return result;
                } else {
                    // 리프레시 토큰도 만료된 경우 또는 다른 이유로 실패한 경우
                    console.error("Refresh token is expired or invalid");
                    return null;
                }
            } catch (refreshError) {
                console.error("Error refreshing access token:", refreshError);
                return null;
            }

        }
        console.error("Error refreshing access token:", axiosError);
        return null;
    }
};

export const PatchUserApi = async (token: string | null , refreshToken: string | null ,data: any ) => {
    const url = `${defaultUrl}/api/user/edit`
    try{

    const response = await axios.patch(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const result = response.data;
    return result
}catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && (axiosError.response.status === 403  || axiosError.response.status === 500) && refreshToken) {
        try {
            // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
            const refreshResponse = await getAccessTokenApi(refreshToken)

            if (refreshResponse.data) {
                const token = refreshResponse.data.token;
                // 새로 발급된 액세스 토큰으로 다시 요청 보내기
                const newResponse = await axios.patch(url,data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = newResponse.data;
                localStorage.setItem('token',token);
                return result;
            } else {
                // 리프레시 토큰도 만료된 경우 또는 다른 이유로 실패한 경우
                console.error("Refresh token is expired or invalid");
                return null;
            }
        } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            return null;
        }

    }
    console.error("Error refreshing access token:", axiosError);
    return null;
}


}
