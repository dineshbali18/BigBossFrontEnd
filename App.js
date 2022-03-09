import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';

import Routes from "./Routes"
import { StyleSheet, Text, View,ScrollView, Button, AppRegistry} from 'react-native';
import Home from './oComponents/Home';
import VoteTelugu from './oComponents/VoteTelugu'
import CheckPercenta from './oComponents/CheckPercenta';
import { Router, Scene } from 'react-native-router-flux'

import BeginHome from './oComponents/authComponents/BeginHome'
import SignIn from './oComponents/authComponents/SignIn'
import SignUp from './oComponents/authComponents/SignUp'
import CommonChat from './oComponents/chatCompo/CommonChat';
import LoadNames from './oComponents/chatCompo/LoadNames';
import Admin from './oComponents/Admin';
// import TermsAndConditions from './oComponents/authComponents/TermsAndConditions';


export default function App() {
  return (
    <>
      <Router>
          <Scene key = "root">
          <Scene key = "loadnames" component = {LoadNames} title = "Initial"   hideNavBar={true} />
          <Scene key = "commonchat" component = {CommonChat} title = "Initial"  hideNavBar={true} />
          <Scene key = "beginhome" component = {BeginHome} title = "Initial" initial={true} hideNavBar={true} />
          <Scene key = "admin" component = {Admin} title = "Admin Page" />
          <Scene key = "signup" component = {SignUp} title = "SIGN UP" />
          <Scene key = "signin" component = {SignIn} title = "SIGN IN" />
          <Scene key = "home" component = {Home} title = "Home" />
          <Scene key = "votetelugu" component = {VoteTelugu} title = "Vote Telugu" />
          <Scene key="checkpercenta" component={CheckPercenta} title="Check Percentage"  />
       </Scene>
    </Router>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});