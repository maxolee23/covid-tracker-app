import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import {fetchData} from './api';
import Navbar  from './components/Navbar';
// import About from './components/About'
// import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import { spacing, palette } from '@material-ui/system';


import { Box, Button } from '@material-ui/core';

class App extends Component {

  state = {
    data: {}, 
    country: '',
    showBox: false
    // themes: createMuiTheme({
    //   palette: {
    //     type: 'dark'
    //     // background: '#424242',
    //     // text: 'primary'
    //   },
    // }),
    // lightTheme: createMuiTheme({
    //   palette: {
    //     type: 'light'
    //   }
    // })
  }
  //test 

  toggleBox = () => {
    this.setState({showBox: !this.state.showBox})
  }


  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country })
  }

  btnStyle = {
    textAlign: 'center'
  }
  // lightStyle = {
  //   backgroundColor: 'rgb(250, 250,250)'
  // }

  // darkStyle = {
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)'
  // }
  render(){
    const {data, country } = this.state;
  return (
    <div className="App">
    <Navbar/>
    {this.state.showBox ?
    <div style={this.btnStyle}>
    <Button color="primary" onClick={() => this.toggleBox()}>Hide</Button>
    </div>
    : 
    <div style={this.btnStyle}>
    <Button color="primary" onClick={() => this.toggleBox()}>About</Button>
    </div>
  }
    {this.state.showBox ? 
    <Box color="text.secondary" >
      <p>COVID-19, or Corona virus, is a very current pandemic that infects hundreds of people daily. Symptoms include fever, coughing, and shortness of breath. It is primarily spread from person to person, and people can become infected by entering a 6-foot radius of someone who has the virus. I made this application as a reference tool for people to view updated data on how many people, whether globally or by country, contract the virus as well as trends in if the number of people infected daily increases or not. Enjoy!</p>
    </Box>
    : null 
  }
    <div className={styles.container} >
      {/* <img className={styles.image} src={image} alt="COVID-19"/> */}
      <Cards data = {data} />
      <CountryPicker handleCountryChange ={this.handleCountryChange}/>
      <Chart data = {data} country = {country} /> 
    </div>
    </div>

  );
}
}

export default App;
