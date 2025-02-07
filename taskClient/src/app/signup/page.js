import React from 'react';
import styles from './signup.module.css';

const Signup = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
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
