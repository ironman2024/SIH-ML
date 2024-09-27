import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='Chatbot'  // Adjusted for consistent naming
          options={{
            headerShown: false,
          }}  
        />

        <Stack.Screen
          name='AddCommunity'  // Adjusted for consistent naming
          options={{
            headerShown: false,
          }}  
        />
        
        <Stack.Screen
          name='Content'  // Adjusted for consistent naming
          options={{
            headerShown: false,
          }}  
        />
      </Stack>

      <StatusBar style='dark' />
    </>
  );
};

export default AuthLayout;