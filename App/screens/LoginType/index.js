import React, { Component } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  Alert,
  AppState
} from "react-native";
import { connect } from "react-redux";
import { NavigationEvents } from "react-navigation";
import * as RNLocalize from "react-native-localize";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import Header from "../../component/common/Header";
import LoginTypeStyle from "./LoginTypeStyle";
import ActivityLoading from "../../component/common/ActivityLoading";
import strings from "../../screens/LoginType/LoginTypeLocalization";
import ParanuLog from "../../Helper/ParanuLog";
import ParanuGeoLocation from "../../Helper/ParanuGeoLocation";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;
var enableHighAccuracy = false;
var fromLocationInfo = false

class LoginType extends Component {
  constructor(props) {
    super(props);
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    this.state = {
      latitude: "",
      longitude: "",
      area: strings.noLocation,
      loading: true,
      appState: AppState.currentState,
      navigateTo: ""
    };
  }

  // showLocationError() {
  //   Alert.alert(
  //     strings.permission,
  //     strings.paranulocation,
  //     [{ text: "OK", onPress: () => this.requestLocationAndroid() }],
  //     { cancelable: false }
  //   );
  // }

  async requestLocationAndroid() {
    this.setState({ loading: true})
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: false, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
      providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
    })
      .then((success) => {
        ParanuLog.debug(`this is success: ${JSON.stringify(success)}`);
        this.setState({ loading: false })
        if (this.state.latitude == '') {
          enableHighAccuracy = !enableHighAccuracy
          this.getLocationInfo();
        } else {
          this.getLocation(this.state.longitude, this.state.latitude);
        }
      }).catch(error => {
        fromLocationInfo = false
        ParanuLog.error(`requestLocation Android: ${JSON.stringify(error)}`);
        this.setState({ loading: false })
        Alert.alert(strings.noLocation);
      });
  }

  getLocation(long, lat) {
    ParanuLog.debug(`long: ${long} lat: ${lat}`);
    this.setState({ loading: true })
    ParanuGeoLocation.getLocationFor(lat, long)
      .then(response => {
        ParanuLog.debug(`response: ${JSON.stringify(response)}`);
        this.setState({ loading: false })
        if (response.status == "OK") {
          let results = response.results;
          this.getAreaFor('locality', results)
          if (this.state.navigateTo != "") {
            // ParanuLog.debug(`already have define navigateTo: ${this.state.navigateTo}`)
            this.goTo(this.state.navigateTo)
          }
        } else {
          Alert.alert(strings.internetIssue);
        }
      }).catch(error => {
        this.setState({ loading: false });
        ParanuLog.error(`Location: ${JSON.stringify(error)}`);
        Alert.alert(strings.noLocation);
      });
  }

  getAreaFor(key, results) {
    ParanuLog.debug('in tne get Area for')
    let city = ""
    for (let i = 0; i < results.length; i++) {
      let address = results[i].address_components.filter(item =>
        item.types.includes(key)
      );
      ParanuLog.debug(`address: ${JSON.stringify(address)} index: ${i}`);
      if (address.length > 0) {
        city = key == 'locality' ? address[0].short_name : address[0].long_name
        this.setState({ area: city });
        ParanuLog.debug(`area: ${this.state.area}`);
        return;
      }
    }

    if (this.state.area == strings.noLocation) {
      ParanuLog.debug('still nill now see administrative_area_level_1')
      this.getAreaFor('administrative_area_level_1', results)
    }

    if (this.state.area == strings.noLocation) {
      ParanuLog.debug('still nill now see country')
      this.getAreaFor('country', results)
    }
  }

  componentDidMount() {
    // this.getLocation('70.1117556', '30.8549384')
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    countryInfo = RNLocalize.getLocales();

    switch (countryInfo[0].languageCode) {
      case "sv":
        strings.setLanguage("sv");
        break;
      case "it":
        strings.setLanguage("it");
        break;
      case "fr":
        strings.setLanguage("fr");
        break;
      case "es":
        strings.setLanguage("es");
        break;
      case "de":
        strings.setLanguage("ddr");
        break;
      case "ru":
        strings.setLanguage("ru");
        break;
      case "pt":
        strings.setLanguage("es");
        break;
      case "tt":
        strings.setLanguage("ru");
        break;
      default:
        strings.setLanguage("en");
        break;
    }
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      ParanuLog.debug("App has come to the foreground!");
      if (
        (this.state.area == strings.noLocation ||
        this.state.latitude == "" ||
        this.state.longitude == "") && !fromLocationInfo

      ) {
        this.getLocationInfo();
      }
    }
    this.setState({ appState: nextAppState });
  };

  getLocationInfo() {
    let locationGetting = true
    fromLocationInfo = true;
    ParanuLog.debug('in the get Location Info')
    this.setState({ loading: true})
    navigator.geolocation.getCurrentPosition(
      position => {
        locationGetting = false;
        fromLocationInfo = false
        ParanuLog.debug(`position: ${JSON.stringify(position)}`);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false
        });
        this.getLocation(position.coords.longitude, position.coords.latitude);
      },
      error => {
        locationGetting = false;
        fromLocationInfo = false
        this.setState({ loading: false });
        ParanuLog.debug(`getLocation Info: ${JSON.stringify(error)} with enableHigh: ${enableHighAccuracy}`);
        Platform.OS === "android"
          ? this.requestLocationAndroid() //this.showLocationError()
          : Alert.alert(strings.permission, strings.paranulocation, [
              {
                text: strings.cancel,
                onPress: () => console.log("NO Pressed"),
                style: "cancel"
              },
              {
                text: strings.setting,
                onPress: () =>
                  Linking.openURL(
                    "app-settings:{1}",
                    this.props.navigation.goBack()
                  )
              }
            ]);
      },
      { timeout: 10000, enableHighAccuracy: enableHighAccuracy }
    );

    setTimeout(() => {
      if (locationGetting) {
        this.setState({ loading: false });
        locationGetting = false;
      }
    }, 5000)
  }

  goTo(page) {
    ParanuLog.debug(
      `long: ${this.state.longitude} lat: ${this.state.latitude}
      area: ${this.state.area}`
    );
    if (
      this.state.longitude == "" ||
      this.state.latitude == "" ||
      this.state.area == strings.noLocation
    ) {
      // this.showLocationError();
      ParanuLog.debug('in if')
      this.requestLocationAndroid();
      return;
    }
    ParanuLog.debug(`in else ${page}`)
    this.props.navigation.navigate(page, {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      area: this.state.area
    });
    this.setState({ navigateTo: "" })
  }

  render() {
    return (
      <LoginTypeStyle.WrapperView>
        <NavigationEvents
          onWillFocus={payload => {
            ParanuLog.debug("in the on will focus");
            this.getLocationInfo();
          }}
        />
        <Image
          source={require("../../assets/images/background.jpg")}
          style={{
            position: "absolute",
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: "rgba(249,158,158,0.85)"
          }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <LoginTypeStyle.TopView>
            <Header
              iconName={"arrowleft"}
              iconColor={"white"}
              onPressButton={() => this.props.navigation.goBack()}
            />
          </LoginTypeStyle.TopView>

          <LoginTypeStyle.CenterView />
          <LoginTypeStyle.BottomView>
            <LoginTypeStyle.BottomHorizontalView>
              <TouchableOpacity
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => {
                  this.goTo("SignIn");
                  this.setState({ navigateTo: "SignIn"})
                }}
              >
                <LoginTypeStyle.BottomButtonText>
                  {strings.login}
                </LoginTypeStyle.BottomButtonText>
              </TouchableOpacity>
              <LoginTypeStyle.ButtonDivider />
              <TouchableOpacity
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => {
                  this.goTo("SignUp")
                  this.setState({ navigateTo: "SignUp"})
                  }}
              >
                <LoginTypeStyle.BottomButtonText>
                  {strings.register}
                </LoginTypeStyle.BottomButtonText>
              </TouchableOpacity>
            </LoginTypeStyle.BottomHorizontalView>
          </LoginTypeStyle.BottomView>
        </SafeAreaView>
        {this.state.loading && (
          <ActivityLoading textLoading={strings.pleaseWait} />
        )}
      </LoginTypeStyle.WrapperView>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    languageOfApp: state.appState.languageOfApp
  };
}

export default connect(mapStateToProps)(LoginType);
