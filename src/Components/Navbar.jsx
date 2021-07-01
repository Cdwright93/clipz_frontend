import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import './Navbar.css'

function NavBar() {
    return(
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home"><img src="https://fontmeme.com/permalink/210629/c4febaea8b95d2a4493dbd70eb396638.png" alt="tiktok-font" border="0"/></Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link className="navitem"href="#home">Home</Nav.Link>
          <Nav.Link className="navitem"href="#features">Look For Clipperz</Nav.Link>
          <Nav.Link className="navitem"href="#pricing">Settings</Nav.Link>
        </Nav>
        </Navbar>
    )
    
}
export default NavBar;