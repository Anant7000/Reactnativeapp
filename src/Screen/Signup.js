import { StyleSheet, Text, View, Button, Image, Alert,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
var f = 1;
const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');



  const Check = async () => {
    const collectionRef = firestore().collection('Users');
    const querySnapshot = await collectionRef.get();


    querySnapshot.forEach((doc) => {

      if (doc.data().email == email) {
        Alert.alert('Already exit please login');
        f = 0
      }
    });
    if (f) {
      handleSignIn()
    }
  }


  const handleSignIn = () => {
    firestore()
      .collection('Users')
      .doc(email)
      .set({
        name: name,
        email: email,
      })
      .then(() => {
        console.log('User added!');
        AsyncStorage.setItem('NAME', name);
        AsyncStorage.setItem('EMAIL', email);
        navigation.navigate('Home');
      });

  };
  return (
    <View style={styles.container}>
      <Image style={{ width: 150, height: 150, marginBottom: 10,marginTop:50}} source={require('../../assets/chat-balloon.png')} ></Image>
      <TextInput
        mode="outlined"
        style={styles.input}
        label="name"
        onChangeText={text => setname(text)}
        value={name}
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        label="Email"
        onChangeText={text => setEmail(text)}
        value={email}

      />
      <TouchableOpacity onPress={() => Check()} style={styles.Signupbutton}>
        <Text>Sign up</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
        <Text style={{ color: 'black' }}>Already Sign up...</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginbutton}>
          <Text style={{color:'black'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    width: 300,
    // borderColor: 'gray',
    //borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  Signupbutton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'violet',
    borderRadius: 10,
  },
  loginbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'pink'
  }
})