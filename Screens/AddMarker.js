import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity,Text,Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-gesture-handler';
import Constants from 'expo-constants';


export default function AddMarker({navigation}) {
  const [latitude,setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [title,setTitle] = useState()
  const [description,setDescription] = useState() 

  async function Add() {
    fetch("https://mobile.ect.ufrn.br:3003/markers", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF",
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        title: title,
        description: description,
      }),
    });
    navigation.navigate('Mapa')
    alert('Localização adicionada com sucesso!');
  };
    
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map} initialRegion={{
        latitude: -5.82688,
        longitude: -35.2328,
        latitudeDelta: 0.700,
        longitudeDelta: 0.100,
      }}
        onPress={(event) => {
          setLatitude(event.nativeEvent.coordinate.latitude)
          setLongitude(event.nativeEvent.coordinate.longitude)
        }}>
        <Marker
        coordinate = {{latitude:latitude,longitude:longitude}}
        title={title}
        description={description}/>
    </MapView>
    <View>
    <Text style={styles.titulo}>Título</Text>
        <TextInput style={styles.title} onChangeText={setTitle} placeholder='Título'></TextInput>
        <Text style={styles.descricao}>Descrição</Text>
        <TextInput style={styles.description}  placeholder='Descrição'onChangeText={setDescription}></TextInput>
    </View>
    <TouchableOpacity style={styles.addButton} onPress={()=>Add()}>
          <Text style={styles.Buttontext}>Adicionar</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '78%',
    position:'relative',
  },
  addButton:{
    backgroundColor:'lightblue',
    paddingHorizontal:10,
    borderRadius:10,
    borderWidth:0.5,
  },
  Buttontext:{
    color:'white',
    fontSize:42,
    fontWeight:'bold',
    textAlign:'center',
    justifyContent:'center',
    alignContent:'center',

  },
  titulo:{
    margin:2,
    marginLeft:5,
  },
  title:{
    width:Dimensions.get('screen').width,
    backgroundColor:'white',
    padding:5,
    borderColor:'black',
    borderWidth:1,
    marginBottom:2,
  },
  descricao:{
    margin:2,
    marginLeft:5,
  },
  description:{
    backgroundColor:'white',
    width:Dimensions.get('screen').width,
    padding:5,
    borderColor:'black',
    borderWidth:1,
  },
});