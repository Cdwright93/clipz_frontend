import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './ServicerDetail.css';



function ServicerDetail(props) {
    if(props.SelectedServices.length > 0)
    return(
        <Jumbotron>
                <h1>{props.SelectedServicer.firstName}</h1><p>rating: {props.SelectedServicer.overall_rating}</p>
                <p>The Clipper offers the following services:</p>
                {props.SelectedServices.map(service => (
                <table
            key={service.id}
            //   onClick={() => {
            //     setSelectedServicer(servicer);
            //   }}
            >{service.name}<br/>
            ${service.price}</table>
        ))}
        <Button onClick={(event) =>{props.MakeAppointment(event)}}>Book it!</Button>
            </Jumbotron>
        )
        return(
            null
        )
}
export default ServicerDetail;