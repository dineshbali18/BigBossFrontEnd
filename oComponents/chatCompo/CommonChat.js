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

const {getNameById}=require('./helper/chat')


export default function CommonChat(props) {

const token=useRef(props.token);
  const [userId,setUserId]=useState(props.userId.current)
 const [name,setName]=useState('')
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
    getNameById(userId)
      .then(data=>{
          // console.log(data)
          setName(data.name);
        }
      )
    socket.on('recieve-datadb',(data)=>{
      setMsgList(data[0].msgs)
    })
  },[])
  

  
  const sendMessage=()=>{
    let messageContent={
      room:props.r_name,
      content:{
      author:name,
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
      <Button  title="  go Back" onPress={()=>{goback()}}/>
      <Text style={tw`ml-10 font-bold text-2xl`}> {props.r_title}</Text>
      <View style={tw`m-4 h-5/6`}>
      <ScrollView >
      {/* {console.log(name)} */}
          {msgList.map((payload,index)=>{
            // console.log(payload)
              return(
                <View  style={tw`border-black border-2 border-yellow-600 mt-4 h-8 mx-4  flex-row`}>
                  <Text style={tw`text-base text-green-500 font-bold`}>{payload.author} </Text>
                  <Text style={tw`text-base font-bold`}>  {payload.message}</Text>
                </View>
              )
          })}
          </ScrollView>
      
      <View style={tw`flex-row top-0 bottom-0 right-0`}>
      <TextInput
        style={{height: 40,borderColor:"orange",borderRadius:50,paddingLeft:20}}
        placeholder="Enter message"
        onChangeText={(msg) => setMsg(msg)}
        defaultValue="text"
        value={msg}
      />
      <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-28 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{msg.length!=0&& sendMessage()}} >
          <Text style={tw`text-white font-bold`}>send</Text>
          {/* <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/> */}
          </TouchableOpacity>
      </View>
      </View>
      {/* <TouchableOpacity style={tw`h-10 w-32 rounded-full ml-48 border-indigo-600 bg-indigo-600 justify-center pl-10 flex-row p-2`} onPress={()=>{goback()}} > */}
          {/* <Text style={tw`text-white font-bold`}>  go back </Text> */}
          {/* <Image source={require('../../images/next.png')} style={tw`h-5 w-5 mt-1 ml-1`}/> */}
          {/* </TouchableOpacity> */}
      </SafeAreaView>
     </>
  );
}
