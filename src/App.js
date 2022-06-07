import './App.css';

import ReactGA from "react-ga4";
import React from 'react';
import axios from 'axios';
import logo from './images/logo.png';
import bild from './images/Bellevue.jpeg'
import heart from './images/heart-regular.svg';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
} from 'react-bootstrap';



class App extends React.Component {
  // State of your application
  state = {
    menus: [],
    error: null,
    menu: [],
    category : "Speisen",
    button: "test"
  };
  
          

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
  ReactGA.initialize("G-TBGV44HPM5");
    this.getEvents();
    try {
      const config = {
        headers: { Authorization: `Bearer e411aef8962333f7bbab6aa568805076194d6da56e3afecdae48a33287a00e6583930f33353dfa199595ab8e4fe57367a01c9f84e2ea6743c438011607510db63d9037e0c99c72c6d1d3072043687b3e9fa0b089d06e35bb031929101c501e5face6ebc7af31973a0eaf7b24f57db2133f66a456f07ad5d824d9eb93cb832a80` }
      };
      const response = await axios.get('https://speisekarte.bellevue-alm.at/strapi/api/categories', config);
      //console.log(response.data);
      this.setState({ menus: response.data.data });
    } catch (error) {
      this.setState({ error });
    }
  };
  getEvents = () => {
    ReactGA.send({ hitType: "pageview", page: "/"+this.state.category });
    console.log(this.state.category)
    const config = {
      headers: { Authorization: `Bearer e411aef8962333f7bbab6aa568805076194d6da56e3afecdae48a33287a00e6583930f33353dfa199595ab8e4fe57367a01c9f84e2ea6743c438011607510db63d9037e0c99c72c6d1d3072043687b3e9fa0b089d06e35bb031929101c501e5face6ebc7af31973a0eaf7b24f57db2133f66a456f07ad5d824d9eb93cb832a80` }
    };

    
    axios.get('https://speisekarte.bellevue-alm.at/strapi/api/subcategories?filters[category][name][$eq]=' + this.state.category + '&populate[menus][sort][0]=order:asc&sort=order:asc', config)
      .then(response => response.data)
      .then((data) => {
        this.setState({
            menu: data.data
        })
      });
  }
  setCategory = async (category) =>{
    await this.setState({
      category: category

    })
    this.getEvents()
  }

  render() {
  
    
    const { error, menus } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">
    <img
        src={logo}
        width="150"
       
        className="d-inline-block align-top"
        
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {
          menus.map(category => (
            <Nav.Link onClick={() => {this.setCategory(category.attributes.name)}}>{category.attributes.name}</Nav.Link>
          
          ))}
          <Nav.Link href='https://www.bellevue-alm.at'>Website</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      <img className='img-fluid' src={bild}></img>
      
      <Container className='mt-3' >
        <h1 className='main-color mb-3 fw-bolder'>{this.state.category}</h1>
       {this.state.menu.map((menus) =>
    <Container className='mb-5 menu-item'>
        
        {(() => {if (menus.attributes.menus.data.length === 0) {
          return <h2 className='main-color mb-0 mt-5 fw-bolder'>
          {menus.attributes.name}
          </h2>
        } else {
          return <div className="divider"><span></span><span>{menus.attributes.name}</span><span></span></div>
        }})()}
       
        {menus.attributes.menus.data.map(menu => (<div className='container pt-1'>
            <div className='row mb-1'>
              <div className='col-9'>
                <h5 className='menu-color text-start' ><strong>{menu.attributes.Name}</strong>  <span className="fs-6 fw-light">{menu.attributes.allergenes}</span></h5>
               
                <p className='text-start description-color'>{menu.attributes.description}</p>
              </div>
              <div className='col-3'>
                <h6 className='price-color'>{menu.attributes.price.toFixed(2) + " €"}</h6>
              </div>
            </div>
           
          </div>))}
        
       
        </Container>
 
    )}
       </Container>
        
        
       
        

       <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-dark text-white-50">
    <div className="container text-center">
      <Row>
      <a href='https://www.cyte.at' className='text-decoration-none text-white' color='white'><p>Made with <span><img src={heart} height='15px' style={{filter: "invert(30%) sepia(100%) saturate(1757%) hue-rotate(343deg) brightness(99%) contrast(108%)"}}></img></span> by CYTE</p></a>
      </Row>
      <Row>
      <small>&copy; {new Date().getFullYear()} All rights reserved</small>
      </Row>
    </div>
  </footer>
      </div>
    );
  }
}

export default App;
