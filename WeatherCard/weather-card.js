import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import {Card, Paragraph, Avatar} from 'react-native-paper';

const styles = StyleSheet.create({
    weatherIcon: {
      width: 100,
    },
    card: {
        color: "#f2f2f2"
    }
  });

  const theme = {
      dark: true,
      surface: "#f2f2f2"
  }

export default class WeatherCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            icon: null,
            highTemp: null,
            lowTemp: null,
            precipitation: null
        }
    }

    render() {
        const {date, icon, highTemp, lowTemp, precipitation} = this.props;
        console.log(icon);
       return (
       <Card theme={theme}>
            <Card.Content>
                <Image style={styles.weatherIcon} source={icon}/>
                <Paragraph>
                    Awww Yiss, I'm a card mang!
                </Paragraph>
            </Card.Content>
        </Card> 
       )
    }
}