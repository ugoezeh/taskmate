import styles from './page.module.css';

const Home = () => {
  return (
    <div className={styles.page}>
      <h1>Your Tasks</h1>
      <ul className={styles.centeredList}>
        <li>
          This information is used to shape Next roadmap and prioritize
          features.
        </li>
        <li>
          This information is used to shape Next roadmap and prioritize
          features.
        </li>
        <li>
          This information is used to shape Next roadmap and prioritize
          features.
        </li>
        <li>
          This information is used to shape Next roadmap and prioritize
          features.
        </li>
        <li>
          This information is used to shape Next roadmap and prioritize
          features.
        </li>
        <li>
          This information is used to shape Next roadmap and prioritize
          features.
        </li>
      </ul>
    </div>
  );
};

export default Home;
