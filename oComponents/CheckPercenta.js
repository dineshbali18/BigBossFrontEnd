import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
import {Dimensions, Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity} from 'react-native';
import HorizontalBarGraph from '@chartiful/react-native-horizontal-bar-graph'
import tw from 'tailwind-rn'

// import VoteTelugu from './VoteTelugu'
import { getNamesWithPercentages} from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import VoteTelugu from './VoteTelugu';

const screenWidth = Dimensions.get("window").width;

export default function CheckPercenta() {


    const names=useRef([])
    const percentages=useRef([])

    const goToCheckPercenta = () => {
      Actions.votetelugu()
   }

    const loadAllProduct = () => {
        getNamesWithPercentages().then(data => {
          // console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            names.current=data.names
            percentages.current=data.percentages
          }
        });
      };

        

    useEffect(()=>{
        loadAllProduct();
    },[]);


    return (
      <>
      <View >
        
        <Button  title="  go Back" onPress={()=>{Actions.pop()}}/>
        </View>
 <View>
    <HorizontalBarGraph
      data={percentages.current}
      labels={names.current}
      width={375}
      height={350}
      barRadius={15}
      barColor='green'
      baseConfig={{
        hasYAxisBackgroundLines: false,
        xAxisLabelStyle: {
          rotation: 0,
          fontSize: 12,
          width: 70,
          yOffset: 4,
          xOffset: -15
        },
        yAxisLabelStyle: {
          rotation: 30,
          fontSize: 13,
          prefix: '(%)',
          position: 'bottom',
          xOffset: 15,
          decimals: 2,
          height: 100
        }
      }}
      style={styles.chart}
    />
  </View>
</>
  );
}


const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
    backgroundColor: 'pink'
  }
});

const votestyles = StyleSheet.create({
  container: {
      // marginTop:20,
    // padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  backbutton:{
      marginTop:1,
      width:100,
  }
});