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


export default function CommonChat(props) {
  // console.log(props.userId)//user id 
  // console.log(props.r_name)//room name
const[token,setToken]=useState(props.token);
  const[userId,setUserId]=useState(props.userId)


  const[msg,setMsg]=useState("");
 const  [msgList,setMsgList]=useState([]);
 

  useEffect(() => {
   socket=io(Connection_Port,{transports: ['websocket', 'polling', 'flashsocket']})
  //  console.log(socket)
  },[])


  useEffect(()=>{
    socket.on('recieve-msg',(data)=>{
      setMsgList([...msgList,data])
    })
  });

  const connectToRoom=()=>{
  socket.emit('join-room',props.r_name);
  socket.emit('get-datadb',props.r_name)
}

  useEffect(()=>{
    connectToRoom();
    socket.on('recieve-datadb',(data)=>{
      setMsgList(data[0].msgs)
    })
  },[])
  

  
  const sendMessage=()=>{
    let messageContent={
      room:props.r_name,
      content:{
      author:props.userId,
      message:msg
      } 
    }
    socket.emit('send-message',messageContent);
    // setMsgList([...msgList,messageContent.content])
    setMsg("");
  }

  const goback=()=>{
      Actions.loadnames({token,userId})
  }

  return (
      <>
      <SafeAreaView>
      <Text>chating App{msgList.length}</Text>
      <View>
        {/* {msgList} */}
          {msgList.map((payload,index)=>{
            // console.log(payload)
              return(
                  <Text>{payload.author}:{payload.message}</Text>
              )
          })}
      </View>
      <View>
      <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20}}
        placeholder="Enter message"
        onChangeText={(msg) => setMsg(msg)}
        defaultValue="text"
        value={msg}
      />
      <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{msg.length!=0&& sendMessage()}} >
          <Text style={tw`text-white font-bold`}>  send </Text>
          {/* <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/> */}
          </TouchableOpacity>
      </View>
      <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{goback()}} >
          <Text style={tw`text-white font-bold`}>  go back </Text>
          <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/>
          </TouchableOpacity>
      </SafeAreaView>
     </>
  );
}
