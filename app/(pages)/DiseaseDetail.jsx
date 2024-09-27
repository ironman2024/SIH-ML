import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiseaseDetailsScreen = ({ route, navigation }) => {
  const { disease } = route.params || {};


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>{disease.name}</Text>

        <View style={styles.detailContainer}>
          <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{disease.date}</Text>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <Ionicons name="alert-circle-outline" size={24} color="#E53935" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Affected Time</Text>
            <Text style={styles.detailValue}>{disease.affectedTime}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{disease.description || 'No description available.'}</Text>

        <TouchableOpacity
  style={styles.precautionButton}
  onPress={() => navigation.navigate('PrecautionsScreen', { disease })} // Assuming there's a precautions screen
>
  <Ionicons name="checkmark-circle-outline" size={28} color="#FFF" />
  <Text style={styles.precautionButtonText}>Check for Precautions</Text>
</TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginVertical: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  detailTextContainer: {
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginBottom: 20,
  },
  precautionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 20,
  },
  precautionButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
    marginLeft: 8,
  },
});

export default DiseaseDetailsScreen;