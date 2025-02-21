import React from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import styles from './layout.module.css';

export const metadata = {
  title: 'The Taskmate App',
  description: 'Your all in one task manager',
};

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={styles.container}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
