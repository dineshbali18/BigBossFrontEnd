import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
// import VoteTelugu from './VoteTelugu'

export default function VoteTelugu(props) {
    
    return (
        <>
        <View style={votestyles.container}>
        <Text>Welcome To Big Boss Unofficial Voting</Text>
        </View>
        <View>
            <Button title="SignUp" onPress={()=>{Actions.signup()}}/>
            <Button title="SignIn" onPress={()=>{Actions.signin()}}/>
      </View>
        </>
    )
}

const styles=StyleSheet.create({
    container:{
        marginBottom:30,
    }
})

const votestyles = StyleSheet.create({
    container: {
      marginTop:20,
      padding: 20,
      flex: 1,
      backgroundColor: 'yellow',
    },
    backbutton:{
        width:100,
    }
  });