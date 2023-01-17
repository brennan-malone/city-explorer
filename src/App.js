import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: [],
      error: false,
      errorMessage: '',
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

      this.setState({
        cityData: cityDataFromAxios.data[0],
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
            <input type="text" /></label>
          <button type="submit">Explore!</button>
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
