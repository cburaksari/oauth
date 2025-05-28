import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

export default function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkIsAuthenticated();
    }, [location, navigate]);

    const checkIsAuthenticated = async () => {
        validateRequest();
    }

    const validateRequest = () => {
        let token = localStorage.getItem('token');
        if (!token) {
            const params = new URLSearchParams(location.search);
            token = params.get("token");

            if (token) {
                localStorage.setItem("token", token);
            } else {
                navigate("/login");
            }
        }
    }

    return (
        <div>
            <h1>Welcome</h1>
        </div>
    );
}