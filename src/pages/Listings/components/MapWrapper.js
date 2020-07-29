import React, { Component } from "react";
import GoogleApiHOC from "../../../components/GoogleApiHOC";
import MapContainer from "./MapContainer";

class MapWrapper extends Component {
    render() {
        return <div>{<MapContainer google={this.props.google} />}</div>;
    }
}

export default GoogleApiHOC(MapWrapper);
