import './App.css'
import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './Components/Navbar';
import {Container, Row, Col} from 'react-bootstrap';
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
      Weather:[],
      distanceFromServicer: null,
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
    this.getWeather(data)
    console.log(data)
  }
  getWeather = async (props) => {
    let query = axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.lng}&exclude=current,minutely,hourly&units=imperial&appid=8badd326ebb24a69942696dd54245171`)
    this.setState({Weather:(await query).data.daily})
    console.log((await query).data.daily)
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
    let data1 = await api4.get('/').then(({ data }) => data)
    this.setState({ Servicers : data1 })
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
    this.setState({distanceFromServicer: null})
  }
  GetDistance = async (servicer) => {
    let data = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.CurrentUser.lat},${this.state.CurrentUser.lng}&destinations=${servicer.lat}%2C${servicer.lng}&key=AIzaSyA24wquj_memv88Dh_q4QzlFGQ_8k969c8`)
    let distance = parseFloat(data.data.rows[0].elements[0].distance.text)
    this.setState({distanceFromServicer: distance})
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
  CompleteAppointment = async (appointment) => {
    const address = `https://localhost:44394/api/appointments/${appointment.appointmentId}/`;
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
        <Container fluid="sm">
          <Row>
            <Col>
              <LoginRegister 
                CurrentUser = {this.state.CurrentUser}
                SignInUser={this.SignInUser}
                SignUpUser={this.SignUpUser}
                getUser={this.getUser} 
                token={this.token}
              />
            </Col>
              <Dashboard 
              CurrentUser={this.state.CurrentUser} 
              SelectedServices={this.state.SelectedServices}
              updateLat={this.updateLat}
              updateLng={this.updateLng}
              Servicers={this.state.Servicers}
              getSelectedServicer={this.getSelectedServicer}
              HandleServClose={this.HandleServClose}
              GetDistance={this.GetDistance}
              distanceFromServicer={this.state.distanceFromServicer}
              />
          <Row>
            <CurrentUserDetail 
              Appointments={this.state.Appointments}
              CompleteAppointment={this.CompleteAppointment}
              CurrentUser={this.state.CurrentUser}
              Weather={this.state.Weather}
            />
          </Row>
          </Row>
        </Container>
        <div>
          <Container>
            <ServicerDetail
            SelectedServices={this.state.SelectedServices}
            SelectedServicer={this.state.SelectedServicer}
            MakeAppointment={this.MakeAppointment}
            distanceFromServicer={this.state.distanceFromServicer}            
            />
          </Container>
        </div>
      </div>

  )
  }
}

export default App;