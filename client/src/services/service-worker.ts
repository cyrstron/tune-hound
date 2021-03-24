export function registerServiceWorker(): void {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker is registered! ', registration.scope);
    })
    .catch(err => {
      console.log('Registration failed  ', err);
    });
}
