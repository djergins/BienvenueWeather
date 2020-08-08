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
    //     axios({
    //         "method":"GET",
    //         "url":"https://community-open-weather-map.p.rapidapi.com/forecast",
    //         "headers":{
    //         "content-type":"application/octet-stream",
    //         "x-rapidapi-host":"community-open-weather-map.p.rapidapi.com",
    //         "x-rapidapi-key":"0c5452f58cmsha5e0cca4ba753b1p1ed74bjsn5b2eb1d77afe",
    //         "useQueryString":true
    //         },"params":{
    //         "units":"imperial",
    //         "zip":"32607"
    //         }
    //         })
    //         .then((response)=>{
    //           console.log(response)
    //           weatherData = response;
    //           this.setState({
    //             weatherData : response
    //           });
    //         })
    //         .catch((error)=>{
    //           console.log(error)
    //         })
     
        //Adding this as an alternative because I'm not about to pay for a weather api
        //reads in a json response that I saved from the weather api
        const weatherForecast = require("../json/weatherForecast.json");
        this.setState({
            weatherData : weatherForecast
        })
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