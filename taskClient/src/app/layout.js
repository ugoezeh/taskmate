import React from 'react';

export const metadata = {
  title: 'The Taskmate App',
  description: 'Your all in one task manager',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{React.cloneElement(children, { data: {} })}</body>
    </html>
  );
}
