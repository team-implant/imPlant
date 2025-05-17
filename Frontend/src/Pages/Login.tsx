import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit">Login</button>
                </form>
                <a href="#" className="forgot-password">Forgot password?</a>
            </div>
        </>
    );
};

export default Login;