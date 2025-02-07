import React from 'react';
import styles from './signin.module.css';

const Signin = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Sign In</h2>

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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
