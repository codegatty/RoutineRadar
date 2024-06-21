import {  createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { axios_user } from '../axios_config/axiosConfig';

const AuthContext = createContext(undefined);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be within an AuthProvider");
    }
    return authContext;
};

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();

    useEffect(() => {
        async function fetchAccessToken() {
            try {
                const response = await axios_user.post("/refresh");
                setToken(response.data.accessToken);
            } catch (err) {
                setToken(null);
            }
        }

        fetchAccessToken();
    }, []);

    useLayoutEffect(() => {
        const authInterceptor = axios_user.interceptors.request.use((config) => {
            config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
            return config;
        });

        return () => {
            axios_user.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        const refreshInterceptor = axios_user.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 403 && error.response.data.message === "unauthorized" && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const response = await axios_user.post("/refresh");
                        setToken(response.data.accessToken);
                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        return axios_user(originalRequest);
                    } catch (err) {
                        setToken(null);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => {
            axios_user.interceptors.response.eject(refreshInterceptor);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
