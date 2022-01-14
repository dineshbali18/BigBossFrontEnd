import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,ImageBackground,SafeAreaView} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import VoteTelugu from './VoteTelugu'

export default function VoteTelugu(props) {
    
    return (
        <>
        <SafeAreaView>
        {/* <ImageBackground 
        style={{resizeMode: 'cover',width: '100%', height: '100%',zIndex:100}}
        source={{uri:"https://i.imgur.com/Rwk9FrE.png"}} /> */}
        <Image source={{uri:'https://i.imgur.com/Rwk9FrE.png'}} style={{ resizeMode: 'cover', width: '100%', height: '89%',borderRadius:0}}/>
            <Button title="SignUp" onPress={()=>{Actions.signup()}}/>
            <Button title="SignIn" onPress={()=>{Actions.signin()}}/>
      </SafeAreaView>
        </>
    )
}


const votestyles = StyleSheet.create({
    container: {
      marginTop:20,
      padding: 20,
      flex: 1,
      backgroundColor: '#FDFEFE',
    }
  });