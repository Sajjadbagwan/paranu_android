import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Image,
  Dimensions,
  Alert,
  Platform,
  NativeModules
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RNLocalize from "react-native-localize";
import FCM from "react-native-fcm";
import {
  Analytics,
  Hits as GAHits
} from 'react-native-google-analytics';


import * as Actions from "../../actions";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import CodeVerification from "../../component/common/CodeVerification";
import ActivityLoading from "../../component/common/ActivityLoading";
import { registerAppListener } from "../../network/services/Listeners";
import strings from "../../screens/Splash/SplashLocalization";
import ParanuLog from "../../Helper/ParanuLog";
const route = new Route(url);

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
var tokenOfPhone = "";
var languageApp = "";
let ga = this.ga = null;


class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: "",
      loading: false,
      phone_number: "",
      codeVerificationPopUp: false,
      phone_number_edit: "",
      code_text: "",
      loadingTextActually: ""
    };
    countryInfo = RNLocalize.getLocales();
    // alert(JSON.stringify(countryInfo))
    switch (countryInfo[0].languageCode) {
      case "sv":
        this.selectLanguage("sv");
        languageApp = "sv";
        break;
      case "it":
        this.selectLanguage("it");
        languageApp = "it";
        break;
      case "fr":
        this.selectLanguage("fr");
        languageApp = "fr";
        break;
      case "es":
        this.selectLanguage("es");
        languageApp = "es";
        break;
      case "de":
        this.selectLanguage("ddr");
        languageApp = "ddr";
        break;
      case "ru":
        this.selectLanguage("ru");
        languageApp = "ru";
        break;
      case "pt":
        this.selectLanguage("es");
        languageApp = "es";
        break;
      case "tt":
        this.selectLanguage("ru");
        languageApp = "ru";
        break;
      default:
        this.selectLanguage("en");
        languageApp = "en";
        break;
    }
  }
  selectLanguage(language) {
    this.props.setApplicationLanguage(language);
    // alert(language)
    strings.setLanguage(language);
  }

  componentDidMount() {
    // NativeModules.ParanuLocationManager.getLocation(
    //   (error, latitude, longitude) => {
    //     ParanuLog.debug(`lat: ${latitude} long: ${longitude} error: ${error}`);
    //     if (error == null) {
    //       this.props.setLocation({ lat: latitude, long: longitude });
    //     } else if (error === "PERMISSION_DENIED") {
    //       ParanuLog.debug(`Permission denied`);
    //     }
    //   }
    // );
    this.requestCalling();
    this.getValueLocally();
    this.getDeviceToken();
  }

  componentWillMount() {
    ga = new Analytics('UA-135620131-1', "ParanuClientID", 1, "Panu_Google_Analytics");
  }

  requestCalling = async () => {
    try {
      let result = await FCM.requestPermissions({
        badge: true,
        sound: true,
        alert: true
      });
    } catch (e) {
      console.error(e);
    }
  };

  async getDeviceToken() {
    registerAppListener(this.props.navigation);
    FCM.getFCMToken().then(function(token) {
      ParanuLog.debug(`FCM token ${token}`);
      tokenOfPhone = token;
    });
  }
  setUserDeviceToken() {
    var form = new FormData();

    if (tokenOfPhone.length > 0) {
      form.append(
        "deviceTokens",
        Platform.OS === "ios"
          ? "IOS: " + tokenOfPhone
          : "ANDROID: " + tokenOfPhone
      );
    }
    form.append("language", languageApp);
    route
      .UploadImage(
        "user/" + this.props.userDetail._id,
        form,
        this.props.userToken
      )
      .then(async response => {
        if (response.error) {
          //Alert.alert(JSON.stringify(response));
          this.setState({ loading: false });
          Alert.alert(strings.alert1);
        } else {
          this.onPetInfo();
        }
      });
  }

  changePhoneNumber(phone) {
    this.setState({
      loading: true,
      loadingTextActually: strings.changephonenumber
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
          Alert.alert(strings.alert1);
        } else {
          this.props.alterJustUser(response);
          this.setState({ phone_number: response.phoneNumber });
          this.resendCode(this.props.userDetail._id);
        }
      });
  }

  getValueLocally = async () => {
    registerAppListener(this.props.navigation);
    //AsyncStorage.clear()

    var idOfPet = await AsyncStorage.getItem("PET_INDEX");
    var data = await AsyncStorage.getItem("USER");
    var token = await AsyncStorage.getItem("TOKEN");

    if (data != null && token != null && data != "" && token != "") {
      ParanuLog.debug(`auth token: ${token}`);
      if (idOfPet == null) {
        idOfPet = 0;
        this.props.setIndexOfPet(idOfPet);
        this.props.setToken(token);
        this.props.setUser(data);

        if (JSON.parse(data).verified == "1") {
          this.setUserDeviceToken();
        } else {
          this.setState({
            codeVerificationPopUp: true,
            phone_number: JSON.parse(data).phoneNumber
          });
        }
      } else {
        this.props.setIndexOfPet(parseInt(idOfPet));
        this.props.setToken(token);
        this.props.setUser(data);
        this.setUserDeviceToken();
      }
    } else {
      ParanuLog.debug(`lat: ${JSON.stringify(this.props.location)} `);
      this.props.navigation.navigate("Introduction");
    }
  };

  onPetInfo() {
    this.setState({ loading: true });
    var userId = this.props.userDetail._id;
    var token = this.props.userToken;
    route
      .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
      .then(async response => {
        if (response.error) {
          Alert.alert(strings.alert1);
          this.setState({ loading: false });
        } else {
          if (response.pets < 1 || response.interest < 1) {
            this.setState({ loading: false });
            this.props.navigation.push("PetInfoInitial", {
              recentPath: "home"
            });
          } else {
            this.props.setYourPet(response.pets);
            this.props.navigation.push("TabNavigator");
            this.addEvent(response.user._id);
          }
        }
      });
  }

  addEvent = (id) => {
    var gaEvent = new GAHits.Event(
      "User Started Application",
      "Android",
      `Paranu user Id: ${id}`
    );
    ga.send(gaEvent);
    ParanuLog.debug("g a sent");
  }


  verifyAccount(id, code) {
    this.setState({ loading: true, loadingTextActually: strings.codeMatching });
    var data = { id: id, otp: code };
    route.postdata("auth/verification", data).then(async response => {
      if (response.error) {
        Alert.alert("Failed", response.error.message);
        this.setState({ loading: false });
      } else {
        this.setState({ loadingTextActually: strings.verified });
        this.props.alterJustUser(response.user);
        setTimeout(() => {
          this.sendingCodeDone();
        }, 100);
        AsyncStorage.setItem("FIRSTTIME", "true");
        this.props.navigation.push("PetInfoInitial", { recentPath: "home" });
      }
    });
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
        this.setState({
          loadingTextActually: strings.sent,
          verificationCode: ""
        });
        setTimeout(() => {
          this.sendingCodeDone();
        }, 100);
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={{
            height: HEIGHT,
            width: WIDTH,
            alignSelf: "center",
            position: "absolute"
          }}
          source={require("../../assets/images/background.jpg")}
        />
        {this.state.codeVerificationPopUp && (
          <CodeVerification
            lan={strings}
            phoneNumber={this.state.phone_number}
            verifyCodeEditText={this.state.code_text}
            onChangeCodeText={text => {
              this.setState({ code_text: text });
            }}
            phoneNumberEditText={this.state.phone_number_edit}
            onPressPhoneNumberChange={phone => this.changePhoneNumber(phone)}
            OnVerifyPress={() =>
              this.verifyAccount(
                this.props.userDetail._id,
                this.state.code_text
              )
            }
            onResendCodePress={() => this.resendCode(this.props.userDetail._id)}
            z
          />
        )}
        {this.state.loading && (
          <ActivityLoading textLoading={this.state.loadingTextActually} />
        )}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    location: state.user.location
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
