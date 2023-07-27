import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../../assets/image/login.svg';
import logo from '../../assets/image/logo.svg';
import './login.scss';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'Admin' && password === 'password') {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      navigate('/dashboard');
    } else {
      setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect !');
    }
  };

  return (
    <div className="page_login">
      <h2>Connexion</h2>
      <img src={login} alt="" className="page_login_image" />
      <div className="page_login_form">
        <div className="page_login_form_content">
          <img src={logo} alt="" />
          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Se connecter</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
