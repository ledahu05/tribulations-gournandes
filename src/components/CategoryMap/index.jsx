import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import {geolocated} from 'react-geolocated';
import { Link } from "gatsby";
// import icon from './google-maps-marker.svg';
//const position = { lng: 6.2694616, lat: 44.5381638 };
class CategoryMap extends Component {

    constructor(props) {
        super(props);
        this.markers = props.markers;
        //single or multiple marker
        //center of the map
        //markers {coordinates, title, destination}
    }

    render() {
        if(this.markers == null) return null;
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
        
        if (typeof window !== 'undefined') {
            return (
                    <div
                        style={{
                            height:"400px"
                        }}>
                        <Map center={userPosition} zoom={9}
                            style={{
                                height:"400px",
                                zIndex:"0",
                            }}>
                            <TileLayer
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                           
                            { userPosition != null &&
                            <Marker position={userPosition}>
                                <Popup>
                                    Je suis ici
                                </Popup>
                            </Marker>
                            }
                            {this.getMarkers(icon)}
                  
                        </Map>
                    </div>
            );
        }
        return null;
  }

  getMarkers = (icon) => {
    if(icon == null) return null;

    return this.markers.map(marker => {
        return ( 
            <Marker key={marker.title} icon={icon} position={marker.coordinates}>
                <Popup><Link to={marker.path}>{marker.title}</Link></Popup>   
            </Marker>        
        );
    });
  } 
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(CategoryMap);





