import React, {useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import { StyleSheet, View, TouchableOpacity,Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Mapa({navigation}) {
  const [markers, setMarkers] = useState([])
  
  useFocusEffect(useCallback(()=>{
    const headersOptions = {
      method: 'GET',
      headers:{
      Authorization: `Bearer ${"vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF"}`
    }
  }  
    async function getData() {
      const res = await fetch('https://mobile.ect.ufrn.br:3003/markers',headersOptions);      
      const markers = await res.json()
      setMarkers(markers);
    }
  getData();
},[]));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.map}  initialRegion={{
    latitude: -5.82688,
    longitude: -35.2328,
    latitudeDelta: 0.700,
    longitudeDelta: 0.100,
    }}>
        {
      markers.map((marker,id) => <Marker
      key={id}      
      coordinate={{latitude:marker.latitude,
            longitude: marker.longitude}}
            title = {marker.title}
            description={marker.description}
         />)
        }
       </MapView>
      <TouchableOpacity style={styles.Add} onPress={()=>navigation.navigate('AddMarker')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    
  },
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position:'absolute',
  },
  Add:{
    width:80,
    height:80,
    borderRadius:40,
    backgroundColor:'lightblue',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'auto',
    marginTop:'175%',
    marginLeft:'70%',
    borderWidth:0.5,
  },
  plus:{
    color:'gray',
    fontSize:70,
  }
});