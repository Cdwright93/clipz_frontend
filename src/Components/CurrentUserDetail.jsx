import React from 'react';
import {Table, Button,Container} from 'react-bootstrap'
import './CurrentUserDetail.css'
import ServicerTools from './ServicerTools';

function CurrentUserDetail(props) {
    const renderedServicerAppointments = (Appointment) => {
        if(Appointment.status === "Active")
        return(
            <tr key={Appointment.id}
            >
                <td><h4 style={{color:"green"}}>{Appointment.customerName}</h4></td>
                <td><h4 style={{color:"green"}}>{Appointment.servicerName}</h4></td>
                <td><h4 style={{color: "green"}}>{Appointment.status}</h4></td>
                <td><Button key={Appointment.id}size='sm' variant='success' onClick={() =>{props.CompleteAppointment(Appointment)}}>Complete</Button>
                <Button key={Appointment.id}size='sm' variant='danger' onClick={() =>{props.RemoveAppointment(Appointment)}}>Cancel</Button>
                </td>
            </tr>
        )
    }
    const renderedCustomerAppointments = (Appointment) => {
        if(Appointment.status === "Complete")
        return(
            <tr key={Appointment.id}
            >
                <td><h4 style={{color:"green"}}>{Appointment.customerName}</h4></td>
                <td><h4 style={{color:"green"}}>{Appointment.servicerName}</h4></td>
                <td><h4 style={{color: "green"}}>{Appointment.status}</h4></td>
                <td><Button key={Appointment.id}size='sm' variant='success' onClick={() =>{{props.ReviewClipperGood(Appointment)}props.RemoveAppointment(Appointment)}}>Good</Button>
                <Button key={Appointment.id}size='sm' variant='danger' onClick={() =>{{props.ReviewClipperBad(Appointment)}props.RemoveAppointment(Appointment)}}>Bad</Button>
                </td>
            </tr>
        )
    }
        const renderedForecast = (Weather) => {
            let index = 0
        return(
            <thead>
            <tr>
                <th>Temperature</th>
                <th>Description</th>
            </tr>
            <tr key ={Weather.id}>
                <td><h4 style={{color:"green"}}>{Weather.temp.day}</h4></td>
                <td><h4 style={{color:"green"}}>{Weather.weather[index].main}</h4></td>   
            </tr>
            </thead>
        )
    }
        if(props.CurrentUser.is_servicer === true)
        return(
            <div>
            <header><h2>Clipper Tools</h2></header>
            <ServicerTools
            CurrentUser={props.CurrentUser} 
            addServices={props.addServices} 
            setActive={props.setActive}
            setInactive={props.setInactive}
            setDistance={props.setDistance}
            />
            <h4>Rating:{props.CurrentUser.overall_rating}</h4>
            <h4>Appointments:</h4>
            <Table striped bordered hover variant='dark'size="sm">
            <thead>
            <tr>
            <th>Customer</th>
            <th>Clipper</th>
            <th>Status</th>
            <th>Options</th>
            </tr>
            </thead>
            <tbody>
                {props.Appointments.map(renderedServicerAppointments)}
            </tbody>
            </Table>
                    <h4>This Weeks Forecast</h4>
                    <Table striped bordered hover variant='dark' size='sm'>
                   {props.Weather.map(renderedForecast)}
                   </Table>     
                </div>
    )
    if(props.CurrentUser.is_servicer === false)
    return(
        <div>
        <header><h2>Customer Tools</h2></header>
        <Button onClick={()=> props.becomeClipper()}variant='success'>Become a Clipper!</Button>
        <h4>Appointments:</h4>
        <Table striped bordered hover variant='dark'size="sm">
        <thead>
        <tr>
        <th>Customer</th>
        <th>Clipper</th>
        <th>Status</th>
        <th>Rate it!</th>
        </tr>
        </thead>
        <tbody>
            {props.Appointments.map(renderedCustomerAppointments)}
        </tbody>
        </Table>
        </div>
        )
    return(
        null
    )
}
export default CurrentUserDetail