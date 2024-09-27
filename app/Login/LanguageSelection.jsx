
import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LanguageSelection = () => {

  const { user, isLoaded } = useUser();
  const navigation = useNavigation();
  
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = ['English', 'हिन्दी', 'मराठी', 'ਪੰਜਾਬੀ'];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleNextPress = () => {
    navigation.navigate('/(tabs)/home'); // Redirect to 'home' inside '(tabs)' folder
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome </Text>
      <Text style={{
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color:'#1A4D2E'
      }}>
       {user?.fullName}
      </Text>
      <Text style={styles.subtitleText}>Select a language:</Text>
      <ScrollView style={styles.scrollView}>
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.languageOption,
              selectedLanguage === language && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelect(language)}
          >
            <Text style={styles.languageText}>{language}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button 
        title="Next" 
        onPress={handleNextPress} 
        color="#347928" // Custom button color
      />
      {selectedLanguage && <Text style={styles.selectedText}>You selected: {selectedLanguage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#53B175',
    
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:30,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    marginVertical: 10,
  },
  languageOption: {
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedLanguage: {
    backgroundColor: '#347928',
    borderColor: '#347928',
  },
  languageText: {
    fontSize: 16,
  },
  selectedText: {
  
    fontSize: 28,
    textAlign: 'center',
    color: '#347928',
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#347928',
    padding: 15,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 20,
  }
});

export default LanguageSelection;