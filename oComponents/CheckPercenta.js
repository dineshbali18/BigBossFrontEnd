import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { getContestants1,increVote } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import VoteTelugu from './VoteTelugu';

export default function CheckPercenta() {

    const [contestan,setContestan]=useState([]);

    const loadAllProduct = () => {
        getContestants1().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            //   console.log(data);
            setContestan(data.contestants1);
          }
        });
      };

    useEffect(()=>{
        loadAllProduct();
    },[]);

    return (
        <>
        <View style={votestyles.backbutton}>
        
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <Text>Percentage Section</Text>
        <View style={votestyles.container} >
            {
                contestan.map((conte,index)=>{
                    return(
                    <>
                    <Text>{conte.name}   =   {conte.votes}</Text>
                    <Text></Text>
                    </>
                    )
                })
            }
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
      backgroundColor: '#fff',
    },
    backbutton:{
        marginTop:20,
        width:100,
    }
  });