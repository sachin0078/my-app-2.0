import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      priority:"lp",
      taskName:"",
      description:"",
      deadline:"",
      dropdownHeight: 40
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

async addTask(){
  if(this.state.taskName && this.state.description && this.state.priority && this.state.deadline){
      let taskData={
        priority: this.state.priority,
        taskName: this.state.taskName,
        description: this.state.description,
        deadline: this.state.deadline,
      
        name: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        user_id: firebase.auth().currentUser.uid,
        NoOf_days: 0
      }

      await firebase.database().ref("/tasks/"+Math.random() .toString(36) .slice(2)).set(taskData)
      .then(function(snapshot){})

      
      //this.props.navigate("Feed")
  }
  else{
    Alert.alert(
      "Error",
      "All fields are required!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  
  }
}

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Add Task</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: "High Priority", value: "hp" },
                    { label: "Medium Priority", value: "mp" },
                    { label: "Low Priority", value: "lp" },
                   
                  ]}
                  defaultValue={this.state.priority}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{ backgroundColor: "#2f345d" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  onChangeItem={item =>
                    this.setState({
                      priority: item.value
                    })
                  }
                />
              </View>

              <TextInput
                style={styles.inputFont}
                onChangeText={(text)=>{this.setState({taskName:text})}}
                placeholder={"Enter Task Name"}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={(text)=>{this.setState({description:text})}}
                placeholder={"Description"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />
              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={(text)=>{this.setState({deadline:text})}}
                placeholder={"Enter The Deadline"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="white"
              />

             
                 <View style={styles.submitButton}>
                   <Button title='Add' color='#841584'
                   onPress={()=>{
                     this.addTask()
                   }}> 

                   </Button>
                 </View>

            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7a7a77"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  }
});
