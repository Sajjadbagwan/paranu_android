import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Text,
  TextInput,
  Dimensions,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Linking
} from "react-native";
import {
  Analytics,
  Hits as GAHits
} from 'react-native-google-analytics';
import SignUpStyle from "./SignUpStyle";
import { APP_COLOR, WHITE, SILVER } from "../../component/constant/Color";
import { ScrollView } from "react-native-gesture-handler";
import Zocial from "react-native-vector-icons/Zocial";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PhoneInput from "react-native-phone-input";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import FCM from "react-native-fcm";

import CodeVerification from '../../component/common/CodeVerification'
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import * as Actions from "../../actions"; //Import your actions
import ActivityLoading from "../../component/common/ActivityLoading";
import strings from "../../screens/SignUp/SignUpLocalization";
import * as RNLocalize from 'react-native-localize';

//import strings from './SignUpLocalization'

const route = new Route(url);
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

var languageApp='';
var tokenOfPhone="";
var instance = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" }
});
let ga = this.ga = null;

class SignUp extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      userId: "",
      placeholder:  strings.enterVarificationCode ,
      verificationCode: "",
      codeVerificationPopUp: false,
      loading: false,
      full_name: "",
      city: "",
      mobile_no: "",
      valid: false,
      password: "",
      re_password: "",
      validated: false,
      imageuri: "",
      iconColor: SILVER,
      loadingTextActually: "",
      phone_number:'',
      phone_number_update:'+46',
    };

    this.signUpWithData = this.signUpWithData.bind(this);
  }

  componentWillMount() {
    ga = new Analytics('UA-135620131-1', "ParanuClientID", 1, "Panu_Google_Analytics");
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    this.setState({ city: params.area });
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.getDeviceToken();
    countryInfo=RNLocalize.getLocales();
                switch (countryInfo[0].languageCode){
                  case "sv":
                  strings.setLanguage("sv");
                  languageApp="sv"
                  break;
                  case "it":
                  strings.setLanguage("it");
                  languageApp= "it"
                  break;
                  case "fr":
                  strings.setLanguage("fr");
                  languageApp= "fr"
                  break;
                  case "es":
                  strings.setLanguage("es");
                  languageApp= "es"
                  break;
                  case "de":
                  strings.setLanguage("ddr");
                  languageApp= "ddr"
                  break;
                  case "ru":
                  strings.setLanguage("ru");
                  languageApp= "ru"
                  break;
                  case "pt":
                  strings.setLanguage("es");
                  languageApp= "es"
                  break;
                  case "tt":
                  strings.setLanguage("ru");
                  languageApp= "ru"
                  break;
                  default : strings.setLanguage("en");
                  languageApp= "en"
                  break;
    }
  }

  validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      this.setState({ email: text });
      this.setState({ validated: false });
    } else {
      this.setState({ email: text });
      this.setState({ validated: true });
      // console.log("Email is Correct");
    }
  };


  apiCalling(url, data) {
    return instance.post(url, data);
  }
  async getDeviceToken() {
    registerAppListener(this.props.navigation)
    FCM.getFCMToken().then(function(token) {
      console.log("tokenChecking",token)
      tokenOfPhone=token

    });
  }

  SignUpClick(params) {
    // strings.setLanguage("it");
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      mobile_no: this.phone.getValue()
    });

    if (this.phone.isValidNumber()) {
      setTimeout(() => {
        this.signUpWithData(params);
      }, 200);
    } else {
      Alert.alert(strings.alert1);
    }
  }
  signUpWithData(params) {
    if (
      this.state.password == "" &&
      this.state.email == "" &&
      this.state.full_name == "" &&
      this.state.city == "" &&
      this.state.mobile_no == ""
    ) {
      Alert.alert(strings.alert2);
    } else if (this.state.password.length < 8) {
      Alert.alert(strings.alert3);
    } else if (this.state.password != this.state.re_password) {
      Alert.alert(strings.alert4);
    } else if (this.state.validated == false) {
      Alert.alert(strings.alert5);
    } else if(params.area == strings.noLocation) {
      Alert.alert(strings.locationAlert);
    }else {
      this.setState({ loading: true });

      var photo = {
        uri: this.state.imageuri,
        type: "image/jpeg",
        name: "user.jpg"
      };
      var form = new FormData();
      if (this.state.imageuri != "") {
        form.append("userImage", photo);
      }
      form.append("email", this.state.email);
      form.append("password", this.state.password);
      form.append("name", this.state.full_name);
      form.append("city", params.area);
      form.append("phoneNumber", this.state.mobile_no);
      form.append("coordinates", params.longitude.toString());
      form.append("coordinates", params.latitude.toString());
      form.append("language", languageApp);
      if(tokenOfPhone.length > 0){
        form.append("deviceTokens", Platform.OS === 'ios' ? "IOS: " + tokenOfPhone : "ANDROID: " + tokenOfPhone );
        }


      this.apiCalling("/auth/signup", form)
        .then(response => {
          //Alert.alert(JSON.stringify(response));
          if (response.data.user) {
            this.props.alterJustUser(response.data.user);
          this.props.setToken(response.data.token)
            this.setState({ phone_number:response.data.user.phoneNumber});
            this.setState({ userId: response.data.user._id ,codeVerificationPopUp:true});
            this.setState({ loading: false });

          }


        })
        .catch(error => {
          this.setState({ loading: false });
          Alert.alert(strings.failed, (error.response.data.error.message));
        });
    }
  }

  verifyAccount(id, code) {
    this.setState({ loading: true });
    var data = { id: id, otp: code };
    route.postdata("auth/verification", data).then(async response => {
      if (response.error) {
        Alert.alert("Failed", response.error.message);
        this.setState({ loading: false });
      } else {
        this.setState({ iconColor: "green" });
        this.setState({ loading: false });
        this.props.alterJustUser(response.user);
        this.props.setToken(response.token);
        AsyncStorage.setItem("FIRSTTIME", "true");
        this.props.navigation.push("PetInfoInitial", { recentPath: "home" });
        this.addEvent(response.user._id)
      }
    });
  }

  addEvent = (id) => {
    var gaEvent = new GAHits.Event(
      "User Signup and varified Account successfully",
      "Android",
      `Paranu user Id: ${id}`
    );
    ga.send(gaEvent);
  }

  sendingCodeDone() {
    this.setState({ loading: false, loadingTextActually: "" });
  }

  resendCode(id) {
    this.setState({ loading: true, loadingTextActually: strings.sending });
    var data = { id: id };
    route.postdata("auth/resendcode", data).then(async response => {
      if (response.error) {
        this.setState({ loadingTextActually: "Failed", verificationCode: "" });
        setTimeout(() => {
          this.sendingCodeDone();
        }, 100);
      } else {
        this.setState({ loadingTextActually: strings.sent, verificationCode: "" });
        setTimeout(() => {
          this.sendingCodeDone();
        }, 100);
      }
    });
  }

  imagePickerFromGallary() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5
    }).then(image => {
      this.setState({ imageuri: image.path });
    });
  }
  changePhoneNumber(phone){
    this.setState({loading:true,loadingTextActually:strings.changingPhoneNumber})
    var form = new FormData();
    form.append("phoneNumber", phone);
    route
      .UploadImage(
        "user/" + this.props.userDetail._id,
        form,
        this.props.userToken
      )
      .then(async response => {
        if (response.error) {
          this.setState({ loading: false,loadingTextActually:'' });
          Alert.alert(strings.alert6);
        } else {
          this.props.alterJustUser(response)
          this.setState({phone_number:response.phoneNumber})
          this.resendCode(this.props.userDetail._id)
        }
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <SignUpStyle.WrapperViewVertical behavior="padding" enabled>
        <Image
          source={require("../../assets/images/CatBackground.jpeg")}
          style={styles.LogoStyle}
        />
        <View
          style={{
            position: "absolute",
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: "rgba(248,110,118,0.7)"
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 0.9 }}>
            <ScrollView bounces={false}>
            <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
              <SignUpStyle.WrapperViewHorizontal>
                <Image
                  source={require("../../assets/images/paranuImageWork.png")}
                  style={{ alignSelf: "center" ,width: 270, height: 70}}
                />
              </SignUpStyle.WrapperViewHorizontal>

              <SignUpStyle.ImagePickerContainer>
                <SignUpStyle.ImagePickerButton
                  onPress={() => this.imagePickerFromGallary()}
                >
                  {this.state.imageuri != "" ? (
                    <SignUpStyle.InnerImageView
                      source={{ uri: this.state.imageuri }}
                    />
                  ) : (
                    <SignUpStyle.InnerImageViewWithoutImage>
                      <MaterialIcons
                        name={"add-a-photo"}
                        color={WHITE}
                        size={60}
                      />
                    </SignUpStyle.InnerImageViewWithoutImage>
                  )}
                </SignUpStyle.ImagePickerButton>
                <SignUpStyle.ImagePickerPlusButton
                  activeOpacity={0.9}
                  onPress={() => this.imagePickerFromGallary()}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={WIDTH / 9.5}
                    color={APP_COLOR}
                    style={{ alignSelf: "center" }}
                  />
                </SignUpStyle.ImagePickerPlusButton>
              </SignUpStyle.ImagePickerContainer>

              <SignUpStyle.Textinformation>
                {strings.informationAboutYou}
            </SignUpStyle.Textinformation>
              <SignUpStyle.InPutTextTopTitle>
                {strings.fullName}
              </SignUpStyle.InPutTextTopTitle>
              <SignUpStyle.InPutTextViewStyle>
                <View style={styles.ImageIconStyle}>
                  <FontAwesome name="user" size={30} color="white" />
                </View>
                <TextInput
                  style={styles.InputTextStyle}
                  placeholder= {strings.enteryourfullname}
                  placeholderTextColor="white"
                  onChangeText={full_name => this.setState({ full_name })}
                />
              </SignUpStyle.InPutTextViewStyle>
              <SignUpStyle.InPutTextTopTitle>
                {strings.city}
              </SignUpStyle.InPutTextTopTitle>
              <SignUpStyle.InPutTextViewStyle>
                <View style={styles.ImageIconStyle}>
                  <FontAwesome5 name="city" size={30} color="white" />
                </View>
                <TextInput
                  editable={false}
                  style={styles.InputTextStyle}
                  placeholder={params.area}
                  placeholderTextColor="white"
                  onChangeText={city => this.setState({ city })}
                />
              </SignUpStyle.InPutTextViewStyle>
              <SignUpStyle.InPutTextTopTitle>
                {strings.mobileNumber}
              </SignUpStyle.InPutTextTopTitle>
              <SignUpStyle.InPutTextViewStyle>
                <View style={styles.ImageIconStyle}>
                  <Entypo name="mobile" size={30} color="white" />
                </View>
                <View style={styles.InputTextStyle}>
                <PhoneInput
                  ref={(ref) => this.phone = ref}
                  initialCountry='se'
                  allowZeroAfterCountryCode={false}
                  value={this.state.mobile_no}
                />
                </View>
              </SignUpStyle.InPutTextViewStyle>
              <SignUpStyle.InPutTextTopTitle>
                {strings.email}
              </SignUpStyle.InPutTextTopTitle>
              <SignUpStyle.InPutTextViewStyle>
                <View style={styles.ImageIconStyle}>
                  <Zocial name="email" size={30} color="white" />
                </View>
                <TextInput
                  style={styles.InputTextStyle}
                  placeholder= {strings.enteryouremailaddress}
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  onChangeText={email => this.validate(email)}
                />
              </SignUpStyle.InPutTextViewStyle>
              <SignUpStyle.InPutTextTopTitle>
                {strings.password}
              </SignUpStyle.InPutTextTopTitle>
              <SignUpStyle.InPutTextViewStyle>
                <View style={styles.ImageIconStyle}>
                  <MaterialCommunityIcons
                    name="lock-alert"
                    size={30}
                    color="white"
                  />
                </View>
                <TextInput
                  style={styles.InputTextStyle}
                  placeholder="**********"
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
              </SignUpStyle.InPutTextViewStyle>
              <SignUpStyle.InPutTextTopTitle>
                {strings.confirmPassword}
              </SignUpStyle.InPutTextTopTitle>
              <SignUpStyle.InPutTextViewStyle>
                <View style={styles.ImageIconStyle}>
                  <MaterialCommunityIcons
                    name="lock-alert"
                    size={30}
                    color="white"
                  />
                </View>
                <TextInput
                  style={styles.InputTextStyle}
                  placeholder= {strings.pleaseconfirmyourpassword}
                  placeholderTextColor="white"
                  secureTextEntry={true}
                  onChangeText={re_password => this.setState({ re_password })}
                />
              </SignUpStyle.InPutTextViewStyle>
              <SignUpStyle.RegisterButtonContainerView>
                <TouchableOpacity
                  style={styles.RegisterButtonStyle}
                  onPress={() => this.SignUpClick(params)}
                >
                  <SignUpStyle.RegisterButtonTextStyle>
                    {strings.register}
                  </SignUpStyle.RegisterButtonTextStyle>
                </TouchableOpacity>
              </SignUpStyle.RegisterButtonContainerView>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>

          <SignUpStyle.BottomContainerView>
            <SignUpStyle.BottomTextStyle>
              {strings.haveAnAccount}
            </SignUpStyle.BottomTextStyle>
            <TouchableOpacity
              style={styles.LoginButtonStyle}
              onPress={() =>
                this.props.navigation.navigate("SignIn", {
                  longitude: params.longitude,
                  latitude: params.latitude,
                  area: params.area
                })
              }
            >
              <SignUpStyle.LoginButtonTextStyle>
                {strings.login}
              </SignUpStyle.LoginButtonTextStyle>
            </TouchableOpacity>

          </SignUpStyle.BottomContainerView>

          <SignUpStyle.BottomTextView>
          <SignUpStyle.TextView>
            {strings.agreetermstext} <SignUpStyle.TextLink onPress={ ()=> Linking.openURL('http://www.para.nu/terms-of-use/') } >{strings.termsofuse}</SignUpStyle.TextLink> {strings.and} <SignUpStyle.TextLink onPress={ ()=> Linking.openURL('https://www.para.nu/privacy-policy/') }>{strings.privacypolicy}</SignUpStyle.TextLink>
          </SignUpStyle.TextView>

          </SignUpStyle.BottomTextView>
          {this.state.codeVerificationPopUp && (
            <CodeVerification
            lan = {strings}
              phoneNumber={this.state.phone_number}
              verifyCodeEditText={this.state.verificationCode}
              onChangeCodeText={text => {
                this.setState({ verificationCode: text });
              }}
              phoneNumberEditText={this.state.phone_number_update}
              onPressPhoneNumberChange={phone => this.changePhoneNumber(phone)}
              OnVerifyPress={() =>
                this.verifyAccount(
                  this.props.userDetail._id,
                  this.state.verificationCode
                )
              }
              onResendCodePress={() =>
                this.resendCode(this.props.userDetail._id)
              }
            />
          )}
        </SafeAreaView>
        {this.state.loading && (
          <ActivityLoading textLoading={this.state.loadingTextActually} />
        )}

      </SignUpStyle.WrapperViewVertical>

    );
  }
}

const styles = StyleSheet.create({
  LogoStyle: {
    position: "absolute",
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: "rgba(249,158,158,0.85)"
  },
  InputTextStyle: {
    fontSize: 12,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
    color: "white"
  },
  ImageIconStyle: { left: 10 },
  RegisterButtonStyle: {
    justifyContent: "center",
    height: 60,
    backgroundColor: "white",
    borderRadius: 10
  },
  LoginButtonStyle: { justifyContent: "center", left: 10 },
  LogoImageStyle: {
    height: 70,
    width: 70,
    backgroundColor: "black",
    alignSelf: "center"
  },
  ProfileImageStyle: {
    height: 120,
    width: 120,
    backgroundColor: "black",
    alignSelf: "center",
    borderRadius: 60
  }
});

function mapStateToProps(state, props) {
  //console.log(state);
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    languageOfApp: state.appState.languageOfApp,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
