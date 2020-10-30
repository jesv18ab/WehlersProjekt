
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';

let array = null;

const fireBaseConfig = {
  apiKey: "AIzaSyAhRw12K9lOP1p72bY_Pqpol5VjohVULAM",
  authDomain: "reactnativedbtrial.firebaseapp.com",
  databaseURL: "https://reactnativedbtrial.firebaseio.com",
  projectId: "reactnativedbtrial",
  storageBucket: "reactnativedbtrial.appspot.com",
  messagingSenderId: "747875825609",
  appId: "1:747875825609:web:6fb0e13809e67b47151a18",
  measurementId: "G-DBNS46ZC4T"
};
// Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
// Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).
if (!firebase.apps.length) {
  firebase.initializeApp(fireBaseConfig);
}



export default class App extends React.Component {
  state = {
arrayTest: null,
arrayOfMeta: null
  };


componentDidMount() {
  this.fetchData();


//  var entries = JSON.parse(result.response);
 // console.log(entries);
}

  makeState = data => {
    this.setState({dataRetrieved: data});
    const values = Object.values(this.state.dataRetrieved);
    //this.reformatArray(values);
  };


    fetchData = async() =>{
      let response = await fetch('http://13.69.31.213/wh/getall');
      let result = await response.json();
      var entries = JSON.parse(result.response);
      const values = Object.values(entries);
      var arr =[];
      var arrayOfMeta=[];

      values.map((item, index) => {
        if (item.Record.product_brand === "Whelers" || item.Record.product_brand === "Wehlers"){
          arr.push(item)
        }
      });
      arr.map((item, index) => {
        item.Record.metadata = JSON.parse(item.Record.metadata);
        var meta = (item.Record.metadata[0]);
        arrayOfMeta.push(meta);
      });

      console.log("Dette er meta");
      console.log(arrayOfMeta[1].event_name);
      this.setState({arrayTest: arr});
      this.setState({arrayOfMeta: arrayOfMeta});
    };


  render(){
    if(this.state.arrayTest === null ||this.state.arrayOfMeta === null){
      return (
          <View></View>
      )
    }
  else{
      return (
     <View style={styles.container} >
      <View>
        <Text>Dette er hele objektet</Text>
        {this.state.arrayTest.map((item, key) => (
           <View style={styles.listItem} key={key}>
            <Text>{item.Key}</Text>
            <Text>{item.Record.product_designer}</Text>
            <Text>{this.state.arrayOfMeta[key].event_name}</Text>
             </View>
        ))}
      </View>

     </View>
  );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    width: '100%',
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: '1%'
  },
  itemList: {
    marginTop: 20,
    width: '80%',
  },
});
