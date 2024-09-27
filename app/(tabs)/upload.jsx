import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';  // Required for TensorFlow.js in React Native
import * as jpeg from 'jpeg-js';          // Required for image processing

// Function to convert image to a tensor
const imageToTensor = async (uri) => {
  const imgB64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = Buffer.from(imgB64, 'base64');
  const rawImageData = jpeg.decode(imgBuffer, { useTArray: true });

  // Assuming input size is 224x224x3
  const { width, height, data } = rawImageData;
  const numChannels = 3;
  const imageArray = new Float32Array(width * height * numChannels);

  let index = 0;
  for (let i = 0; i < data.length; i += 4) {
    imageArray[index++] = data[i] / 255;       // R
    imageArray[index++] = data[i + 1] / 255;   // G
    imageArray[index++] = data[i + 2] / 255;   // B
  }

  return tf.tensor(imageArray, [1, 224, 224, numChannels]);
};

// Function to tokenize symptoms (Dummy implementation)
const tokenizeSymptoms = (symptoms) => {
  return symptoms.split(' ').map(symptom => symptom.toLowerCase());
};

// Function to pad sequences (Dummy implementation)
const padSequences = (tokens, maxLength) => {
  const padded = new Array(maxLength).fill(0);
  for (let i = 0; i < Math.min(tokens.length, maxLength); i++) {
    padded[i] = tokens[i];
  }
  return padded;
};

const UploadScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready(); // Ensure TensorFlow is ready
        const modelUri = FileSystem.documentDirectory + 'model.json';
        const modelPath = require('../assets/model.json');

        await FileSystem.downloadAsync(modelPath, modelUri); // Download .json file
        const loadedModel = await tf.loadGraphModel(modelUri); // Load the model
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) setImage(result.uri);
  };

  const processImage = async () => {
    if (!image || !model) return;

    setLoading(true);
    try {
      const imgTensor = await imageToTensor(image);
      const predictions = await model.predict(imgTensor).data();  // Run inference

      navigation.navigate('Output', { result: predictions[0] });
    } catch (error) {
      console.error('Error during inference:', error);
    } finally {
      setLoading(false);
    }
  };

  const processSymptoms = async () => {
    if (!symptoms.trim() || !model) return;

    setLoading(true);
    try {
      const tokenizedSymptoms = tokenizeSymptoms(symptoms);
      const paddedSymptoms = padSequences(tokenizedSymptoms, 50);
      const inputTensor = tf.tensor2d(paddedSymptoms, [1, 50]);

      const predictions = await model.predict(inputTensor).data();  // Run inference
      navigation.navigate('Output', { result: predictions[0] });
    } catch (error) {
      console.error('Error during inference:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Upload or Take a Picture</Text>
      <Button title="Pick an Image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Process Image" onPress={processImage} disabled={!image} />

      <TextInput
        placeholder="Enter Symptoms"
        value={symptoms}
        onChangeText={setSymptoms}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Process Symptoms" onPress={processSymptoms} disabled={!symptoms} />

      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default UploadScreen;