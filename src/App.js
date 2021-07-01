import './App.css'
import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './Components/Navbar';
import {Container, Row} from 'react-bootstrap';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister';
import Dashboard from './Components/Dashboard';

const token = localStorage.getItem('data')
const api1 = axios.create({
  baseURL:'https://localhost:44394/api/users/user'
})
const api2 = axios.create({
  baseURL: 'https://localhost:44394/api/authentication/login'
})
const api3 = axios.create({
  baseURL: 'https://localhost:44394/api/authentication'
})


class App extends Component{
  constructor(){
    super();
    this.state = {
      CurrentUser: [],
      CurrentLocation: [],
    }
  }
  componentDidMount(){
    this.getUser(token)
  }
  getUser = async (token) => {
    let data = await api1.get('/', {headers:{ "Authorization" : `Bearer ${token}`}}).then(({ data }) => data)
    this.setState({ CurrentUser : data })
    console.log(data)
  }
  updateLat = async (latLng) => {
    const address = 'https://localhost:44394/api/users/update/';
    const apitoken = localStorage.getItem('data')
    const config = {
      headers:{ Authorization : `Bearer ${apitoken}`}
    };

    const body = [
      {
        "path": "lat",
        "op": "replace",
        "value": latLng.lat
      }
  ];
    let res = await axios.patch(address, body, config)
    console.log(res)
    }
    updateLng = async (latLng) => {
      const address = 'https://localhost:44394/api/users/update/';
      const apitoken = localStorage.getItem('data')
      const config = {
        headers:{ Authorization : `Bearer ${apitoken}`}
      };
  
      const body = [
        {
          "path": "lng",
          "op": "replace",
          "value": latLng.lng
        }
    ];
      let res = await axios.patch(address, body, config)
      console.log(res)
      }
  SignUpUser = async (event) => {
    event.preventDefault()
    let res = await api3.post('/',{firstname:event.target.firstname.value,
    lastname:event.target.lastname.value,
    username:event.target.username.value,
    password:event.target.password.value,
    email:event.target.email.value,
    phonenumber:event.target.phonenumber.value,
  })
    localStorage.setItem('data', res.data.token)
    this.getUser(token)
    window.location.reload()
  }
  SignInUser = async (event) => {
    event.preventDefault()
    let res = await api2.post('/',{username:event.target.username.value,
    password:event.target.password.value,})
    localStorage.setItem('data', res.data.token)
    this.getUser(token)
    window.location.reload()
  }
  render(){
  return(

      <div>
      <NavBar />
        <Container>
          <Row>

              <LoginRegister CurrentUser = {this.state.CurrentUser} SignInUser={this.SignInUser} SignUpUser={this.SignUpUser} getUser={this.getUser} token={this.token}/>
              <Dashboard CurrentUser={this.state.CurrentUser} updateLat={this.updateLat} updateLng={this.updateLng}/>
          </Row>
        </Container>
      </div>

  )
  }
}

export default App;