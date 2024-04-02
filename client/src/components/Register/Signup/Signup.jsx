import React, { useState } from 'react';
import Footer from '../../Home/Footer';
import Styles from './signup.module.css';
import Login from '../Login/Login';
import logo from '../../../assets/icons/logo.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [active, setActive] = useState('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const navigate = useNavigate('');

  const handleFormSwitch = () => {
    setActive(active === 'signup' ? 'login' : 'signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, mobileNo, email, password };
      const response = await axios.post(
        'http://localhost:8080/api/v1/users/signup',
        userData
      );
      navigate('/');
      console.log('User Created Sucessfully', response);
    } catch (error) {
      console.error('Error Creating User', error);
    }
  };

  return (
    <>
      {active === 'signup' && (
        <div className={Styles.container}>
          <div className={Styles.logo}>
            <img src={logo} alt='logo' className={Styles.logo_img} />
          </div>
          <div className={Styles.form}>
            <p className={Styles.heading}>Create Account</p>
            <form method='post' action='/signup' onSubmit={handleSubmit}>
              <div className={Styles.login}>
                <label htmlFor='Your name'>Your name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='MobileNo number'>Mobile number</label>
                <input
                  type='number'
                  id='mobileNo'
                  name='mobileNo'
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />

                <label htmlFor='Email Id'>Email Id</label>
                <input
                  type='email'
                  id='email'
                  name='email'
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
                <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>
                  By enrolling your mobile phone number, you consent to receive
                  automated security notifications via text message from
                  Musicart. Message and data rates may apply.
                </p>
                <button className={Styles.continue_btn} type='submit'>
                  Continue
                </button>
                <p style={{ fontSize: '0.9rem' }}>
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </p>
              </div>
            </form>
          </div>
          <div className={Styles.toggle}>
            Already have an account ?
            <span onClick={handleFormSwitch}>Sign In</span>
          </div>
          <Footer />
        </div>
      )}
      {active === 'login' && <Login />}
    </>
  );
};

export default Signup;
