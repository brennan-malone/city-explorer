import React from 'react';
import './App.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

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

      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=10`;

      this.setState({
        cityData: cityDataFromAxios.data[0],
        cityMap: cityMap,
        error: false
      })

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }
  }
  render() {
    return (
      <>
        <h1>API Calls</h1>

        <Form onSubmit={this.getCityData}>
          <Form.Group>
          <label htmlFor="">Pick a City!
            <input type="text" onInput={this.handleInput} />
            <Button type="submit">Explore!</Button>
          </label>
          </Form.Group>
        </Form>

        {
          this.state.error
            ? <Alert variant="warning">{this.state.errorMessage}</Alert>
            : <Container>
              <ListGroup as='list-group'>
                <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
                <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
                <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
              </ListGroup>
              <Image src={this.state.cityMap}></Image>
            </Container>
        }

      </>
    );
  }
}
export default App;
