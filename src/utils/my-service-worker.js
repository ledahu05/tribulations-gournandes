
  importScripts("workbox-v3.6.3/workbox-sw.js");
  workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

  workbox.skipWaiting();
  workbox.clientsClaim();

  
  // The plugin will pass the files to cache here
  workbox.precaching.precacheAndRoute([])

  self.addEventListener('notificationclick', function(event) {
    var notification = event.notification;
    var action = event.action;
  
    console.log(notification);
  
    if (action === 'confirm') {
      console.log('Confirm was chosen');
      notification.close();
    } else {
      console.log(action);
      event.waitUntil(
        clients.matchAll()
          .then(function(clis) {
            var client = clis.find(function(c) {
              return c.visibilityState === 'visible';
            });
  
            if (client !== undefined) {
              client.navigate(notification.data.url);
              client.focus();
            } else {
              clients.openWindow(notification.data.url);
            }
            notification.close();
          })
      );
    }
  });
  
  self.addEventListener('notificationclose', function(event) {
    console.log('Notification was closed', event);
  });

  self.addEventListener('push', function(event) {
    console.log('Push Notification received', event);
  
    var data = {title: 'Nouvel article!', content: 'Un nouvel article vient d\'être publié!', openUrl:'/'};
  
    // if (event.data) {
    //   data = JSON.parse(event.data.text());
    // }
  
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