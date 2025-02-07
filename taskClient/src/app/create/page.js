import styles from './createTask.module.css';

const CreateTask = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Create Task</h2>
        <input type='text' placeholder='Enter task' required />
        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreateTask;
