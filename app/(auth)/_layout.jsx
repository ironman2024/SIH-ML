import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name='chatbot'
          options={{
            headerShown: false
          }}  
        />
      </Stack>

      <StatusBar style='dark'/>
    </>
  )
}

export default AuthLayout