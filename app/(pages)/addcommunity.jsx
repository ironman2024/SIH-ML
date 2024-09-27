import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

// Firebase client-side config (public)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadToFirebase = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!title || !textContent || !image) {
      Alert.alert("Please fill all fields and select an image.");
      return;
    }

    setIsLoading(true);
    const folderRef = ref(storage, `${title}/`);

    try {
      // Generate a unique image file name
      const imageFileName = `${Date.now()}_${image.fileName}`;
      const imageRef = ref(folderRef, imageFileName);
      await uploadBytes(imageRef, await fetch(image.uri).then(res => res.blob()));

      console.log(`${imageFileName} uploaded successfully.`);

      // Upload Raw Text as Blob
      const textBlob = new Blob([textContent], { type: 'text/plain' });
      const textRef = ref(folderRef, 'text_content.txt');
      await uploadBytes(textRef, textBlob);
      console.log("Text content uploaded successfully.");

      Alert.alert("Upload Successful", "Your image and text have been uploaded.");

      // Reset state after upload
      setImage(null);
      setTextContent('');
      setTitle('');
    } catch (error) {
      console.error("Error uploading:", error);
      Alert.alert("Upload Failed", "There was an issue uploading your content.");
    } finally {
      setIsLoading(false);
      router.push('/community'); // Change the route as needed
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload to Community</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title for folder"
        value={title}
        onChangeText={setTitle}
        accessibilityLabel="Title for folder"
      />
      <TouchableOpacity style={styles.button} onPress={handleImageChange} accessible>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Text style={styles.imageName}>{image.fileName}</Text>
        </View>
      )}
      <TextInput
        style={styles.textArea}
        placeholder="Enter text content"
        value={textContent}
        onChangeText={setTextContent}
        multiline
        accessibilityLabel="Text content"
      />
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleUpload}
        disabled={isLoading}
        accessible
      >
        <Text style={styles.uploadButtonText}>
          {isLoading ? 'Uploading...' : 'Upload to Firebase'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageName: {
    color: '#555',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UploadToFirebase;