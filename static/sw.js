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

  self.addEventListener('push', function(event) {
    console.log('Push Notification received', event);
  
    var data = {title: 'Nouvel article!', content: 'Un nouvel article vient d\'être publié!', openUrl:'/'};
  
    if (event.data) {
      data = JSON.parse(event.data.text());
    }
  
    var options = {
      body: data.content,
      icon: '/logos/logo-96.png',
      data: {
        url: data.openUrl
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  //