import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
// const { performance } = require('perf_hooks');
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert} from 'react-native';
import VoteTelugu from './VoteTelugu'
import { Actions } from 'react-native-router-flux';
import { focusProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


export default function Home(props) {
  console.log("/////////////////////////////")
  console.log(props);
  const[token,setToken]=useState(props.token.current);
  const[userId,setUserId]=useState(props.userId.current)


 const [myArray, setMyArray] = useState([]);
 const [open, setOpen] = useState(false);
 const [value, setValue] = useState(null);

  const [items,setItems]=useState([
    {label: 'Telugu', value: 'telugu'},
    {label: 'Hindi', value: 'hindi'},
    {label: 'Tamil', value: 'tamil'},
]);


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
<Button color="#ff5c5c"  title="   Vote   " onPress={()=>{console.log("dinu home props"),Actions.votetelugu({token,userId})}}/>

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
