import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {geolocated} from 'react-geolocated';
// import icon from './google-maps-marker.svg';
//const position = { lng: 6.2694616, lat: 44.5381638 };
class PostMap extends Component {

    constructor(props) {
        super(props);
        //single or multiple marker
        //center of the map
        //markers {coordinates, title, destination}
    }

    render() {
        let icon = null;
        if(typeof window !== 'undefined') {
            const L = require('leaflet');
            icon = L.icon({
                iconUrl: require('./g8.png'),
                iconSize: [25,41],
                iconAnchor: null,
                popupAnchor: [-3, -26],
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            });    
        }
        
        

        const userPosition = (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) 
            ? [this.props.coords.latitude, this.props.coords.longitude]
            : null;
        //console.log('userPosition', userPosition);
        const {latitude, longitude, title} = this.props;

        const gMapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&zoom=12`;
        const position = [latitude, longitude];
        //console.log('item position', position);
        if (typeof window !== 'undefined') {
            return (
                    <div
                        style={{
                            height:"400px"
                        }}>
                        <Map center={position} zoom={10}
                            style={{
                                height:"400px"
                            }}>
                            <TileLayer
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {icon && 
                                <Marker icon={icon} position={position}>
                                    <Popup><a href={gMapUrl} target="_blank">{title}</a></Popup>   
                                </Marker>
                            }
                            { userPosition != null &&
                            <Marker position={userPosition}>
                                <Popup>
                                    Je suis ici
                                </Popup>
                            </Marker>
                            }
                  
                        </Map>
                    </div>
            );
        }
        return null;
  }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(PostMap);





