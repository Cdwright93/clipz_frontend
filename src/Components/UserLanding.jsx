import React, {useState} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    infoWindow,
    InfoWindow,
} from "@react-google-maps/api"
import googleApiKey from '../apikeys';
import  Button  from "react-bootstrap/Button";


function UserLanding(props) {
    const [selectedServicer, setSelectedServicer] = useState(null);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleApiKey
    });
    const servicers = props.Servicers
    const center = {
        lat: props.CurrentUser.lat,
        lng: props.CurrentUser.lng
    }
    const mapContainerStyle = {
        width: '60vw',
        height: '70vh'
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
        {servicers.map(servicer => (
        <Marker
          key={servicer.id}
          position={{
            lat: servicer.lat,
            lng: servicer.lng
          }}
          onClick={() => {
            setSelectedServicer(servicer);
          }}
          icon={{
            url: 'https://www.svgrepo.com/show/130203/mower.svg',
            scaledSize: new window.google.maps.Size(35, 35)
          }}
        />
      ))}
      {selectedServicer && (
          <InfoWindow 
          position={{
            lat: selectedServicer.lat,
            lng: selectedServicer.lng
          }}
          onCloseClick={()=> {
        setSelectedServicer(null);
        }}
          >
              <div>
                  <h3>{selectedServicer.firstName}</h3><br/>
                  rating:<h5>{selectedServicer.overall_rating}</h5>
                  <Button variant="success">click me for services</Button>
              </div>
          </InfoWindow>
      )}
            </GoogleMap>
        </div>
    )
}
export default UserLanding;