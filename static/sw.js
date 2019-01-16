self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
  });
  
  self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ...', event);
    return self.clients.claim();
  });
  
  self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching something ...', event);
    event.respondWith(fetch(event.request));
  });

  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    console.log(notification);
    notification.close();
    
  });
  
  self.addEventListener('notificationclose', function(event) {
    console.log('Notification was closed', event);
  });