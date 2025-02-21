'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from './signup.module.css';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
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

    try {
      const resp = await axios.post('/api/users/signup', userInfo);

      if (resp.status === 201) {
        router.push('/');
        return;
      }
    } catch (err) {
      console.log(err);
      router.push('/signup');
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Sign Up</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='username'>
            Username
          </label>
          <input
            className={styles.input}
            type='text'
            id='username'
            name='username'
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor='email'>
            Email
          </label>
          <input
            className={styles.input}
            type='email'
            id='email'
            name='email'
            value={userInfo.email}
            onChange={handleChange}
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
