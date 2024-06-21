import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path to your AuthProvider
import { Navigate } from 'react-router-dom';
import { axios_open } from '../axios_config/axiosConfig'; // Adjust the path to your axios config

const ProtectedRoute = ({ children }) => {
    const { token, setToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const response = await axios_open.post("/refresh", {}, { withCredentials: true });
                setToken(response.data.accessToken);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        if (!token) {
            fetchAccessToken();
        } else {
            setIsLoading(false);
        }
    }, [token, setToken]);

    if (isLoading) {
        return <div>Loading...</div>; // You can replace this with a proper loading component or spinner
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
