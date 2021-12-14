import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
// const { performance } = require('perf_hooks');
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert} from 'react-native';
import VoteTelugu from './VoteTelugu'
import { Actions } from 'react-native-router-flux';


export default function Home() {


 const [myArray, setMyArray] = useState([]);
 const [open, setOpen] = useState(false);
 const [value, setValue] = useState(null);

  const [items,setItems]=useState([
    {label: 'Telugu', value: 'telugu'},
    {label: 'Hindi', value: 'hindi'},
    {label: 'Tamil', value: 'tamil'},
]);

// "react-native-gesture-handler": "~1.10.2",
//     "react-native-image-picker": "^4.3.0",
//     "react-native-reanimated": "^2.2.4",
//     "react-native-router-flux": "^4.3.1",
//     "react-native-safe-area-context": "^3.3.2",


  return (
    <>
    <View style={styles.container}>
      <Text>Choose your Language</Text>
      <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
<Text/>
<Text/>
</View>
<Button color="#ff5c5c"  title="   Vote   " onPress={()=>{Actions.votetelugu()}}/>

      <StatusBar style="auto" />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
