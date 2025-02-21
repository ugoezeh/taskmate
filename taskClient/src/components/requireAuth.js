'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const requireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
      let isMounted = true;
      (async function () {
        const { data } = await axios.get('/api/users/currentuser');
        const { currentUser } = data;
        if (!currentUser) {
          router.replace('/signin');
        }
        if (isMounted) {
          setUser(currentUser);
        }
      })();
      return () => {
        isMounted = false;
      };
    }, [router]);

    return <WrappedComponent {...props} user={user} />;
  };

  return Wrapper;
};

export default requireAuth;
