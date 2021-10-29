import React, { Component } from "react";
import { StyleSheet, Text, View ,Image} from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("DashboardScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.loadingIcon} source={require("../assets/loading.png")}></Image>
        <Text style={styles.loadintText}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#7a7a77"
  },
  loadingIcon:{
    width:150,
    height:250,
    marginLeft:"40%",

  },
  loadintText:{
    fontSize:30,
    fontWeight:"bold",
    color:"white"
  }
});
