import { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { UserContext } from './context/userContext';
import { Outlet } from 'react-router-dom';
import { axios_user } from './axios_config/axiosConfig';
import { Spinner } from 'flowbite-react';

function App() {
  const [isLoading, setLoading] = useState(true);
  const userCtx = useContext(UserContext);

  useLayoutEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await axios_user.get('/currentUser');
        userCtx.storeUser(response.data);
      } catch (err) {
        console.log('Something went wrong while fetching current user:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();

    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  return (
    <>
      {isLoading ? <Spinner color="failure" aria-label="Failure spinner example" /> : <Outlet />}
    </>
  );
}

export default App;
