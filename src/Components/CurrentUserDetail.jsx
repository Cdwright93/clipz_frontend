import React from 'react';
import {Table, Button} from 'react-bootstrap'

function CurrentUserDetail(props) {
    const Appointments = props.Appointments
    const renderedAppointments = (Appointment) => {
        if(Appointment.status === "Active")
        return(
            <tr key={Appointment.id}>
                <td><h4 style={{color:"green"}}>{Appointment.customerName}</h4></td>
                <td><h4 style={{color:"green"}}>{Appointment.servicerName}</h4></td>
                <td><h4 style={{color: "green"}}>{Appointment.status}</h4></td>
                <td><Button key={Appointment.id}size='sm' variant='success' onClick={(key) =>{props.CompleteAppointment(key)}}>Complete</Button> <Button size='sm' variant='danger'>Cancel</Button></td>
            </tr>
        )
    }
        if(props.Appointments.length > 0)
    return(
        <div><h1>Appointments:</h1>
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
        {Appointments.map(renderedAppointments)}
    </tbody>
</Table>
        </div>
    )
    return(
        null
    )
}
export default CurrentUserDetail