export async function  unregisterServiceWorkers() {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        try {
          await registration.unregister();
          console.log('Service Worker unregistered:', registration);
        } catch (err) {
          console.error('Failed to unregister Service Worker:', err);
        }
      }
    }
  };
  