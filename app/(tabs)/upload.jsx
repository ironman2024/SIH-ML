// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Image, TextInput, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ort from 'onnxruntime-react-native';
// import * as FileSystem from 'expo-file-system';

// const UploadScreen = ({ navigation }) => {
//   const [image, setImage] = useState(null);
//   const [symptoms, setSymptoms] = useState('');
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadModel = async () => {
//       try {
//         const modelPath = FileSystem.documentDirectory + 'mobilenet_v2.onnx';
//         const modelUri = require('../assets/mobilenet_v2.onnx');

//         await FileSystem.downloadAsync(modelUri, modelPath);
//         const loadedSession = await ort.InferenceSession.create(modelPath);
//         setSession(loadedSession);
//       } catch (error) {
//         console.error('Error loading model:', error);
//       }
//     };
//     loadModel();
//   }, []);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync();
//     if (!result.cancelled) setImage(result.uri);
//   };

//   const processImage = async () => {
//     if (!image || !session) return;

//     setLoading(true);
//     try {
//       const imgTensor = await imageToTensor(image); // Convert image to tensor
//       const tensorShape = [1, 3, 224, 224]; // Example shape for MobileNetV2
//       const inputTensor = new ort.Tensor('float32', imgTensor, tensorShape);
//       const feeds = { input_name: inputTensor };  // Replace 'input_name' with actual input name from ONNX model
//       const output = await session.run(feeds);
//       const result = output.output_name.data;

//       navigation.navigate('Output', { result: result[0] });
//     } catch (error) {
//       console.error('Error during inference:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processSymptoms = async () => {
//     if (!symptoms.trim() || !session) return;

//     setLoading(true);
//     try {
//       const tokenizedSymptoms = tokenizeSymptoms(symptoms);  // Tokenize symptoms
//       const paddedSymptoms = padSequences(tokenizedSymptoms, 50);  // Example: pad to max length 50
//       const inputTensor = new ort.Tensor('float32', new Float32Array(paddedSymptoms), [1, 50]);

//       const feeds = { input_name: inputTensor }; // Replace 'input_name' with actual input name from ONNX model
//       const output = await session.run(feeds);
//       const result = output.output_name.data;

//       navigation.navigate('Output', { result: result[0] });
//     } catch (error) {
//       console.error('Error during inference:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View>
//       <Text>Upload or Take a Picture</Text>
//       <Button title="Pick an Image" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
//       <Button title="Process Image" onPress={processImage} disabled={!image} />

//       <TextInput
//         placeholder="Enter Symptoms"
//         value={symptoms}
//         onChangeText={setSymptoms}
//       />
//       <Button title="Process Symptoms" onPress={processSymptoms} disabled={!symptoms} />

//       {loading && <ActivityIndicator size="large" />}
//     </View>
//   );
// };

// export default UploadScreen;
