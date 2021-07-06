import React, {useState} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api"
import googleApiKey from '../apikeys';
import  {Button}  from "react-bootstrap";
import axios from "axios";


function UserLanding(props) {
    const [selectedServicer, setSelectedServicer] = useState(null);

    const [selectedWindow, setSelectedWindow] = useState(null)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: googleApiKey
    });
    const selectedServices= props.selectedServices
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
if (props.CurrentUser.is_servicer === false)
    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom ={14}
            props={props}
            selectedServices={selectedServices}
            >
        {servicers.map(servicer => (
        <Marker
          key={servicer.id}
          position={{
            lat: servicer.lat,
            lng: servicer.lng
          }}
          // distance={ 
          //  props.GetDistance(servicer)
          // }
          onClick={() => {{
            setSelectedServicer(servicer)}
          props.GetDistance(servicer)}}
          icon={{
            url: 'https://www.svgrepo.com/show/130203/mower.svg',
            scaledSize: new window.google.maps.Size(35, 35)
          }}
        />
      ))}
      {selectedServicer && (
          <InfoWindow
          props={props}
          position={{
            lat: selectedServicer.lat,
            lng: selectedServicer.lng
          }}
          onCloseClick={()=> {
        setSelectedServicer(null)
        setSelectedWindow(null)
        props.HandleServClose()}
        }>
              <div>
                  <h3>{selectedServicer.firstName}</h3><br/>
                  Rating:<h5>{selectedServicer.overall_rating}/5</h5>
                  Service Range:<h5>{selectedServicer.service_distance} mi</h5> 
                  Distance:<h5>{props.distanceFromServicer} mi</h5>
                  <Button variant="success" onClick={() => {
                    props.getSelectedServicer(selectedServicer)
                    setSelectedWindow(selectedServicer)}
                  }>Book Appointment</Button>
              </div>
          </InfoWindow>
      )}
            </GoogleMap>
        </div>
    )
    return (
      null
    )
}
export default UserLanding;