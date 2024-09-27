import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';  // Import useRouter from expo-router

export default function Account() {
  const router = useRouter();  // Use useRouter hook for navigation

  const { user, isLoaded } = useUser();
  

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.imageUrl }} // Placeholder profile picture
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profilePhone}>{user.emailAddresses[0].emailAddress}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="edit" size={20} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/details')}>
        <Icon name="person" size={24} color="#000" />
        <Text style={styles.menuText}>My Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/farmLocation')}>
        <Icon name="place" size={24} color="#000" />
        <Text style={styles.menuText}>Farm Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/calendar')}>
        <Icon name="calendar-today" size={24} color="#000" />
        <Text style={styles.menuText}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/notifications')}>
        <Icon name="notifications" size={24} color="#000" />
        <Text style={styles.menuText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/help')}>
        <Icon name="help" size={24} color="#000" />
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/about')}>
        <Icon name="info" size={24} color="#000" />
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>

  

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logged Out')}>
        <Icon name="logout" size={24} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuText: {
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
});
