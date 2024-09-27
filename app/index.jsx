import { View, ActivityIndicator, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect, useRootNavigationState } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const Index = () => {
  const { user, isLoaded } = useUser(); // Check if user info is loaded
  const rootNavigationState = useRootNavigationState();
  const [navLoaded, setNavLoaded] = useState(false);

  useEffect(() => {
    // Check if navigation state is ready
    if (rootNavigationState?.key) {
      setNavLoaded(true); // Set state when navigation is loaded
    }
  }, [rootNavigationState]);

  if (!isLoaded || !navLoaded) {
    // Show a loading indicator while navigation and user data are loading
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text> {/* Wrap loading text in a <Text> component */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        // Redirect to the home tab if the user is logged in
        <Redirect href={'/(tabs)/home'} />
      ) : (
        // Redirect to the login screen if the user is not logged in
        <Redirect href={'/(auth)/LoginScreen'} />
      )}
    </View>
  );
};

export default Index;
