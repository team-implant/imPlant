import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../api/auth';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();
    const loginMutation = useLogin();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await loginMutation.mutateAsync({ username, password });
            if (result.token) {
                if (rememberMe) {
                    localStorage.setItem('isLoggedIn', 'true');
                }
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., show error message to user)
        }
    };

    return (
        <>
            <div className="background-container">
                <div className="circle small shade1 top-left"></div>
                <div className="circle medium shade2 top-right"></div>
                <div className="circle large shade3 bottom-left"></div>
                <div className="circle xlarge shade4 bottom-right"></div>
                <div className="circle xxlarge shade5 center"></div>
                {[...Array(5)].map((_, index) => (
                    <div key={index} className={`logo-background logo-${index + 1}`}></div>
                ))}
            </div>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember Me
                        </label>
                    </div>
                    <button type="submit" disabled={loginMutation.isLoading}>
                        {loginMutation.isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {loginMutation.isError && (
                    <div className="error-message">
                        Login failed. Please check your credentials and try again.
                    </div>
                )}
                <a href="#" className="forgot-password">Forgot password?</a>
            </div>
        </>
    );
};

export default Login;