
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
let array = null;


export default class App extends React.Component {
  //State variabler for klassen
  state = {
  arrayTest: null,
  arrayOfMeta: null
  };

//Så snart komponenten mountes, skal fetch metoden køre
componentDidMount() {
  this.fetchData();
}
//Fetch data metode:
//Først bruges fetch metoden til at hente data
//Vi parser først resultatet af fetchen
  //Derefter hentes værdierne fra objekterne. Disse smides ind i et array - "values"
    fetchData = async() =>{
      let response = await fetch('http://13.69.31.213/wh/getall');
      let result = await response.json();
      var entries = JSON.parse(result.response);
      const values = Object.values(entries);
      var arr =[];
      var arrayOfMeta=[];
      console.log(values)
      //Her looper vi igennem array'et og smider alle objekter, som har product_name = wehlers -
      // ind i et nyt array for at sortere green cotton fra wehlers
      //Vi laver uppercase for at ignore eventuelle. problemer med små og store bogstaver
      values.map((item, index) => {
        if (item.Record.product_brand.toUpperCase() === "WHELERS" || item.Record.product_brand.toUpperCase() === "WEHLERS"){
          arr.push(item)
        }
      });
      //Her tager vi fat i den attribut, som hedder metadata
      //Først parses denne - ligesom tidligere
      //Derefter laver vi en variabel som indeholder hvert meta objekt og sætter dette ind i et array
      //Som kun er dedikeret til metadata-informationer
      arr.map((item, index) => {
        item.Record.metadata = JSON.parse(item.Record.metadata);
        var meta = (item.Record.metadata[0]);
        arrayOfMeta.push(meta);
      });
      //Slutteligt sættes to state arrays til værdierne af vores filtrering
      this.setState({arrayTest: arr});
      this.setState({arrayOfMeta: arrayOfMeta});
    };


  render(){
    //Såfremt state arrays er tomme, skal vi ikke printe noget
    if(this.state.arrayTest === null ||this.state.arrayOfMeta === null){
      return (
          <View></View>
      )
    }
  else{
    //Ellers printer vi data fra de to arrays ved brug af map
      return (
     <View style={styles.container}>
       <Text style={{marginTop: 50}}>Dette er hele objektet</Text>
       <ScrollView style={styles.scrollView}>
        {this.state.arrayTest.map((item, key) => (
           <View style={styles.listItem} key={key}>
            <Text>{item.Key}</Text>
            <Text>{item.Record.product_designer}</Text>
             </View>
        ))}
         {this.state.arrayOfMeta.map((item, key) => (
             <View style={styles.listItem} key={key}>
               <Text>Meta</Text>
               <Text>{item.Key}</Text>
               <Text>{item.event_name}</Text>
             </View>
         ))}
      </ScrollView>
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
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
});
