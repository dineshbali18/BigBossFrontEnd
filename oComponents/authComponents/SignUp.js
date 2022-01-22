import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, TextInput, View,ScrollView, Button,Text, AppRegistry, Alert,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getotp, sendotp, signup,verifyotp } from './helper/authCalls';
import tw from 'tailwind-react-native-classnames'
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function SignUp(props) {
    const [verify,setVerify]=useState('')
    const [verify1,setVerify1]=useState(0)
    // const [getotp1,setGetOtp]=useState(0);
    const [otp,setOtp]=useState("");
    const [correct,setCorrect]=useState(0)

    const [otpClick,setotpClick]=useState(0);

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        phoneNum:"",
        error:"",
        success:false
    })

    const {name,email,password,phoneNum,error}=user;

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

        if(verify1==0){
            setUser({...user,error:"otp verification failed"})
        }
        else{
        // setUser({...user,error:false})
        signup({name,email,password,phoneNum}).then(data=>{
            if(data.err){
                setUser({...user,error:data.err})
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
                setVerify(0)
                setCorrect(1)
            }
        })
    }
}

    const getOtp=()=>{
        console.log(email);
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
    }
    
    const verifyOtp=()=>{
        // console.log("lllooolll")
        verifyotp({email,otp}).then(data=>{
            if(data.error){
                setVerify(data.error);
                setVerify1(0)
            }
            if(data.sucess){
                // console.log("----------------")
                setVerify(data.sucess);
                setVerify1(1)
            }
        });
    }

    return (
        <>
        <View >
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        <View >
            <Image source={require('../../images/signup11.png')} style={tw`h-36 w-96 mt-1 mb-2`}/>
        </View>
<View style={tw`ml-6 mr-4 mt-0`}>
            <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full`}>
        <Image source={require('../../images/profile-user.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20}}
        placeholder="Enter Your Name"
        onChangeText={text => handleChangeName(text)}
        defaultValue="text"
        value={name}
      />
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-2`}>
        <Image source={require('../../images/at.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20,flexShrink:1}}
        placeholder="Enter  Your  Email. . . . . . ....."
        onChangeText={email => handleChangeEmail(email)}
        defaultValue="text"
        value={email.toString()}
      />
      
      {otpClick==0?
      <TouchableOpacity style={tw`mx-2 my-1 flex-row`} onPress={()=>{getOtp(),setotpClick(1)}} >
      <View style={tw`bg-indigo-600 rounded-full mb-0.5 `}>
          <Text style={tw`text-white font-bold mt-1`}>  Generate Otp  </Text>
          </View>
          </TouchableOpacity>
          :
          <TouchableOpacity style={tw`mx-2 my-1 flex-row`} onPress={()=>{sendOtp()}} >
      <View style={tw`bg-indigo-600 rounded-full mb-0.5 `}>
          <Text style={tw`text-white font-bold mt-1`}>  Get Otp  </Text>
          </View>
          </TouchableOpacity>

        }
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-2`}>
        <Image source={require('../../images/otp.png')}  style={tw`h-6 w-5 mt-3 ml-4 pl-1`}/>
      <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20}}
        placeholder="Enter Otp"
        onChangeText={otp =>setOtp(otp)}
        defaultValue="text"
        value={otp}
      />
      <TouchableOpacity style={tw`bg-indigo-600 rounded-full mt-1 mb-1 ml-24`}  onPress={()=>{verifyOtp()}}>
          <Text style={tw`text-white font-bold mt-1`}>   Verify Otp  </Text>
          </TouchableOpacity>
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-2 mb-4`}>
        <Image source={require('../../images/password.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
        <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20}}
        placeholder="Enter Password"
        onChangeText={password => handleChangePassword(password)}
        defaultValue="text"
        value={password}
      />
      </View>
      <View style={tw`border-black flex-row border-2 border-indigo-600 rounded-full mt-0 mb-4`}>
        <Image source={require('../../images/telephone-call.png')}  style={tw`h-5 w-5 mt-3 ml-4 pl-1`}/>
        <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20}}
        placeholder="Enter Phone Number"
        onChangeText={phoneNum => handleChangePhoneNum(phoneNum)}
        defaultValue="text"
        value={phoneNum}
      />
      </View>
      <View>
          {verify1==0?<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{verify}</Text>
      {verify!=''?
      <Image source={require('../../images/cancel.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/>:<></>
    }
      </View>:<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{verify}</Text>
      {verify!=''?
      <Image source={require('../../images/check-mark.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/>:<></>
    }
      </View>}
      {/* /////// */}
      {error?<View style={tw`flex-row`}>
      <Text style={tw`text-indigo-600 font-bold ml-2`}>{error}  <Image source={require('../../images/cancel.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/></Text>
      </View>:<View style={tw`flex-row`}>
      </View>}
      {correct==1?
          <View style={tw`flex-row`}>
          <Text style={tw`text-indigo-600 font-bold ml-2`}>Account Succesfully created</Text>
          <Image source={require('../../images/check-mark.png')}  style={tw`h-5 w-5 mt-1 ml-4 pl-1`}/>
          </View>:
          <></>
      }

      {/* /////// */}
      <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{Submit()}} >
          <Text style={tw`text-white font-bold`}>  SignUp </Text>
          <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/>
          </TouchableOpacity>
      </View>
      </View>
        </>
    )
}
