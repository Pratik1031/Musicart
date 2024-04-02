import React, { useState } from 'react';
import Styles from './login.module.css';
import Signup from '../Signup/Signup';
import Footer from '../../Home/Footer';
import axios from 'axios';
import logo from '../../../assets/icons/logo.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [active, setActive] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSwitch = () => {
    setActive(active === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await axios.post(
        'http://localhost:8080/api/v1/users/login',
        userData
      );
      const data = response.data.data;
      // console.log(response.data.user.name);
      localStorage.setItem('data', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {active === 'login' && (
        <div className={Styles.container}>
          <div className={Styles.logoo}>
            <img src={logo} alt='logo' className={Styles.logo_img} />
          </div>
          <div className={Styles.form}>
            <h2 className={Styles.heading}>Sign in</h2>
            <form method='post' action='/login' onSubmit={handleSubmit}>
              <div className={Styles.login}>
                <label htmlFor='Enter your email or mobile number'>
                  Enter your email or mobile number
                </label>
                <input
                  type='text'
                  required
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='Password'>Password</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className={Styles.continue_btn} type='submit'>
                  Continue
                </button>
                <p>
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </p>
              </div>
            </form>
          </div>
          <div className={Styles.centered_text}>
            <div className={Styles.line}></div>
            <div className={Styles.text}>New to Musicart ?</div>
            <div className={Styles.line}></div>
          </div>
          <button className={Styles.btn} onClick={handleFormSwitch}>
            Create your Musicart account
          </button>
          <Footer />
        </div>
      )}
      {active === 'signup' && <Signup />}
    </>
  );
};

export default Login;
