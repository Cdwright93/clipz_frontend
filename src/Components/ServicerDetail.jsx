import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './ServicerDetail.css';



function ServicerDetail(props) {
    if(props.distanceFromServicer < props.SelectedServicer.service_distance&&props.SelectedServicer.is_working==true)
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
    if (props.distanceFromServicer > props.SelectedServicer.service_distance)
    return(
        <Jumbotron>
            <h1 style={{color:'blue'}}>Sorry, you are not in this Clipper's range.</h1>
        </Jumbotron>
    )
    if(props.distanceFromServicer < props.SelectedServicer.service_distance&&props.SelectedServicer.is_working==false)
    return(
        <Jumbotron>
        <h1 style={{color:'blue'}}>Sorry, This Clipper is not currently taking appointments.</h1>
        </Jumbotron>
    )
        return(
            null
        )
}
export default ServicerDetail;