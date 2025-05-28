import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/welcome');
        } else {
            navigate('/error');
        }
    };

    const handleGoogleSignIn = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div style={{maxWidth: 400, margin: 'auto', padding: 20}}>
            <h2>Login</h2>
            <form method="POST" onSubmit={handleLogin}>
                <div style={{marginBottom: 10}}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{width: '100%', padding: 8, marginTop: 4}}
                        />
                    </label>
                </div>
                <div style={{marginBottom: 10}}>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{width: '100%', padding: 8, marginTop: 4}}
                        />
                    </label>
                </div>
                <button type="submit" style={{width: '100%', padding: 10}}>
                    Submit
                </button>
            </form>

            <hr style={{margin: '20px 0'}}/>

            <button
                onClick={handleGoogleSignIn}
                style={{
                    width: '100%',
                    padding: 10,
                    backgroundColor: '#4285F4',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: 4,
                }}
            >
                Sign in with Google
            </button>
            <button
                style={{
                    width: '100%',
                    padding: 10,
                    marginTop: 20,
                    backgroundColor: '#4285F4',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: 4,
                }}
                onClick={() => navigate('/register')}
            >
                Sign Up
            </button>
        </div>
    );
}
