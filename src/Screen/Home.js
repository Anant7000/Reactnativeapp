import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ww = Dimensions.get('screen').width;
const Home = ({ navigation }) => {
  const [People, setData] = useState([]);
  const [email, setemail] = useState()
  const getUsers = async () => {

    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    setemail(email)
    const collectionRef = firestore().collection('Users');
    const querySnapshot = await collectionRef.get();


    querySnapshot.forEach((doc) => {

      if (doc.data().email != email) {
        tempData.push(doc.data())
      }
    });
    setData(tempData)
  };

  useEffect(() => {
    getUsers();
  }, []);




  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => (navigation.navigate('Signup'))}>
        <FontAwesomeIcon icon={faArrowLeft} size={30}></FontAwesomeIcon>
      </TouchableOpacity>

      <Text style={{ fontSize: 30, color: 'black' }}>Notification</Text>

      <FlatList
        data={People}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer} onPress={() => (navigation.navigate('Chat', { data: item, email: email }))}>
            <Image style={{ width: 30, height: 30 }} source={require('../../assets/user.png')}></Image>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black', left: 10 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      // keyExtractor={(item) => item.id} // Sir we can replace this with id currently i am not set id
      />
      <View style={styles.Bottom}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faHome} size={30}></FontAwesomeIcon>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faMessage} size={30}></FontAwesomeIcon>
        </TouchableOpacity>
      </View>

    </View>


  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,


  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: Ww - 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#fff',
    margin: 5,
  },
  Bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: Ww - 40,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 20,
    position: 'absolute',
    bottom: 3,
    left: 20,
  },
})