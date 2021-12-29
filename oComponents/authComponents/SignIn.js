import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, TextInput, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { Actions } from 'react-native-router-flux';
import Home from '../Home';
import { signin } from './helper/authCalls';

export default function SignIn(props) {
    // const [homepage,setHomePage]=useState(0);
    // const [userId,setUserId]=useState(0)
    const userId=useRef(0)
    // const [token,setToken]=useState('');
    const token = useRef('')
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

    // const signIN=()=>{
    //     signin({email,password}).then(data=>{
    //         // console.log("signin call");
    //         // console.log(data);
    //         if(data.error){
    //             setUser({...user,error:data.error})
    //         }
    //         else{
    //             // {console.log(data.user._id)}
    //             setToken(data.token);
    //             setUserId(data.user._id);
    //             setUser({...user,
    //             email:"",
    //             password:"",
    //             error:"",
    //             success:true})
    //             // setHomePage(1);
    //         }})
    // }
    
     const onSubmit = async()=>{
        const data=await signin({email,password})
        if(data.error){
            setUser({...user,error:data.error})
        }
        else{
            // setToken(data.token);
            userId.current=data.user._id;
            token.current=data.token;
            // console.log("aaaaaaaa",token);
            // setUserId(data.user._id);
            setUser({...user,
            email:"",
            password:"",
            error:"",
            success:true})
            
            Actions.home({token,userId});
            // setHomePage(1);
        }
    
    }

    return (
        <>
        {/* {homepage==1?<><Home/></>:
        <> */}
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
      {/* </> */}
        {/* } */}
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