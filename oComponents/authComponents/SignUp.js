import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, TextInput, View,ScrollView, Button,Text, AppRegistry, Alert,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getotp, sendotp, signup,verifyotp } from './helper/authCalls';



export default function SignUp(props) {
    const [verify,setVerify]=useState(0)
    const [otp,setOtp]=useState("");

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        phoneNum:"",
        error:"",
        success:false
    })

    const {name,email,password,phoneNum}=user;

    const handleChangeName=(text)=>{
        setUser({...user,name:text})
    }
    const handleChangeEmail=(text)=>{
        setUser({...user,email:text})
    }
    const handleChangePassword=(text)=>{
        setUser({...user,password:text})
    }
    const handleChangePhoneNum=(text)=>{
        setUser({...user,phoneNum:text})
    }

    const Submit=()=>{

        if(verify==0){
            setUser({...user,error:"otp verification failed"})
        }
        else{
        setUser({...user,error:false})
        signup({name,email,password,phoneNum}).then(data=>{
            if(data.error){
                setUser({...user,error:data.error})
            }
            else{
                setUser({...user,
                name:"",
                email:"",
                password:"",
                phoneNum:"",
                error:"",
                success:true})
                setOtp("")
            }
        })
    }
}

    const getOtp=()=>{
        getotp({email}).then(data=>{
            if(data.error){
                console.log(data.error);
            }});
    }

    const sendOtp=()=>{
        sendotp({email}).then(data=>{
            if(data.error){
                console.log(data.error);
            }});
        sendotp({email}).then(data=>{
                if(data.error){
                    console.log(data.error);
                }});
    }
    
    const verifyOtp=()=>{
        // console.log("lllooolll")
        verifyotp({email,otp}).then(data=>{
            if(data.error){
                console.log(data.error);
            }
                // console.log("----------------")
                setVerify(1);
                // console.log("----------------")
        });
    }

    return (
        <>
        <View >
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>

        <View style={styles.container}>

        <View>
        <TextInput
        style={{height: 40}}
        placeholder="Enter Your Name"
        onChangeText={text => handleChangeName(text)}
        defaultValue="text"
        value={name}
        
      />
      <View>
      <TextInput
        style={{height: 40}}
        placeholder="Enter Email"
        onChangeText={email => handleChangeEmail(email)}
        defaultValue="text"
        value={email}
      />
      <View style={votestyles.backbutton}>
      <Button title='get otp' onPress={()=>{getOtp(),sendOtp()}} />
      <TextInput
        style={{height: 40}}
        placeholder="Enter OTP"
        onChangeText={otp => setOtp(otp)}
        defaultValue="text"
        value={otp}
      />
      <Button title='verify otp' onPress={()=>verifyOtp()} />
      </View>
      </View>
      <TextInput
        style={{height: 40}}
        placeholder="Enter Password"
        onChangeText={password => handleChangePassword(password)}
        defaultValue="text"
        value={password}
      />
      <TextInput
        style={{height: 40}}
        placeholder="Enter Phone"
        onChangeText={phoneNum => handleChangePhoneNum(phoneNum)}
        defaultValue="text"
        value={phoneNum}
      />
      <View>
          {console.log("otp value",verify)}
          {verify==0?
          <Text>Otp Not Verified!!!!</Text>:
          <Text>Otp verified</Text>}
          <Button title='submit' onPress={()=>{Submit()}}/>
          </View>
      </View>
      </View>
        
        </>
    )
}

const styles=StyleSheet.create({
    container:{
       justifyContent:'center',
       marginRight:20,
       marginLeft:20

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
        marginTop:0,
        width:150,
    }
  });