import React from 'react';
import {Table, Button,Container} from 'react-bootstrap'
import './CurrentUserDetail.css'

function CurrentUserDetail(props) {
    const renderedAppointments = (Appointment) => {
        if(Appointment.status === "Active")
        return(
            <tr key={Appointment.id}
            >
                <td><h4 style={{color:"green"}}>{Appointment.customerName}</h4></td>
                <td><h4 style={{color:"green"}}>{Appointment.servicerName}</h4></td>
                <td><h4 style={{color: "green"}}>{Appointment.status}</h4></td>
                <td><Button key={Appointment.id}size='sm' variant='success' onClick={() =>{props.CompleteAppointment(Appointment)}}>Complete</Button> <Button size='sm' variant='danger'>Cancel</Button></td>
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
            <div><container>
                <Table striped bordered hover variant='dark' size='sm'>
                {props.Weather.map(renderedForecast)}
                </Table>
            </container>
            <h1>Appointments:</h1>
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
                {props.Appointments.map(renderedAppointments)}
            </tbody>
        </Table>
            </div>
    )
    return(
        null
    )
}
export default CurrentUserDetail