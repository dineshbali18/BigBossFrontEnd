import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { getContestants,increVote } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';

export default function VoteTelugu(props) {

  const goToCheckPercenta = () => {
    Actions.checkpercenta()
 }


    const [BBMates,setBBMates]=useState([])
    
    const loadAllProduct = () => {
        getContestants().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            //   console.log(data);
            setBBMates(data.contestants1);
          }
        });
      };

    const castVote=(id)=>{
        increVote(id);
    }


    useEffect(()=>{
        loadAllProduct();
    },[]);

    return (
        <>
        <View style={votestyles.backbutton}>
        
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
            <View style={votestyles.container}>
      {BBMates.map((conte, index) => {
            return (
                <View style={styles.container}>
                <Text key={conte.name}>{conte.name}</Text>
                <Button color="#ff5c5c"  title="Vote" onPress={()=>{castVote(conte._id)}}/>
                </View>
            );
          })}
        </View>
        <Button color="#ffa801" title="Check Percentages" onPress={()=>{goToCheckPercenta()}}></Button>
        </>
    )
}

const styles=StyleSheet.create({
    container:{
        marginBottom:20,
    }
})

const votestyles = StyleSheet.create({
    container: {
        marginTop:20,
      padding: 20,
      flex: 1,
      backgroundColor: '#fff',
    },
    backbutton:{
        marginTop:1,
        width:100,
    }
  });