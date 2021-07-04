import './App.css'
import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './Components/Navbar';
import {Container, Row, Button} from 'react-bootstrap';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister';
import Dashboard from './Components/Dashboard';
import ServicerDetail from './Components/ServicerDetail';
import CurrentUserDetail from './Components/CurrentUserDetail';

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
const api4 = axios.create({
  baseURL:'https://localhost:44394/api/users/all'
})
const api5 = axios.create({
  baseURL:'https://localhost:44394/api/services'
})
const api6 = axios.create({
  baseURL:'https://localhost:44394/api/appointments'
})

class App extends Component{
  constructor(){
    super();
    this.state = {
      CurrentUser: [],
      Servicers: [],
      SelectedServices: [],
      SelectedServicer:[],
      Appointments:[],
    }
  }
  componentDidMount(){
    this.getUser(token)
    this.getAllServicers()
  }
  getUser = async (token) => {
    let data = await api1.get('/', {headers:{ "Authorization" : `Bearer ${token}`}}).then(({ data }) => data)
    this.setState({ CurrentUser : data })
    this.getAppointments(data)
    console.log(data)
  }
  getAppointments = async (data) => {
    let query = await api6.get(`/${data.id}`,).then(({ data }) => data)
    this.setState({ Appointments : query })
    console.log(query)
  }
  getSelectedServicer = async (props) => {
    let data = await api5.get(`/${props.id}`,).then(({ data }) => data)
    this.setState({SelectedServices : data})
    this.setState({SelectedServicer: props})
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
      window.location.reload()
      }
  getAllServicers = async () => {
    let data = await api4.get('/').then(({ data }) => data)
    this.setState({ Servicers : data })
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
  HandleServClose = async () => {
    this.setState({SelectedServicer : [] })
    this.setState({SelectedServices : [] })
  }
  MakeAppointment = async (event) => {
    event.preventDefault()
    let res = await api6.post('/',{ServicerId:this.state.SelectedServicer.id,
    CustomerId:this.state.CurrentUser.id,
    CustomerName:this.state.CurrentUser.firstName,
    ServicerName:this.state.SelectedServicer.firstName,
    cost:"20 dollars change this soon",
    Status:"Active",
  })
    console.log(res)
    window.location.reload()
  }
  CompleteAppointment = async (key) => {
    const address = `https://localhost:44394/api/appointments/${key}/`;
    const body = 
    [
      {
        "path": "status",
        "op": "replace",
        "value": "Complete"
      }
    ];
    let res = await axios.patch(address, body)
    console.log(res)
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
            <CurrentUserDetail 
              Appointments={this.state.Appointments}
              CompleteAppointment={this.state.CompleteAppointment}
            />
          </Row>
          <Row>
              <LoginRegister 
                CurrentUser = {this.state.CurrentUser}
                SignInUser={this.SignInUser}
                SignUpUser={this.SignUpUser}
                getUser={this.getUser} 
                token={this.token}
              />
              <Dashboard 
              CurrentUser={this.state.CurrentUser} 
              SelectedServices={this.state.SelectedServices}
              updateLat={this.updateLat}
              updateLng={this.updateLng}
              Servicers={this.state.Servicers}
              getSelectedServicer={this.getSelectedServicer}
              HandleServClose={this.HandleServClose}
              />
          </Row>
        </Container>
        <div>
          <Container>
            <ServicerDetail
            SelectedServices={this.state.SelectedServices}
            SelectedServicer={this.state.SelectedServicer}
            MakeAppointment={this.MakeAppointment}
            />
          </Container>
        </div>
      </div>

  )
  }
}

export default App;