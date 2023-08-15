import axios, { AxiosError } from "axios";
import { getAccessTokenApi } from "./authApis";
import { useCookies } from "react-cookie";



const defaultUrl = 'http://localhost:4000'


export const profileUploadApi = async (token: string | null, refreshToken: string | null, data: any) => {
    const url = `${defaultUrl}/api/upload/profile`;
    
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        const result = response.data;
        return result
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403 && refreshToken) {
            try {
                // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
                const refreshResponse = await getAccessTokenApi(refreshToken)

                if (refreshResponse.data) {
                    const token = refreshResponse.data.token;
                    // 새로 발급된 액세스 토큰으로 다시 요청 보내기
                    const newResponse = await axios.post(url, data,{
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
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



export const getProfileApi = async (token: string | null, refreshToken: string | null, imageName: string | number) => {
    const url = `${defaultUrl}/api/images/${imageName}.jpg/profile`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

            responseType: 'blob'
        });

        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403 && refreshToken) {
            try {
                // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
                const refreshResponse = await getAccessTokenApi(refreshToken)

                if (refreshResponse.data) {
                    const token = refreshResponse.data.token;
                    // 새로 발급된 액세스 토큰으로 다시 요청 보내기
                    const newResponse = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: 'blob'
                    });
                    const imageUrl = URL.createObjectURL(newResponse.data);
                    localStorage.setItem('token',token);
                    return imageUrl;
                } else {
                    // 리프레시 토큰도 만료된 경우 또는 다른 이유로 실패한 경우
                    console.error("Refresh token is expired or invalid");
                    return null;
                }
            } catch (refreshError) {
                console.error("Error refreshing access token:", refreshError);
                return null;
            }

        }else if(axiosError.response && axiosError.response.status === 404){
            const imageUrl = ""
            return imageUrl;
        }
        console.error("Error refreshing access token:", axiosError);
        return null;
    }
};

export const getImageApi = async (token: string | null, refreshToken: string | null, imageName: string | number) => {
    const url = `${defaultUrl}/api/images/${imageName}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

            responseType: 'blob'
        });

        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403 && refreshToken) {
            try {
                // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
                const refreshResponse = await getAccessTokenApi(refreshToken)

                if (refreshResponse.data) {
                    const token = refreshResponse.data.token;
                    // 새로 발급된 액세스 토큰으로 다시 요청 보내기
                    const newResponse = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: 'blob'
                    });
                    const imageUrl = URL.createObjectURL(newResponse.data);
                    localStorage.setItem('token',token);
                    return imageUrl;
                } else {
                    // 리프레시 토큰도 만료된 경우 또는 다른 이유로 실패한 경우
                    console.error("Refresh token is expired or invalid");
                    return null;
                }
            } catch (refreshError) {
                console.error("Error refreshing access token:", refreshError);
                return null;
            }

        }else if(axiosError.response && axiosError.response.status === 404){
            const imageUrl = ""
            return imageUrl;
        }
        console.error("Error refreshing access token:", axiosError);
        return null;
    }
};


export const getVideoApi = async (token: string | null, refreshToken: string | null, videoName: string | number) => {
    const url = `${defaultUrl}/api/videos/${videoName}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

            responseType: "blob",
        });

        const videoUrl = URL.createObjectURL(response.data);
        return videoUrl;
    } catch (error) {
        const axiosError = error as AxiosError;
        //403 -> 토큰 만료시 에러, 500 -> 토큰 만료시 userEntity 찾지 못하는 에러 
        if (axiosError.response && axiosError.response.status === 403 && refreshToken) {
            try {
                // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
                const refreshResponse = await getAccessTokenApi(refreshToken)

                if (refreshResponse.data) {
                    const token = refreshResponse.data.token;
                    // 새로 발급된 액세스 토큰으로 다시 요청 보내기
                    const newResponse = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: 'blob'
                    });

                    const videoUrl = URL.createObjectURL(newResponse.data);
                    localStorage.setItem('token',token);
                    return videoUrl;
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

export const fileDownloadApi = async (token: string | null, refreshToken: string | null, fileName: string) => {
    const url = `${defaultUrl}/api/files/${fileName}`
    

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },

            responseType: 'blob'
        })
        const result = response.data;
        return result
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403 && refreshToken) {
            try {
                // 액세스 토큰 만료로 인한 에러 발생 시, refreshToken을 사용하여 새로운 액세스 토큰 발급
                const refreshResponse = await getAccessTokenApi(refreshToken)

                if (refreshResponse.data) {
                    const token = refreshResponse.data.token;
                    // 새로 발급된 액세스 토큰으로 다시 요청 보내기
                    const newResponse = await axios.get(url, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: 'blob'
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