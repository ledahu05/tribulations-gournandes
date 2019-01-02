import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Layout from "../layout";
// import MarkerLayer from 'react-leaflet-marker-layer';

const position = { lng: 6.2694616, lat: 44.5381638 };
// const markers = [
//   {
//     position: { lng: -122.67344700000, lat: 45.522558100000 },
//     text: 'Voodoo Doughnut',
//   },
//   {
//     position: { lng: -122.67814460000, lat: 45.5225512000000 },
//     text: 'Bailey\'s Taproom',
//   },
//   {
//     position: { lng: -122.67535700000002, lat: 45.5192743000000 },
//     text: 'Barista'
//   },
//   {
//     position: { lng: -122.65596570000001, lat: 45.5199148000001 },
//     text: 'Base Camp Brewing'
//   }
// ];

// class ExampleMarkerComponent extends React.Component {

//   render() {
//     const style = {
//       border: 'solid 1px lightblue',
//       backgroundColor: '#333333',
//       borderRadius: '50%',
//       marginTop: '-5px',
//       marginLeft: '-5px',
//       width: '10px',
//       height: '10px'
//     };

//     return (
//       <div style={Object.assign({}, this.props.style, style)}></div>
//     );
//   }

// }

{/* <MarkerLayer
                            markers={markers}
                            longitudeExtractor={m => m.position.lng}
                            latitudeExtractor={m => m.position.lat}
                            markerComponent={ExampleMarkerComponent} /> */}
class Carte extends React.Component {
    render() {
        if (typeof window !== 'undefined') {
            return (
            <Layout location={this.props.location} title="Carte">
                    <div
                        style={{
                            height:"700px"
                        }}>
                        <Map center={position} zoom={13}
                            style={{
                                height:"700px"
                            }}>
                            <TileLayer
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            
                        </Map>
                    </div>
                    </Layout>
            );
        }
        return <h1>Loading...</h1>
    }
}

export default Carte;