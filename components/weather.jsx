// components/weather.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch location and weather data
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const { latitude, longitude } = location.coords;
      fetchWeatherData(latitude, longitude);
    })();
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const apiKey = 'f69a5c6f8fdc2758491268e1a99bb165'; // Replace with your weather API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
     
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMsg('Failed to fetch weather data');
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  if (errorMsg) {
    return <Text style={styles.errorText}>{errorMsg}</Text>;
  }

  return (
    <View style={styles.weatherContainer}>
      <Ionicons name="cloud-outline" size={28} color="#4CAF50" />
      {weatherData && (
        <View>
          <Text style={styles.locationText}>{weatherData.name}</Text>
          <Text style={styles.weatherText}>Today: {weatherData.weather[0].description}</Text>
          <Text style={styles.weatherDetails}>Temp: {weatherData.main.temp}°C</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  locationText: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  weatherText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  weatherDetails: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Weather;
