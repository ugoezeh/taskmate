'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from './signin.module.css';

const Signin = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await axios.post('/api/users/signin', userInfo);
    if (resp.status === 200) {
      router.push('/');
      return;
    }
    router.push('/signin');
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign In</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            className={styles.input}
            type='email'
            id='email'
            value={userInfo.email}
            onChange={handleChange}
            name='email'
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='password'>
            Password
          </label>
          <input
            className={styles.input}
            type='password'
            id='password'
            name='password'
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className={styles.button} type='submit'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
