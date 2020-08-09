import React, { Component } from 'react';
import axios from 'axios';
import {Stylesheet, View, Text} from 'react-native'

export default class CardsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            weatherData: null
        }
    }
    
    componentDidMount() {
        let forecast = {};
        //Adding this as an alternative because I'm not about to pay for a weather api
        //reads in a json response that I saved from the weather api
        const weatherForecast = require("../json/weatherForecast.json");
        weatherForecast.list.forEach(element => {
            //isolate the date from a string such as "2020-08-10 15:00:00"
            let re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            let currentDate = re.exec(element.dt_txt)[0];
            //if we don't have an attribute for the current date in forecast object
            //make one
            if(!forecast.hasOwnProperty(currentDate)){
                forecast[currentDate] = [];
            }
            //tack the forecast data on for that date
            //There is data for every 3 hours
            forecast[currentDate].push(element);
        });
        console.log(forecast);
        this.setState({
            weatherData : forecast
        });
    }

    render() {
        const {weatherData} = this.state;
        return (
            <View>
                <Text>{JSON.stringify(weatherData)}</Text>
            </View>
        )
    }
}