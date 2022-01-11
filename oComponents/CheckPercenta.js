import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image} from 'react-native';
import { Platform,StyleSheet, Text, View,ScrollView, Button, AppRegistry, Alert,Image,TouchableOpacity} from 'react-native';

// import VoteTelugu from './VoteTelugu'
import { getContestants1,increVote } from './helper/apicalls';
import { Actions } from 'react-native-router-flux';
import VoteTelugu from './VoteTelugu';
import PieChart from 'react-native-pie-chart';

export default function CheckPercenta() {

    const [contestan,setContestan]=useState([]);
    const [flexDirection, setflexDirection] = useState("column");


    const loadAllProduct = () => {
        getContestants1().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            //   console.log(data);
            setContestan(data.contestants1);
          }
        });
      };

    useEffect(()=>{
        loadAllProduct();
    },[]);

    return (
        <>
        <View style={votestyles.backbutton}>
        
        <Button  title="   go Back" onPress={()=>{Actions.pop()}}/>
        </View>
        {/* <Text>Percentage Section</Text> */}
        <View style={votestyles.container} >
            {
                contestan.map((conte,index)=>{
                    return(
                    <>
                    <PreviewLayout
                    key={{index}}
      values={[conte.name+conte.votes]}
      selectedValue={flexDirection}
      setSelectedValue={setflexDirection}
    ></PreviewLayout>
                    </>
                    )
                })
            }
        </View>
        
        </>
    )
}

const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      {values.map((value) => (
        <TouchableOpacity
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[
            styles.button,
            selectedValue === value && styles.selected,
          ]}
        >
          <Text
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={[styles.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
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