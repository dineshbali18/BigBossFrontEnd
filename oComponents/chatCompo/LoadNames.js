import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
// const { performance } = require('perf_hooks');
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet,TextInput, Text,Image, View,ScrollView, Button, AppRegistry, Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import io from 'socket.io-client'
import tw from 'tailwind-react-native-classnames'
const Connection_Port ='https://chatservicebigboss.herokuapp.com/';

let socket;
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
const {getRooms}=require('./helper/chat')


export default function LoadNames(props) {
    // console.log(props)
    const [rooms,setRooms]=useState([])
    const[token,setToken]=useState(props.token);
  const[userId,setUserId]=useState(props.userId)

    useEffect(()=>{
        getRooms().then((data)=>{
            // console.log(data)
            setRooms(data);
        })
    },[])

    const gotoChat=(r_name)=>{
        Actions.commonchat({userId,r_name})
    }

    return (
        <>
        <SafeAreaView>
            <Text>heheh................</Text>
            <Text>{userId}</Text>
            {rooms.map((room,index)=>{
                return(
                    <TouchableOpacity key={index} style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{gotoChat(room.name)}} >
                    <Text style={tw`text-white font-bold`}>{  room.name}</Text>
                    {/* <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/> */}
                    </TouchableOpacity>
                )
            })}
        </SafeAreaView>
        </>
    )
}