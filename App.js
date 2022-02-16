import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Mapa from './Screens/Mapa';
import AddMarker from './Screens/AddMarker';
const Stack = createStackNavigator();
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= "Mapa" component = {Mapa} options={{headerShown: false}}/>
        <Stack.Screen name= "AddMarker" component = {AddMarker} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}