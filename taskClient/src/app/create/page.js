'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import styles from './createTask.module.css';

const CreateTask = () => {
  const [task, setTask] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('/api/tasks', { task });

      if (resp.status === 201) {
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create Task</h2>
        <input
          type='text'
          placeholder='Enter task'
          name='task'
          value={task}
          onChange={handleChange}
          required
        />
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
