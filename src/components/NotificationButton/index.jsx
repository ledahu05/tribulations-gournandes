import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import Notification from 'react-web-notification/lib/components/Notification';

//allow react dev tools work
if(window) {
  window.React = React;
}



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function  displayConfirmNotification () {
  console.log('displayConfirmationNotification');
  console.log('coucou2');
  if ('serviceWorker' in navigator) {
    console.log('serviceWorker in navigator');
    var options = {
      body: 'You successfully subscribed to our Notification service!',
      icon: '/logos/logo-192.png',
      image: '/logos/logo-192.png',
      dir: 'ltr',
      lang: 'fr-FR', // BCP 47,
      vibrate: [100, 50, 200],
      badge: '/logos/logo-192.png',
      tag: 'confirm-notification',
      renotify: true,
    };
    console.log('coucou 1');
    console.log(navigator.serviceWorker);
    navigator.serviceWorker.ready
      .then(function(swreg) {
        console.log('coucou');
        console.log(swreg);
        console.log('serviceWorkerRegistration retrieved', swreg);
        swreg.showNotification('Successfully subscribed (from SW)!', options);
        console.log('notification sent');
      }).catch(function(err) {
        console.log(err);
      });
  }
}

class NotificationButton extends Component {
    constructor(props) {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(function () {
            console.log('Service worker registered!');
          })
          .catch(function(err) {
            console.log(err);
          });
      }
      super(props);
    }

  
    
      handleButtonClick = () => {
        
        Notification.requestPermission(function(result) {
            console.log('User Choice', result);
            if (result !== 'granted') {
            console.log('No notification permission granted!');
            } else {
              displayConfirmNotification();
            }
        });
          
          
           
   
      }


  render() {
 
    const buttonClass = ('Notification' in window) ? 'inline-block' : 'hidden';
    
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
  