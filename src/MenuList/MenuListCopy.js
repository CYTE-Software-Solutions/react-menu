import './MenuList.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from "react-router-dom";
import logo from '../images/logo.png';

/*
class MenuList extends React.Component {
    
  // State of your application
  state = {
    menus: [],
    error: null,
    foo: ''
  };

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    this.parseQueryParams();
    try {
      const config = {
        headers: { Authorization: `Bearer e411aef8962333f7bbab6aa568805076194d6da56e3afecdae48a33287a00e6583930f33353dfa199595ab8e4fe57367a01c9f84e2ea6743c438011607510db63d9037e0c99c72c6d1d3072043687b3e9fa0b089d06e35bb031929101c501e5face6ebc7af31973a0eaf7b24f57db2133f66a456f07ad5d824d9eb93cb832a80` }
    };
      const response = await axios.get('http://localhost:1337/api/menus',config);
      console.log(response.data);
      this.setState({ menus: response.data.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  parseQueryParams () {
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
        if (this.state.foo!== param[1]) {
            this.setState({foo: param[1]});
        }
    }
}

  render() {
    const { error, restaurant } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    //console.log(this.props)

    return (
      <div className="App">
            <h2>{this.state.foo}</h2>
        
        <ul>
          
          {
            this.state.menus.map(restaurant => (
              <li key={restaurant.id}>{restaurant.attributes.Name}</li>
            ))
          this.state.menus.data.map(restaurant => (
            <li key={restaurant.id}>{restaurant.Name}</li>
          ))}
        </ul>
      </div>
    );
  }
}*/

export default function MenuListCopy() {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { category } = useParams();


  function getEvents() {
    const config = {
      headers: { Authorization: `Bearer e411aef8962333f7bbab6aa568805076194d6da56e3afecdae48a33287a00e6583930f33353dfa199595ab8e4fe57367a01c9f84e2ea6743c438011607510db63d9037e0c99c72c6d1d3072043687b3e9fa0b089d06e35bb031929101c501e5face6ebc7af31973a0eaf7b24f57db2133f66a456f07ad5d824d9eb93cb832a80` }
    };

    setIsLoading(true);
    axios.get('http://speisekarte.bellevue-alm.at/strapi/api/subcategories?filters[category][name][$eq]=' + category + '&populate=menus', config)
      .then(response => response.data)
      .then((data) => {
        setMenu(data)
        console.log(data.data)
        setIsLoading(false);
      });
  }


  useEffect(() => {
    getEvents();
  }, [])

  if (isLoading) return null;

  return (
    <div className="App">
      <div className='col-2 mx-auto'>
      <Link to={"/"}>
        <img src={logo} alt="Logo" className='img-fluid img-thumbnail border-0'/>
        </Link>
        </div>
      <h1>{category}</h1>


      <div className='container'>
        {menu.data.map(function (category, i) {
          return <div className='card'>
            <div className='card-header'>
              <h3>
                {category.attributes.name}
              </h3>
            </div>

            <div className='card-body'>
              {category.attributes.menus.data.map(menu => (<div className='container pt-1'>
                <div className='row'>
                  <div className='col-9'>
                    <h5><strong>{menu.attributes.Name}</strong> {menu.attributes.allergenes}</h5>
                  </div>
                  <div className='col-3'>
                    <h5>{menu.attributes.price.toFixed(2) + " €"}</h5>
                  </div>
                </div>
                <div className='row'>
                <div className='col-8'>
                  <p className='ml-auto'>{menu.attributes.description}</p>
                  </div>
                  <div className='col-2'>
                  </div>
                </div>
              </div>))}
            </div>
          </div>
        })}
      </div>

    </div>
  );
}
