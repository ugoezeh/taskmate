import Link from 'next/link';
import axios from 'axios';
import { headers } from 'next/headers';

import styles from './Header.module.css';

const Header = async () => {
  const nHeaders = headers();
  const { data } = await axios.get(
    'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
    { headers: Object.fromEntries(nHeaders.entries()) }
  );

  const { currentUser } = data;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>TaskMate</a>
        </Link>
      </div>

      <nav className={styles.nav}>
        {currentUser && (
          <Link href='/create'>
            <a>Add Task</a>
          </Link>
        )}

        {!currentUser && (
          <Link href='/signin'>
            <a>Signin</a>
          </Link>
        )}

        {!currentUser && (
          <Link href='/signup'>
            <a>Signup</a>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
