import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
var f = 1
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');


  const handleSignIn = async () => {

    const collectionRef = firestore().collection('Users');
    const querySnapshot = await collectionRef.get();


    querySnapshot.forEach((doc) => {

      if (doc.data().email == email) {
        goToNext(doc.data())
        f = 0
      }
    });
    if (f) {
      Alert.alert('User not found please Signup');
    }

  }
  const goToNext = async (data) => {
   // console.log(data.name)
    await AsyncStorage.setItem('NAME', data.name);
    await AsyncStorage.setItem('EMAIL', data.email);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Image style={styles.chatimage} source={require('../../assets/chat-balloon.png')} ></Image>
      <TextInput
        mode="outlined"
        label="Email"
        style={styles.input}

        onChangeText={text => setEmail(text)}
        value={email}
      />


      <TouchableOpacity onPress={() => handleSignIn()} style={styles.loginbutton}>
        <Text>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
        <Text style={{ color: 'black' }}>New User..</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.Signupbutton}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  chatimage: {
    width: 140,
    height: 140,
    marginBottom: 10,
    marginTop: 80,
  },

  input: {
    height: 50,
    width: 300,
    // borderColor: 'yellowgreen',
    //borderWidth: 3,
    marginBottom: 16,

    //borderRadius:10,
    fontSize: 18,
    color: 'black',
  },
  loginbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'violet',
    borderRadius: 10,
  },
  Signupbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'pink'
  }
})