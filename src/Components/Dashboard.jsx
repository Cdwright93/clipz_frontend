import React from 'react';
import { Container } from 'react-bootstrap';
import PlacesAutocomplete,{
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";
import UserLanding from './UserLanding';


function Dashboard(props) {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null
    });


    const handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0])
      setAddress(value);
      setCoordinates(latLng);
      props.updateLat(latLng);
      props.updateLng(latLng);
    };

  
        if(props.CurrentUser&&props.CurrentUser.lat===0.0)
            return(
                <Container>
                    <div>
                        <h3>Welcome! {props.CurrentUser.firstName}</h3>
                        <p>Please enter your address:</p>
                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={handleSelect}
                            props={props}
                        >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <p>Latitude: {coordinates.lat}</p>
                    <p>Longitude: {coordinates.lng}</p>
                <input {...getInputProps({ placeholder: "Type address" })} />
                <div>
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map(suggestion => {
                    const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
        </div>
    </Container>
    )
    if(props.CurrentUser.lng)
    return(
    <div>
        <h1>you have done it jeffrey</h1>
        <Container fluid='sm'>
            <UserLanding CurrentUser={props.CurrentUser} Servicers={props.Servicers}/>
        </Container>
    </div>
        )
    else
    return(
        null
    )
}
export default Dashboard;