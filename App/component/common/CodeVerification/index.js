import React, { Component } from "react";
import {
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";
import {
  BLACK_ALPHA,
  WHITE,
  APP_COLOR,
  DARK_APP_COLOR,
  BLACK
} from "../../constant/Color";
import AntDesign from "react-native-vector-icons/AntDesign";
import PhoneInput from "react-native-phone-input";
import strings from "../../../screens/SignUp/SignUpLocalization";

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


const CodeVerification = ({
  phoneNumber,
  phoneNumberEditText,
  onPressPhoneNumberChange,
  verifyCodeEditText,
  onChangeCodeText,
  OnVerifyPress,
  onResendCodePress,
  lan,
}) => (
  <SafeAreaView
    style={{
      alignContent: "center",
      justifyContent: "center",
      position: "absolute",
      backgroundColor: BLACK_ALPHA,
      height: HEIGHT,
      width: WIDTH
    }}
    
  >
  <ScrollView>
    <TouchableOpacity
      style={{
        height: HEIGHT / 1.2,
        width: WIDTH / 1.2,
        backgroundColor: WHITE,
        alignSelf: "center",
        justifyContent: "center"
      }}
      onPress={()=>Keyboard.dismiss()}
      activeOpacity={1}
    >
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={40}>
      <Text
        style={{
          alignSelf: "center",
          padding: 10,
          fontSize: 18,
          textAlign: "center"
        }}
      >
        {lan.codesentto}{" "}
        <Text style={{ color: "green" }}> {" " + phoneNumber} </Text> {"\n"}
        {lan.pleaseentervarificationcode}
      </Text>
      <AntDesign
                  name={"checkcircleo"}
                  size={40}
                  color={"green"}
                  style={{ padding: 5, alignSelf: "center" }}
                />
      <TextInput
        style={{
          alignSelf: "center",
          borderColor: BLACK_ALPHA,
          textAlign: "center",
          borderWidth: 1,
          borderRadius: 5,
          height: 50,
          margin: 20,
          width: 200
        }}
        value={verifyCodeEditText}
        placeholder= {lan.entercode}
        placeholderTextColor={BLACK_ALPHA}
        onChangeText={text => onChangeCodeText(text)}
      />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          height: 50,
          justifyContent: "center",
          backgroundColor: DARK_APP_COLOR,
          borderRadius: 5,
          borderColor: APP_COLOR,
          borderWidth: 1
        }}
      onPress={OnVerifyPress}>
        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            padding: 10,
            fontSize: 18
          }}
        >
          {lan.verify}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{alignSelf:'center'}} onPress={onResendCodePress}>
      <Text
        style={{
          alignSelf: "center",
          padding: 10,
          fontSize: 18,
          textAlign: "center",
          color:"blue",
          fontWeight:"600"
        }}
      >
      {lan.resend}
      </Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: "center",
          padding: 10,
          fontSize: 18,
          textAlign: "center",
          color:BLACK
        }}
      >
      {lan.or}
      </Text>

      <Text
          style={{
            padding: 5,
            fontSize: 20,
            color:BLACK_ALPHA,
            alignSelf:'center',
            fontWeight:"600"
          }}
        >
          {lan.changephonenumberhere}
        </Text>
        <PhoneInput
                  style={{width:WIDTH/1.5,height:50,borderRadius:5,backgroundColor:WHITE,
                  borderColor:BLACK_ALPHA,borderWidth:1,alignSelf:"center",margin:10}}
                  ref={ref => {
                    this.phone = ref;
                  }}
                  value={phoneNumberEditText}
                />
                 </KeyboardAvoidingView>

      <TouchableOpacity
        style={{
          alignSelf: "center",
          height: 50,
          justifyContent: "center",
          backgroundColor: DARK_APP_COLOR,
          borderRadius: 5,
          borderColor: APP_COLOR,
          borderWidth: 1
        }}
      onPress={()=>{
          if(this.phone.isValidNumber()){
          onPressPhoneNumberChange(this.phone.getValue())
      }
      else{
          Alert.alert(strings.phonealert)
      }
      
      }}>

        <Text
          style={{
            textAlign: "center",
            alignSelf: "center",
            padding: 10,
            fontSize: 18
          }}
        >
          {lan.cancel}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);

export default CodeVerification;
