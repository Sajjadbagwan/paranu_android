import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView,
  Alert,
  Platform,
  Text,
  Linking
} from "react-native";
import FBSDK, { LoginManager, AccessToken } from "react-native-fbsdk";
import FCM from "react-native-fcm";
import {
  Analytics,
  Hits as GAHits
} from 'react-native-google-analytics';

import SignInStyle from "./SignInStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Zocial from "react-native-vector-icons/Zocial";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import CodeVerification from "../../component/common/CodeVerification";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions"; //Import your actions
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
//import strings from './SignInLocalization';

import ActivityLoading from "../../component/common/ActivityLoading";
import { SILVER } from "../../component/constant/Color";
import strings from "../../screens/SignIn/SignInLocalization";
import { registerAppListener } from "../../network/services/Listeners";
import * as RNLocalize from "react-native-localize";
import ParanuLog from "../../Helper/ParanuLog";

const route = new Route(url);
var token = "";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

var tokenOfPhone = "";
var instance = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" }
});
let ga = this.ga = null;


class Login extends Component {
  constructor(props) {
    super(props);
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    this.state = {
      email: "",
      password: "",
      loading: false,
      codeVerificationPopUp: false,
      userId: "",
      placeholder: strings.enterVarificationCode,
      verificationCode: "",
      iconColor: SILVER,
      phone_number: "",
      loadingTextActually: "",
      phone_number_update: "",
      languageOfApp: ""
    };
  }

  componentWillMount() {
    ga = new Analytics('UA-135620131-1', "ParanuClientID Sign", 1, "Panu_Google_Analytics");
  }

  componentDidMount() {
    this.getDeviceToken();
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    countryInfo = RNLocalize.getLocales();
    switch (countryInfo[0].languageCode) {
      case "sv":
        strings.setLanguage("sv");
        this.setState({ languageOfApp: "sv" });
        break;
      case "it":
        strings.setLanguage("it");
        this.setState({ languageOfApp: "it" });
        break;
      case "fr":
        strings.setLanguage("fr");
        this.setState({ languageOfApp: "fr" });
        break;
      case "es":
        strings.setLanguage("es");
        this.setState({ languageOfApp: "es" });
        break;
      case "de":
        strings.setLanguage("ddr");
        this.setState({ languageOfApp: "ddr" });
        break;
      case "ru":
        strings.setLanguage("ru");
        this.setState({ languageOfApp: "ru" });
        break;
      case "pt":
        strings.setLanguage("es");
        this.setState({ languageOfApp: "es" });
        break;
      case "tt":
        strings.setLanguage("ru");
        this.setState({ languageOfApp: "ru" });
        break;
      default:
        strings.setLanguage("en");
        this.setState({ languageOfApp: "en" });
        break;
    }
  }

  async initUser(params) {
    this.setState({ loading: true });
    const fbProfile = (await axios.get(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email,picture.type(large)`
    )).data;
    if (!fbProfile.error) {
      ParanuLog.debug(`fbProfileData ${JSON.stringify(fbProfile)}`);
      const profile = {
        fbId: fbProfile.id,
        name: fbProfile.first_name,
        lastName: fbProfile.last_name,
        email: fbProfile.id + "@fb.com",
        picture: fbProfile.picture.data.url
      };

      this.setState({ loading: false });
      this.loginWithFacebook(
        profile.name,
        profile.email,
        profile.fbId,
        params,
        profile.picture
      );
    } else {
      this.setState({ loading: false });
      ParanuLog.error(`in the fbProfile else ${fbProfile.error}`);
    }
  }
  async getDeviceToken() {
    registerAppListener(this.props.navigation);
    FCM.getFCMToken().then(function(token) {
      tokenOfPhone = token;
    });
  }

  setUserDeviceToken(data) {
    this.setState({ loading: true })
    var form = new FormData();
    if (tokenOfPhone.length > 0) {
      form.append(
        "deviceTokens",
        Platform.OS === "ios"
          ? "IOS: " + tokenOfPhone
          : "ANDROID: " + tokenOfPhone
      );
    }
    form.append("language", this.state.languageOfApp);
    route
      .UploadImage(
        "user/" + this.props.userDetail._id,
        form,
        this.props.userToken
      )
      .then(async response => {
        this.setState({ loading: false });
        if (response._id != undefined) {
          this.addEvent(response._id)
        }
        if (data === "PetInfoInitial") {
          this.props.navigation.push("PetInfoInitial", {
            recentPath: "home"
          });
        } else {
          this.props.navigation.push("TabNavigator");
        }
      });
  }

  addEvent = (id) => {
    var gaEvent = new GAHits.Event(
      "User Loged In",
      "Android",
      `Paranu user Id: ${id}`
    );
    ga.send(gaEvent);
  }

  apiCalling(url, data) {
    return instance.post(url, data);
  }

  loginWithFacebook(userName, email, fbId, params, picture) {
    ParanuLog.debug("in the login With Facebook");
    this.setState({ loading: true });
    var form = new FormData();
    form.append("name", userName);
    form.append("userImage", picture);
    form.append("facebookId", fbId);
    form.append("email", email);
    form.append("city", params.area);
    form.append("sex", "male");
    form.append("phoneNumber", "+9212345678");
    form.append("coordinates", params.longitude.toString());
    form.append("coordinates", params.latitude.toString());

    if (tokenOfPhone.length > 0) {
      form.append(
        "deviceTokens",
        Platform.OS === "ios"
          ? "IOS: " + tokenOfPhone
          : "ANDROID: " + tokenOfPhone
      );
    }
    form.append("language", this.state.languageOfApp);

    this.apiCalling("/auth/fbsignin", form)
      .then(response => {
        ParanuLog.debug(`idOfPck notnull ${JSON.stringify(response.data)}`);
        this.props.alterJustUser(response.data.user);
        this.props.setToken(response.data.token);

        var userId = response.data.user._id;
        var token = response.data.token;

        route
          .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
          .then(async responses => {
            this.setState({ loading: false });
            if (responses.error) {
              Alert.alert(strings.internetissue);
            } else {
              if (responses.pets < 1 || responses.interest < 1) {
                this.props.navigation.push("PetInfoInitial", {
                  recentPath: "home"
                });
              } else {
                this.props.setYourPet(responses.pets);
                this.setUserDeviceToken();
              }
            }
          });
      }).catch(error => {
        ParanuLog.error(`fbLogin ${JSON.stringify(error)}`);
        this.setState({ loading: false });
      });
  }

  loginWithData() {
    ParanuLog.debug("in the LoginWithData");
    this.setState({ loading: true });
    var credentials = {
      email: this.state.email,
      password: this.state.password
    };
    ParanuLog.debug("start routing");
    route
      .postdata("auth/login", credentials)
      .then(async response => {
        ParanuLog.debug(`in the response ${JSON.stringify(response)}`);
        if (response.error) {
          Alert.alert(strings.alert2);
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false });
          if (response.user.verified == "1") {
            this.props.alterJustUser(response.user);
            this.props.setToken(response.token);
            this.getProfileData();
          } else if (response.user) {
            this.props.alterJustUser(response.user);
            this.props.setToken(response.token);
            this.setState({
              loading: false,
              phone_number: response.user.phoneNumber,
              codeVerificationPopUp: true,
              userId: response.user._id
            });
          }
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        ParanuLog.error(`loginWithData: ${JSON.stringify(error)}`);
      });
  }

  verifyAccount(id, code) {
    this.setState({ loading: true });
    var data = { id: id, otp: code };
    route
      .postdata("auth/verification", data)
      .then(async response => {
        if (response.error) {
          Alert.alert(strings.failed, response.error.message);
          this.setState({ loading: false });
        } else {
          this.setState({ iconColor: "green" });
          this.setState({ loading: false });
          this.props.alterJustUser(response.user);
          this.props.setToken(response.token);
          this.getProfileData();
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        ParanuLog.debug(`verifyAccount: ${JSON.stringify(error)}`);
      });
  }

  sendingCodeDone() {
    this.setState({ loading: false, loadingTextActually: "" });
  }

  phoneNumberChange() {
    var form = new FormData();
    form.append("phoneNumber", this.state.phone_number_update);
    route
      .UploadImage(
        "user/" + this.props.userDetail._id,
        form,
        this.props.userToken
      )
      .then(async response => {
        if (response.error) {
          this.setState({ loading: false });
          Alert.alert(strings.internetissue);
        } else {
        }
      });
  }

  resendCode(id) {
    this.setState({ loading: true, loadingTextActually: strings.sending });
    var data = { id: id };
    route.postdata("auth/resendcode", data).then(async response => {
      if (response.error) {
        Alert.alert(strings.internetissue);
        this.setState({
          verificationCode: "",
          loading: false,
          loadingTextActually: ""
        });
      } else {
        this.setState({
          verificationCode: "",
          loadingTextActually: strings.sent
        });
        setTimeout(() => {
          this.sendingCodeDone();
        }, 100);
      }
    });
  }

  getProfileData() {
    this.setState({ loading: true });
    var userId = this.props.userDetail._id;
    var token = this.props.userToken;

    route
      .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
      .then(async responses => {
        if (responses.error) {
          Alert.alert(strings.alert3);
          this.setState({ loading: true });
        } else {
          if (responses.pets < 1) {
            this.setState({ loading: true });
            this.setUserDeviceToken("PetInfoInitial");
          } else {
            this.props.setYourPet(responses.pets);
            this.setUserDeviceToken();
          }
        }
      });
    //   console.log("datttta",JSON.stringify(response))
  }

  changePhoneNumber(phone) {
    this.setState({
      loading: true,
      loadingTextActually: strings.changingPhoneNumber
    });
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
          this.setState({ loading: false, loadingTextActually: "" });
          Alert.alert(strings.internetIssue);
        } else {
          this.props.alterJustUser(response);
          this.setState({ phone_number: response.phoneNumber });
          this.resendCode(this.props.userDetail._id);
        }
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <SignInStyle.WrapperViewVertical>
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
          <SignInStyle.WrapperViewHorizontal>
            <Image
              source={require("../../assets/images/paranuImageWork.png")}
              // style={{ alignSelf: "center" ,width: WIDTH / 1.2, height: WIDTH / 5.10}}
              style={{ alignSelf: "center", width: 270, height: 70 }}
            />
          </SignInStyle.WrapperViewHorizontal>
          <SignInStyle.flexPointZeroFiveView>
            <SignInStyle.EmailandPassTilteText>
              {strings.amil}
            </SignInStyle.EmailandPassTilteText>
          </SignInStyle.flexPointZeroFiveView>
          <SignInStyle.EmailandPassViewStyle behavior="padding" enabled>
            <View style={styles.ImageIconStyle}>
              <Zocial name="email" size={30} color="white" />
            </View>
            <TextInput
              style={styles.InputTextStyle}
              placeholder={strings.enteryouremailaddress}
              keyboardType={"email-address"}
              placeholderTextColor="white"
              onChangeText={email => this.setState({ email })}
            />
          </SignInStyle.EmailandPassViewStyle>
          <SignInStyle.flexPointZeroFiveView>
            <SignInStyle.EmailandPassTilteText>
              {strings.password}
            </SignInStyle.EmailandPassTilteText>
          </SignInStyle.flexPointZeroFiveView>
          <SignInStyle.EmailandPassViewStyle behavior="padding" enabled>
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
          </SignInStyle.EmailandPassViewStyle>
          <SignInStyle.ForgetPasswordContainerView>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            >
              <SignInStyle.ForgetButtonTextStyle>
                {strings.forgetPassword}
              </SignInStyle.ForgetButtonTextStyle>
            </TouchableOpacity>
          </SignInStyle.ForgetPasswordContainerView>
          <SignInStyle.TextView>
            {strings.agreetermstext}{" "}
            <SignInStyle.TextLink
              onPress={() =>
                Linking.openURL("http://www.para.nu/terms-of-use/")
              }
            >
              {strings.termsofuse}
            </SignInStyle.TextLink>{" "}
            {strings.and}{" "}
            <SignInStyle.TextLink
              onPress={() =>
                Linking.openURL("https://www.para.nu/privacy-policy/")
              }
            >
              {strings.privacypolicy}
            </SignInStyle.TextLink>
          </SignInStyle.TextView>
          <SignInStyle.LoginButtonContainerView>
            <TouchableOpacity
              style={styles.LoginButtonStyle}
              onPress={() => {
                if (this.state.email.length > 0 && this.state.email.length > 0)
                  this.loginWithData();
              }}
            >
              <SignInStyle.LoginButtonTextStyle>
                {strings.login}
              </SignInStyle.LoginButtonTextStyle>
            </TouchableOpacity>
          </SignInStyle.LoginButtonContainerView>
          {/* <SignInStyle.TextView>
            {strings.agreetermstext} <SignInStyle.TextLink onPress={ ()=> Linking.openURL('http://www.para.nu/terms-of-use/') } >{strings.termsofuse}</SignInStyle.TextLink> {strings.and} <SignInStyle.TextLink onPress={ ()=> Linking.openURL('https://www.para.nu/privacy-policy/') } >{strings.privacypolicy}</SignInStyle.TextLink>
          </SignInStyle.TextView> */}
          <SignInStyle.SepratorContainerView>
            <SignInStyle.HightOne />
            <SignInStyle.ORTextStyle>or</SignInStyle.ORTextStyle>
            <SignInStyle.HightOne />
          </SignInStyle.SepratorContainerView>
          <TouchableOpacity
            style={styles.FBButtonStyle}
            onPress={() => {
              LoginManager.logOut()
              LoginManager.logInWithPermissions(["public_profile"])
                .then(
                  result => {
                    ParanuLog.debug(
                      `facebook success:  ${JSON.stringify(result)}`
                    );
                    if (result.isCancelled) {
                      this.setState({ loading: false });
                      ParanuLog.debug("Login cancelled");
                    } else {
                      AccessToken.getCurrentAccessToken().then(data => {
                        const { accessToken } = data;
                        token = accessToken;
                        this.setState({ loading: false });
                        this.initUser(params)
                      });
                    }
                  }
                )
                .catch(error => {
                  ParanuLog.error(`in facebook: ${JSON.stringify(error)}`);
                  this.setState({ loading: false });
                });
            }}
          >
            <SignInStyle.LoginWithFBContainerView>
              <View style={styles.FbImageStyle}>
                <Image
                  style={{
                    height: WIDTH / 15,
                    width: WIDTH / 15,
                    alignSelf: "center"
                  }}
                  source={require("../../assets/images/facebook_icon.png")}
                />
              </View>
              <SignInStyle.FBButtonTextStyle>
                {strings.continueWithFacebook}
              </SignInStyle.FBButtonTextStyle>
            </SignInStyle.LoginWithFBContainerView>
          </TouchableOpacity>
          <SignInStyle.BottomContainerView>
            <SignInStyle.BottomTextStyle>
              {strings.dontHaveAnAccount}
            </SignInStyle.BottomTextStyle>
            <TouchableOpacity
              style={styles.RegisterButtonStyle}
              onPress={() =>
                this.props.navigation.navigate("SignUp", {
                  longitude: params.longitude,
                  latitude: params.latitude,
                  area: params.area
                })
              }
            >
              <SignInStyle.RegisterButtonTextStyle>
                {strings.register}
              </SignInStyle.RegisterButtonTextStyle>
            </TouchableOpacity>
          </SignInStyle.BottomContainerView>
          {this.state.codeVerificationPopUp && (
            <CodeVerification
              lan={strings}
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
      </SignInStyle.WrapperViewVertical>
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
  LoginButtonStyle: { flex: 1, justifyContent: "center" },
  FBButtonStyle: {
    justifyContent: "center",
    flex: 0.1,
    borderWidth: 1,
    borderColor: "white",
    width: WIDTH / 1.1,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1
  },
  RegisterButtonStyle: { justifyContent: "center", left: 10 },
  FbImageStyle: {
    position: "absolute",
    alignSelf: "flex-start",
    left: 20
  },
  LogoImageStyle: {
    height: 70,
    width: 70,
    backgroundColor: "black",
    alignSelf: "center"
  }
});

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    languageOfApp: state.appState.languageOfApp
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
