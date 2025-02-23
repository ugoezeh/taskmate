'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import requireAuth from '@/components/requireAuth';

import styles from './page.module.css';

const Home = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let isMounted = true;

    (async function () {
      try {
        console.log('Home: user ', user);
        console.log('Home: user ', user);

        const { data } = await axios.get('/api/queries');
        console.log('Home Data: ', data);
        if (isMounted) {
          setTasks(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div className={styles.page}>
      <h1>Your Tasks</h1>
      <ul className={styles.centeredList}>
        {tasks.length > 0 &&
          tasks.map((task) => {
            return (
              <div key={task.id}>
                <li>{task.content}</li>
                <button>Delete</button>
              </div>
            );
          })}
        {tasks.length === 0 && <h2>Click On Add Task To Start Adding Tasks</h2>}
      </ul>
    </div>
  );
};

export default requireAuth(Home);
