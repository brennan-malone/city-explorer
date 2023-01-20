import React from 'react';
import { Carousel, ListGroup } from 'react-bootstrap';
import './Weather.css';
import Subweather from './Subweather'

class Weather extends React.Component {
  render() {

    return (
      <>
        {this.props.weatherData.map((day, index) => {
          return <ListGroup.Item key={index}>{day.date}, {day.description}</ListGroup.Item>
        })
        }
      </>
    )
  }
}

export default Weather;