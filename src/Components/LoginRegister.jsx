import React from 'react';
import { Form, Container, Button, Row } from 'react-bootstrap';

function LoginRegister(props) {
    if (props.CurrentUser.length === 0)
        return(
        <div>
    <h2>Welcome to Clipz! sign in or register to get service!</h2>
    <Container fluid="sm">
    <Row>
  <Form onSubmit = {(event) => props.SignInUser(event)}>
  <Form.Group controlId="formgroupusername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="Username" placeholder="Username"name="username"/>
  </Form.Group>
  <Form.Group controlId="formgrouppassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password"/>
  </Form.Group>
  <Button variant="outline-success" type="submit">Log In</Button>
</Form>
    </Row>
    <p>Not registered? Sign up!</p>
  </Container>

  <Container fluid="md">
    <Row>
  <Form onSubmit ={(event) => props.SignUpUser(event)}>
  <Form.Group controlId="formGroupFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="FirstName" placeholder="First name"name="firstname"/>
  </Form.Group>
  <Form.Group controlId="formGroupLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="LastName" placeholder="Last name"name="lastname"/>
  </Form.Group>
  <Form.Group controlId="formGroupUsername">
    <Form.Label>Username</Form.Label>
    <Form.Control type="Username" placeholder="Username"name="username"/>
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password"/>
  </Form.Group>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Password</Form.Label>
    <Form.Control type="email" placeholder="example@example.com" name="email"/>
  </Form.Group>
  <Form.Group controlId="formGroupPhoneNumber">
    <Form.Label>Phone number</Form.Label>
    <Form.Control type="phonenumber" placeholder="000-000-0000" name="phonenumber"/>
  </Form.Group>
  <Button variant="outline-success" type="submit">Sign Up!</Button>
</Form>
    </Row>
  </Container>
        </div>
    )
    return(
        <div>

        </div>
    )
}

export default LoginRegister;