import React, { Component } from 'react';
import WeatherCard from '../WeatherCard/weather-card';
import axios from 'axios';
import {Stylesheet, View, Text} from 'react-native'

export default class CardsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            weatherData: null
        }
    }
    
    //call the weather api when the component mounts
    componentDidMount() {
        //Adding this as an alternative because I'm not about to pay for a weather api...
        //reads in a json response that I saved from the weather api
        const weatherForecast = require("../json/weatherForecast.json");
        let forecast = this.splitWeatherByDay(weatherForecast);
        let day = null;
        console.log(forecast);
        this.determineWeatherIcon(forecast);
        this.getDayOfWeek(forecast);
        this.determineHighForTheDay(forecast);
        this.determineLowForTheDay(forecast)
        console.log("FORECAST", forecast);
        this.setState({
            weatherData : forecast
        });
    }

    //split the response data into separate dates
    splitWeatherByDay(weatherForecast) {
        let forecast = {};
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
        return forecast;
    }

    //for each day, find the icon with the highest precedence and set it
    determineWeatherIcon(forecast) {
        for (let date in forecast) {
            let topIcon = {};
            let newChallenger = {};
            forecast[date].forEach(threeHours => {
                if(Object.keys(topIcon).length === 0 && topIcon.constructor === Object){
                    topIcon = this.weatherHierarchy(threeHours);
                } else {
                    newChallenger = this.weatherHierarchy(threeHours);
                    topIcon = (newChallenger.rank < topIcon.rank) ? newChallenger : topIcon;
                }
                
            })
            forecast[date]["icon"] = topIcon.img;
        }
    }

    determineHighForTheDay(forecast) {
        for (let date in forecast) {
            let topHigh;
            let newChallenger;
            forecast[date].forEach(threeHours => {
                if(!topHigh) {
                    topHigh = threeHours.main.temp_max;
                } else {
                    newChallenger = threeHours.main.temp_max;
                    topHigh = newChallenger > topHigh ? newChallenger : topHigh;
                }
            });
            forecast[date]["topHigh"] = topHigh;
        }
    }

    determineLowForTheDay(forecast) {
        for (let date in forecast) {
            let topLow;
            let newChallenger;
            forecast[date].forEach(threeHours => {
                if(!topLow) {
                    topLow = threeHours.main.temp_min;
                } else {
                    newChallenger = threeHours.main.temp_min;
                    topLow = newChallenger < topLow ? newChallenger : topLow;
                }
            });
            forecast[date]["topLow"] = topLow;
        }
    }

    //the hierarchy of weather events
    //note: Man, it sucks that require doesn't accept expressions.
    weatherHierarchy(time) {
        switch(time.weather[0].icon) {
            case '13d':
                return {img: require('../style/img/13d.png'), rank: 1 }
            case '13n':
                return {img: require('../style/img/13d.png'), rank: 2 }
            case '11d':    
                return {img: require('../style/img/11d.png'), rank: 3 }
            case '11n':
                return {img: require('../style/img/11d.png'), rank: 4 }
            case '10d':     
                return {img: require('../style/img/10d.png'), rank: 5 }
            case '10n':    
                return {img: require('../style/img/10d.png'), rank: 6 }
            case '09d':    
                return {img: require('../style/img/09d.png'), rank: 7 }
            case '09n':    
                return {img: require('../style/img/09d.png'), rank: 8 }
            case '50d':    
                return {img: require('../style/img/50d.png'), rank: 9 }
            case '50n':
                return {img: require('../style/img/50d.png'), rank: 10 }
            case '04d':    
                return {img: require('../style/img/04d.png'), rank: 11 }
            case '04n':
                return {img: require('../style/img/04d.png'), rank: 12 }
            case '03d': 
                return {img: require('../style/img/03d.png'), rank: 13 }
            case '03n': 
                return {img: require('../style/img/03d.png'), rank: 14 }
            case '02d':  
                return {img: require('../style/img/02d.png'), rank: 15 }
            case '02n': 
                return {img: require('../style/img/02d.png'), rank: 16 }
            default:
                return {img: require('../style/img/01d.png'), rank: 17 }
        }
    }

    getDayOfWeek(forecast) {
        for (let date in forecast) {
            const dayOfWeek = new Date(date).getDay();    
        forecast[date]["dayOfWeek"] = isNaN(dayOfWeek) ? null : 
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
        }
    }

    

    render() {
        const {weatherData} = this.state;
        let cards = []
        for (let date in weatherData){
            console.log(date);
            cards.push(<WeatherCard icon={weatherData[date].icon}/>)
        }
        return (
            <View>
                {cards}
            </View>   
        )
    }
}