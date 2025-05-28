import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(() => {
            window.location.href = '/';
            setTimeout(() => navigate('/login'), 100);
        });
    }, [navigate]);

    return <p>Logging out...</p>;
};

export default Logout;