import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import Notification from 'react-web-notification/lib/components/Notification';

//allow react dev tools work
if(typeof window !== 'undefined') {
  window.React = React;
}

const VAPID_PUBLIC_KEY = 'BGAqrXqiYcDy1whpBm3bqsaQcKRu4nsHEiVMtcNEYKUjCYUnmCXkSLC9MWkqiWJuHX-pGH2lUNxsfAMufZYj5KA';
const FIREBASE_URL = 'https://pushcontainer.firebaseio.com';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function  displayConfirmNotification () {
  
  
  if(typeof navigator !== 'undefined') {
    if ('serviceWorker' in navigator) {
  
      navigator.serviceWorker.addEventListener('push', function(event) {
      });

      var options = {
        body: 'Vous êtes abonné à mon service de notification!',
        icon: '/logos/logo-96.png',
        dir: 'ltr',
        lang: 'fr-FR', // BCP 47,
        vibrate: [100, 50, 200],
        tag: 'confirm-notification',
        renotify: true,
      };
  
      navigator.serviceWorker.ready
        .then(function(swreg) {
  
          swreg.showNotification('Abonnement enregistré!', options);
  
        }).catch(function(err) {
          console.log(err);
        });
    }
  }
}

function configurePushSub() {
  if ((typeof navigator === 'undefined') || !('serviceWorker' in navigator)) {
    return;
  }

  var reg;
  navigator.serviceWorker.ready
    .then(function(swreg) {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(function(sub) {
      if (sub === null) {
        // Create a new subscription
        
        var convertedVapidPublicKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        // We have a subscription
      }
    })
    .then(function(newSub) {
      return fetch(`${FIREBASE_URL}/subscriptions.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newSub)
      })
    })
    .then(function(res) {
      if (res.ok) {
        displayConfirmNotification();
      }
    })
    .catch(function(err) {
      console.log(err);
    });

    navigator.serviceWorker.addEventListener('push', function(event) {
      console.log('Push Notification received', event);
    });
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

class NotificationButton extends Component {
    constructor(props) {
      super(props);
      this.loadSw();
    }  
      handleButtonClick = () => {
        
        Notification.requestPermission(function(result) {
            console.log('User Choice', result);
            if (result !== 'granted') {
            console.log('No notification permission granted!');
            } else {
              configurePushSub();
              //displayConfirmNotification();
            }
        });
          
          
           
   
      }


  loadSw() {
    if (typeof navigator !== 'undefined') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(function () {
            console.log('Service worker registered!');
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }



  render() {
 
    const buttonClass = (typeof window !== 'undefined' && 'Notification' in window) ? 'inline-block' : 'hidden';
    
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.handleButtonClick} className={buttonClass}>
        Je m'abonne
        </Button>        
      </div>
    );
  }
}
  
export default withStyles(styles)(NotificationButton);
  