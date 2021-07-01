import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    infoWindow,
} from "@react-google-maps/api"
import googleApiKey from '../apikeys';

const libraries = ["places"]
const mapContainerStyle = {
    width: '80vw',
    height: '70vh'
}

function UserLanding(props) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleApiKey,libraries
    });
    const center = {
        lat: props.CurrentUser.lat,
        lng: props.CurrentUser.lng
    }
    
    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps"

    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom ={14}
            props={props}
            >

            </GoogleMap>
        </div>
    )
}
export default UserLanding;