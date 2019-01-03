import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


//const position = { lng: 6.2694616, lat: 44.5381638 };
export default class PostMap extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {latitude, longitude, title} = this.props;
        const position = [latitude, longitude];
        if (typeof window !== 'undefined') {
            return (
                    <div
                        style={{
                            height:"400px"
                        }}>
                        <Map center={position} zoom={13}
                            style={{
                                height:"400px"
                            }}>
                            <TileLayer
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>
                                    {title}
                                </Popup>
                            </Marker>
                        </Map>
                    </div>
            );
        }
        return null;
  }
}





