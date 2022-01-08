import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
// import VoteTelugu from './VoteTelugu'
import { getContestants,increVote,loadUserVotes,decrement } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';

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
        }
      })
    }

    const loadAllContestants = () => {
        getContestants().then(data => {
          // console.log("------------------------")
          // console.log(data);
          // console.log("----------------------")
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
        loadAllContestants();
        loadVotes();
    },[]);

      const Voteleft=()=>{
        if(votesleft>0){
        setVotesleft(votesleft-1)
        }
      }

    return (
        <>
        <View style={votestyles.backbutton}>
        
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
            <View style={votestyles.container}>
            {/* <View><Text>{votesleft>0?<Text>Votes Left:{votesleft}</Text>:<Text>No Votes Left today</Text>}</Text></View> */}
            <View><Text>Votes Left:{votesleft}</Text></View>

      {BBMates.map((conte, index) => {
            return (
                <View style={styles.container}>
                <Text key={index}>{conte.name}</Text>
                <Button color="#ff5c5c"  title="Vote" onPress={()=>{castVote(conte._id),Voteleft(),decre()}}/>
                </View>
            );
          })}
        </View>
        <Button color="#ffa801" title="Check Percentages" onPress={()=>{goToCheckPercenta()}}></Button>
        </>
    )
}

const styles=StyleSheet.create({
    container:{
        marginBottom:20,
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
        marginTop:1,
        width:100,
    }
  });