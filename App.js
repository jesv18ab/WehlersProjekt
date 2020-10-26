
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';


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
    dataRetrieved: []
  };

  componentDidMount() {
    fetch('http://13.69.31.213/wh/getall')
        .then(response => response.json() )
        .then(data => this.setState({dataRetrieved: data})  )
        .catch(error => console.log(error));
  }
/*
  retrieveData = () =>{
    fetch('http://13.69.31.213/wh/getall')
          .then(response => console.log(JSON.parse(response)) )
          .then(data => this.setState({dataRetrieved: data})  )
          .catch(error => console.log(error));
  };*/

  /*sendData = () => {
    const list = this.state.dataRetrieved;
    firebase.database().ref(`/Wehlers/`).push({list});
  };*/

  render(){
    const values =Object.values(this.state.dataRetrieved);
    const keys = Object.keys(this.state.dataRetrieved);
   // console.log("Dette er data");
    //console.log(keys);
  return (
     <View>
      <View style={[styles.itemList, {marginLeft: '10%'}]}>
        {values.map((item, index) => (
            <TouchableOpacity data="test" style={{marginLeft: '20%'}}
                              key={index}
                              style={styles.listItem}>
              <Text style={{fontSize: 16}}>{index}</Text>
            </TouchableOpacity>
        ))
        }
      </View>
     </View>
  );
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
