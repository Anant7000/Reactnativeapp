import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screen/Home';
import Signup from './Screen/Signup';
import Login from './Screen/Login';
import Chat from './Screen/Chat';
import Messages from './Screen/Messages';
import FormField from './Screen/FormField';



const Stack = createNativeStackNavigator();

const NavScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FormField'>
    {/* {welcome ?  <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} /> : null} */}
    <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen name="Messages" component={Messages} options={{headerShown: false}} />
    <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}} />
    <Stack.Screen name="Form" component={FormField} options={{headerShown: false}} />
   
      </Stack.Navigator>
        
    </NavigationContainer>
  )
}

export default NavScreen

const styles = StyleSheet.create({})