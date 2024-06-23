import { useContext, useState, useLayoutEffect } from 'react';
import { UserContext } from './context/userContext';
import { Outlet } from 'react-router-dom';
import { axios_user } from './axios_config/axiosConfig';
import { PUBLIC_VAPID_KEY } from './constants/public_key';
import {urlBase64ToUint8Array} from './utility/urlBase64ToUint8Array '
import axios from 'axios'
import LazyLoading from './UIComponents/LazyLoading';

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
    // Fetch user information
    fetchCurrentUser();

    // Request notification permission
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().catch((error) => {
        console.log(error);
      });
    }

    // Register service worker and handle push notifications
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/worker.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);

          swReg.pushManager.getSubscription()
            .then(subscription => {
              if (!subscription) {
                subscribeUser(swReg);
              } else {

              }
            });
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
    }
  }, []);

  const subscribeUser = async (swReg) => {
    try {
      const publicVapidKey = PUBLIC_VAPID_KEY;

      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await axios.post('http://localhost:8000/challenge/notification/subscribe', subscription)
        .then(() => {
          console.log('Successfully subscribed to push notifications');
        })
        .catch((err) => {
          console.log(err)
          console.log("Couldn't subscribe to push notifications");
        });
    } catch (err) {
      console.error('Failed to subscribe user: ', err);
    }
  };

  return (
    <>
      {isLoading ? <LazyLoading/> : <Outlet />}
    </>
  );
}

export default App;
