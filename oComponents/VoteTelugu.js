import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect, useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity,FlatList} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { getContestants,increVote,loadUserVotes,decrement } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import { Dimensions, TouchableHighlight} from 'react-native';
import tw from 'tailwind-rn'





export default function VoteTelugu(props) {

  // console.log(props);

  const goToCheckPercenta = () => {
    Actions.checkpercenta()
 }

    const [votesleft,setVotesleft]=useState(0);
    const [BBMates,setBBMates]=useState([])




    const loadVotes=()=>{
      loadUserVotes(props.token,props.userId)
      .then(data=>{
        if (data.error) {
          console.log(data.error);
        } else {
          setVotesleft(data.remaining_votes);
          setBBMates([])
        }
      })
    }
    

    const loadAllContestants = async() => {
        await getContestants().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
           setBBMates(data.contestants1);
          }
        });
      };
    
    const castVote=(id)=>{
      if(votesleft>0){
        increVote(props.userId,id,props.token);
      }
    }

    const decre=()=>{
      if(votesleft>0){
      decrement(props.token,props.userId);
      }
    }

    useEffect(()=>{
      const f1=async()=>{
        await loadAllContestants().then(loadVotes())
      }
      f1();
    },[]);


      const Voteleft=()=>{
        if(votesleft>0){
        setVotesleft(votesleft-1)
        }
      }

    return (
        <>
        {BBMates.length==0?<>
        <Text>votesleft : {votesleft}</Text>
        <Button  title="Go to Votes" onPress={()=>{BBM1.current=BBM1}}/>
        </>:
        <>
        <View >
        
        <Button  title="  go Back" onPress={()=>{Actions.pop()}}/>
        </View>
            <View style={tw("flex flex-row")} >
            <View><Text>{votesleft>0?<Text>                         Votes Left:{votesleft}</Text>:<Text>No Votes Left today</Text>}</Text></View>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
      <View>
              <FlatList
  data={BBMates}
  renderItem={({ item }) => {
    return (
      <TouchableHighlight
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width * 0.2,
                height: Dimensions.get('window').width * 0.2,
                backgroundColor:'#f00',
                justifyContent: 'center',
                alignItems: 'center',
                margin:20,
                border:'solid',
                marginLeft:25
              }}
              underlayColor = '#ccc'
              onPress = { () => alert('Yaay!') }
            >
              <Text>{item.name}</Text>
            </TouchableHighlight>
    );
  }}
  keyExtractor={conte => conte._id}
  horizontal={true}
/>
        </View>
        </View>
        <Button color="#ffa801" title="Check Percentages" onPress={()=>{goToCheckPercenta()}}></Button>
        </>
}
        </>
    )
}
