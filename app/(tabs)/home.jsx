import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

import Weather from './../../components/weather';

const HomeScreen = () => {
  const { user, isLoaded } = useUser();
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      await tf.setBackend('webgl'); // Ensure you have a WebGL backend

      // Load the model from the specified location
      const loadedModel = await bundleResourceIO(require('../assets/model/model.json'));
      setModel(loadedModel);
      setLoadingModel(false);
      console.log('Model loaded!');
    };

    loadModel();
  }, []);

  // Function to preprocess image to tensor
  const preprocessImageToTensor = (image) => {
    const imgTensor = tf.browser.fromPixels(image); // Use appropriate method to convert image
    const resized = tf.image.resizeBilinear(imgTensor, [224, 224]); // Resize to (224, 224)
    const normalized = resized.div(255.0); // Normalize to [0, 1]
    return normalized.expandDims(0); // Add batch dimension
  };

  // Function to handle image prediction
  const handleImagePrediction = async (image) => {
    if (!model) {
      console.log('Model not loaded');
      return;
    }

    const imageTensor = preprocessImageToTensor(image); // Preprocess image
    const predictions = await model.predict(imageTensor); // Use 'predict' instead of 'classify'
    console.log(predictions);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          paddingVertical: 20,
          textAlign: 'center',
          color: '#4caf50',
        }}>
          Welcome, {user?.fullName}
        </Text>
        {/* Top Section: Location */}
        <TopSection />
  
        {/* Weather Update Section */}
        <Weather />
  
        {/* Crop Alerts Section */}
        <CropAlerts />
  
        {/* Spreading Diseases Section */}
        <SectionHeader title="Spreading Diseases" />
        <DiseaseCardScroll />
  
        {/* Farming Tips Section */}
        <SectionHeader title="Farming Tips" />
        <FarmingTips />
  
        {/* Contact Helpline Section */}
        <ContactHelpline />
        
        {/* Load model status */}
        {loadingModel && <Text>Loading model...</Text>}  {/* Correctly wrapped in <Text> */}
      </ScrollView>
  
      {/* Floating Chatbot Icon */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => router.push('/chatbot')}
      >
        <Ionicons name="chatbubbles" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );  
};

// Top Section: Location and Icon
const TopSection = () => (
  <View style={styles.topSectionContainer}>
    <Ionicons name="location-outline" size={28} color="#4CAF50" style={styles.locationIcon} />
    <Text style={styles.locationText}>Pune, Maharashtra</Text>
  </View>
);

// Weather Update Component
const WeatherUpdate = () => (
  <View style={styles.weatherContainer}>
    <Ionicons name="cloud-outline" size={28} color="#4CAF50" />
    <View style={styles.weatherTextContainer}>
      <Text style={styles.weatherText}>Weather Today</Text>
      <Text style={styles.weatherDetails}>Sunny, 28°C</Text>
    </View>
  </View>
);

// Crop Alerts Component
const CropAlerts = () => (
  <View style={styles.alertContainer}>
    <Ionicons name="alert-circle-outline" size={28} color="#E53935" />
    <View style={styles.alertTextContainer}>
      <Text style={styles.alertTitle}>Crop Alerts</Text>
      <Text style={styles.alertDetails}>Blight disease detected in your region</Text>
    </View>
  </View>
);

// Section Header Component
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity activeOpacity={0.7}>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

// Disease Card Scroll Component
const DiseaseCardScroll = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.diseaseCardScroll}>
    <DiseaseCard
      icon="bug-outline"
      imageUri="https://www.apsnet.org/edcenter/disandpath/fungalasco/pdlessons/PublishingImages/AppleScab01sm.jpg"
      title="Apple Scab"
      subtitle="A fungal infection affecting apple trees."
      description="Apple scab is caused by a fungus that affects the leaves, fruits, and flowers of apple trees, leading to dark lesions."
      color="#FF6F00"
    />
    <DiseaseCard
      icon="leaf-outline"
      imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTha6BOe-NeS7HWl1UawWt08uHZHz2RZpXuaA&s"
      title="Panama Disease"
      subtitle="A soil-borne fungal disease."
      description="This disease affects bananas and causes wilting, often leading to the death of the plants."
      color="#D32F2F"
    />
  </ScrollView>
);

// Disease Card Component
const DiseaseCard = ({ icon, imageUri, title, subtitle, description, color }) => (
  <TouchableOpacity style={[styles.diseaseCard, { borderColor: color }]}>
    <View style={styles.diseaseHeader}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[styles.diseaseTitle, { color }]}>{title}</Text>
    </View>
    <Image source={{ uri: imageUri }} style={styles.diseaseImage} />
    <Text style={styles.diseaseSubtitle}>{subtitle}</Text>
    <Text style={styles.diseaseDescription}>{description}</Text>
    <TouchableOpacity style={styles.readMoreButton}>
      <Text style={[styles.readMoreText, { color }]}>Read more</Text>
      <Ionicons name="arrow-forward-circle-outline" size={20} color={color} />
    </TouchableOpacity>
  </TouchableOpacity>
);

// Farming Tips Component
const FarmingTips = () => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tipsScroll}>
    <TipCard
      icon="water-outline"
      title="Watering Schedule"
      description="Optimal times to water crops for best results."
      color="#4CAF50"
    />
    <TipCard
      icon="leaf-outline"
      title="Soil Health"
      description="Maintain balanced soil nutrients for healthy crops."
      color="#8BC34A"
    />
    <TipCard
      icon="bug-outline"
      title="Pest Control"
      description="Use natural remedies to manage pests."
      color="#FF9800"
    />
  </ScrollView>
);

// Tip Card Component
const TipCard = ({ icon, title, description, color }) => (
  <View style={[styles.tipCard, { backgroundColor: color }]}>
    <Ionicons name={icon} size={24} color="#FFF" />
    <Text style={styles.tipTitle}>{title}</Text>
    <Text style={styles.tipDescription}>{description}</Text>
  </View>
);

// Contact Helpline Component
const ContactHelpline = () => (
  <View style={styles.contactContainer}>
    <Ionicons name="call-outline" size={28} color="#4CAF50" />
    <Text style={styles.contactText}>Contact Expert for Help</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Soft background color
    paddingVertical: 16,
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  locationIcon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  weatherTextContainer: {
    marginLeft: 10,
  },
  weatherText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  weatherDetails: {
    fontSize: 14,
    color: '#757575',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  alertTextContainer: {
    marginLeft: 10,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53935',
  },
  alertDetails: {
    fontSize: 14,
    color: '#757575',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#4CAF50',
  },
  diseaseCardScroll: {
    marginBottom: 20,
  },
  diseaseCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    width: 200,
    marginRight: 10,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  diseaseImage: {
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  diseaseSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  diseaseDescription: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  readMoreText: {
    fontSize: 14,
  },
  tipsScroll: {
    marginBottom: 20,
  },
  tipCard: {
    borderRadius: 10,
    padding: 10,
    width: 150,
    marginRight: 10,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tipDescription: {
    fontSize: 12,
    color: '#FFF',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 15,
  },
});

export default HomeScreen;