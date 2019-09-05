import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { getLatLngCenter } from "../../../utils/map-center";

class MapContainer extends Component {
    componentDidUpdate = () => {
        this.loadMap(); // call loadMap function to load the google map
    };

    componentDidMount = () => {
        this.loadMap(); // call loadMap function to load the google map
    };

    loadMap() {
        if (this.props && this.props.google) {
            // checks to make sure that props have been passed
            const { google } = this.props; // sets props equal to google
            const maps = google.maps; // sets maps to google maps props

            const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
            const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

            const mapCenter = getLatLngCenter(this.props.locations);
            const OFFSET = 0.15;

            const mapConfig = Object.assign(
                {},
                {
                    center: mapCenter.length
                        ? { lat: mapCenter[0], lng: mapCenter[1] + OFFSET }
                        : { lat: 37.8338026, lng: -122.2591576 + OFFSET },
                    zoom: 10, // sets zoom. Lower numbers are zoomed further out.
                    mapTypeId: "roadmap" // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
                }
            );

            this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

            // ==================
            // ADD MARKERS TO MAP
            // ==================
            this.props.locations.forEach(location => {
                // iterate through locations saved in state
                if (location.hasOwnProperty("location")) {
                    new google.maps.Marker({
                        // creates a new Google maps Marker object.
                        position: {
                            lat: location.location[1],
                            lng: location.location[0]
                        }, // sets position of marker to specified location
                        map: this.map, // sets markers to appear on the map we just created on line 35
                        title: location.address // the title of the marker is set to the name of the location
                    });
                }
            });
        }
    }

    render() {
        const style = {
            // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
            width: "100vw", // 90vw basically means take up 90% of the width screen. px also works.
            height: "100vh" // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
        };

        return (
            // in our return function you must return a div with ref='map' and style.
            <div ref="map" style={style}>
                loading map...
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locations: state.listings
    };
}

export default connect(mapStateToProps)(MapContainer);
