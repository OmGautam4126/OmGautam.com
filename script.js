if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker registered'))
      .catch(err => console.error('⚠️ Service Worker failed:', err));
  });
}
// This is where you'll register service worker later
console.log("Website loaded successfully.");
