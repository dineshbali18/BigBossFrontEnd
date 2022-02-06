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
const {getRooms,getNameById}=require('./helper/chat')


export default function LoadNames(props) {
    // console.log(props.userId)
    const [rooms,setRooms]=useState([])
    const token=useRef(props.token);
  const userId=useRef(props.userId)
 const [name,setName]=useState('')


    useEffect(()=>{
        getRooms().then((data)=>{
            setRooms(data);
        })
  getNameById(props.userId)
      .then(data=>{
        //   console.log(data)
          setName(data.name);
        }
      )
    },[])

    const gotoChat=(r_name,r_title)=>{
        Actions.commonchat({name,userId,r_name,r_title})
    }

    return (
        <>
        <SafeAreaView>
        <Button  title="  go Back" onPress={()=>{Actions.home({token,userId})}}/>
            <Text style={tw`mt-2 font-bold ml-4`}>Hi,{name}</Text>
            <View>
                <ScrollView>
            {rooms.map((room,index)=>{
                return(
                    <View key={index} style={tw`border-black border-2 border-yellow-600 mt-4 h-24 m-4`}>
                        <Text style={tw`mt-2 font-bold`}>         Title:  {room.title}</Text>
                    <TouchableOpacity key={index} style={tw`h-10 w-32 rounded-full ml-44 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2 mt-2`} onPress={()=>{gotoChat(room.name,room.title)}} >
                    <Text style={tw`text-white font-bold`}>join room</Text>
                    <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/>
                    </TouchableOpacity>
                    </View>
                )
            })}
            </ScrollView>
            </View>
        </SafeAreaView>
        </>
    )
}