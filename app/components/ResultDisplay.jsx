import React from 'react';
import { View, Text } from 'react-native'; // Import necessary components

const ResultDisplay = ({ result }) => {
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Prediction Result</Text>
      <Text>{result}</Text>
    </View>
  );
};

export default ResultDisplay;
