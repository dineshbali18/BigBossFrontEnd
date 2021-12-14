import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, TextInput, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { Actions } from 'react-native-router-flux';
import Home from '../Home';
import { signin } from './helper/authCalls';

export default function SignIn(props) {
    const [homepage,setHomePage]=useState(0);
    const [user,setUser]=useState({
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {email,password}=user;

    const handleChangeEmail=(text)=>{
        setUser({...user,email:text})
    }
    const handleChangePassword=(text)=>{
        setUser({...user,password:text})
    }

    const onSubmit=()=>{
        console.log("hhehhhhhh")
        signin({email,password}).then(data=>{
            if(data.error){
                setUser({...user,error:data.error})
            }
            else{
                setUser({...user,
                email:"",
                password:"",
                error:"",
                success:true})
                Actions.home();
            }
        })
    }


    return (
        <>
        <View >
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <View>
      <TextInput
        style={{height: 40}}
        placeholder="Enter Email"
        onChangeText={email => handleChangeEmail(email)}
        defaultValue="text"
        value={email}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Enter Password"
        onChangeText={password => handleChangePassword(password)}
        defaultValue="text"
        value={password}
      />
      <View>
          <Button title='submit' onPress={()=>{onSubmit()}}/>
          </View>
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