import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'; // Import necessary components
import * as tf from '@tensorflow/tfjs';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import { Asset } from 'expo-asset';

const OutputPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const imageHeight = 224; // Update according to your model's input size
  const imageWidth = 224; // Update according to your model's input size

  const preprocessImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const tensor = tf.browser.fromPixels(img).toFloat();
        const resized = tf.image.resizeBilinear(tensor, [imageHeight, imageWidth]);
        const batched = resized.expandDims(0);
        resolve(batched);
      };
      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const [error, setError] = useState(null);

const handleImageUpload = async (file) => {
  setLoading(true);
  setResult(null);
  setError(null); // Reset error state

  try {
    const model = await tf.loadLayersModel(Asset.fromModule(require('../assets/models/model.json')).uri);
    const imageTensor = await preprocessImage(file);
    const prediction = model.predict(imageTensor);
    const predictionData = prediction.dataSync();
    setResult(predictionData);
  } catch (error) {
    console.error("Error during prediction:", error);
    setError("An error occurred during prediction. Please try again.");
  } finally {
    setLoading(false);
  }
};

return (
  <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 24 }}>Model Output Page</Text>
    <ImageUploader onUpload={handleImageUpload} />
    {loading && <Text>Processing...</Text>}
    {loading && <ActivityIndicator size="large" />}
    {error && <Text style={{ color: 'red' }}>{error}</Text>}
    {result && <ResultDisplay result={result} />}
  </View>
);
};

export default OutputPage;