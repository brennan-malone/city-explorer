import React from 'react';
import './App.css';
import axios from 'axios';
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
// import Alert from 'react-bootstrap/Alert';
// import Container from 'react-bootstrap/Container';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
      cityMap: '',
    }
  }
  handleInput = (e) => {
    this.setState({
      city: e.target.value
    })
  }
  getCityData = async (e) => {
    e.preventDefault();

    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url)

      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=11`;

      this.setState({
        cityData: cityDataFromAxios.data[0],
        cityMap: cityMap,
        error: false
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }
  render() {
    return (
      <>
        <h1>API Calls</h1>

        <form onSubmit={this.getCityData}>
          <label htmlFor="">Pick a City!
            <input type="text" onInput={this.handleInput} />
            <button type="submit">Explore!</button>
          </label>
          <Image src={this.state.cityMap}></Image>
        </form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : <p>{this.state.cityData.display_name}</p>
        }

      </>
    );
  }
}
export default App;
