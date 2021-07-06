import React from 'react';
import { Jumbotron,Button,Form,Col } from 'react-bootstrap';

function ServicerTools(props) {
    if(props.CurrentUser.is_working === false)
    return(
        <container>
            <Button onClick={()=>props.setActive()}>Set working status to available</Button>
                <h5>Add additional service options</h5>
            <form onSubmit={(event)=> props.addServices(event)}>
                <input type="text" name="service" id="services" placeholder='Service'/>
                <input type="text" name="price" id="price" placeholder='price'/>
                <Button type='submit' size='sm' variant='dark'>Add Service</Button>
                    </form>
                <h5>Set your service distance</h5>
            <form onSubmit={(event)=> props.setDistance(event)}>
                <input type="text" name="distance" id="distance" placeholder='Distance'/>
                <Button type='submit' size='sm' variant='dark'>Set Distance</Button>
                </form>
        </container>
    )
    if(props.CurrentUser.is_working === true)
    return(
        <container>
            <Button onClick={()=>props.setInactive()}variant='danger'>Set working status to unavailable</Button>
                <h5>Add additional service options</h5>
            <form onSubmit={(event)=> props.addServices(event)}>
                <input type="text" name="service" id="services" placeholder='Service'/>
                <input type="text" name="price" id="price" placeholder='price'/>
                <Button type='submit' size='sm' variant='dark'>Add Service</Button>
                    </form>
                    
        </container>
    )
    
    return(
        null
        )
}
        export default ServicerTools;