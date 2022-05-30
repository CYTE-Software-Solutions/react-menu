import './App.css';

import React from 'react';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import logo from './images/logo.png';

class App extends React.Component {
  // State of your application
  state = {
    menus: [],
    error: null,
  };

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer e411aef8962333f7bbab6aa568805076194d6da56e3afecdae48a33287a00e6583930f33353dfa199595ab8e4fe57367a01c9f84e2ea6743c438011607510db63d9037e0c99c72c6d1d3072043687b3e9fa0b089d06e35bb031929101c501e5face6ebc7af31973a0eaf7b24f57db2133f66a456f07ad5d824d9eb93cb832a80` }
      };
      const response = await axios.get('http://speisekarte.bellevue-alm.at/strapi/api/categories', config);
      console.log(response.data);
      this.setState({ menus: response.data.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, restaurant } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (
      <div className="App">
        <div className='col-2 mx-auto'>
        <img src={logo} alt="Logo" className='img-fluid img-thumbnail border-0'/>
        </div>
        <h1>Speisekarte</h1>
        {
          this.state.menus.map(restaurant => (
            <div className='container pt-5'>
              <Link to={"/" + restaurant.attributes.name}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.attributes.name}</h5>
                </div>
              </div>
              </Link>
            </div>

          ))}


      </div>
    );
  }
}

export default App;
