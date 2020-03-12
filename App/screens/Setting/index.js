import React, { Component } from "react";
import { Text } from "react-native";
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";
import SettingStyle from "./SettingStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  BLACK_ALPHA,
  BLACK,
  PLACE_HOLDER_COLOR
} from "../../component/constant/Color";
import Route from "../../network/route";
import { url, version, build } from "../../component/constant/Url";
//import strings from './SettingLocalization'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions"; //Import your actions
import strings from "../../screens/Setting/SettingLocalization";
import * as RNLocalize from "react-native-localize";
import ParanuLog from "../../Helper/ParanuLog";

const route = new Route(url);
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

class Setting extends Component {
  constructor(props) {
    super(props);
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    this.state = {
      distancePop: false,
      distanceValue: "",
      listData: [
        {
          name: "FAQ",
          path: "ParanuGuide"
        },
        {
          name: strings.instructions,
          path: "ParanuInstructions"
        },
        {
          name: strings.distance,
          path: "Distance"
        },
        {
          name: strings.changePassword,
          path: "ChangePassword"
        },
        {
          name: strings.termsAndConditions,
          path: "TermConditions"
        },
        {
          name: strings.contactUs,
          path: "ContactUs"
        }
      ]
    };
  }
  componentDidMount() {
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    if (this.props.userDetail.distance) {
      this.setState({ distanceValue: this.props.userDetail.distance });
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
    this.setState({
      listData: [
        {
          name: "FAQ",
          path: "ParanuGuide"
        },
        {
          name: strings.instructions,
          path: "ParanuInstructions"
        },
        {
          name: strings.distance,
          path: "Distance"
        },
        {
          name: strings.changePassword,
          path: "ChangePassword"
        },
        {
          name: strings.termsAndConditions,
          path: "TermConditions"
        },
        {
          name: strings.contactUs,
          path: "ContactUs"
        }
      ]
    });
  }

  distanceApi() {
    var distance = "";
    distance = this.state.distanceValue;
    if (distance != "" && parseInt(distance) < 30001) {
      this.setState({ distancePop: false });
      var data = { distance: distance };
      var token = this.props.userToken;
      route
        .put("user/" + this.props.userDetail._id, data, token)
        .then(async response => {
          // ParanuLog.debug(`response: ${JSON.stringify(response)}`)
          if (response.error) {
            this.setState({ loading: false });
            Alert.alert(strings.internetIssue);
          } else {
            this.setState({ loading: false });
            this.props.alterJustUser(response);
            this.props.setDistance(response);
            Alert.alert(
              strings.matchingRange,
              strings.updated,
              [{ text: "OK" }],
              { cancelable: false }
            );
          }
        });
    } else {
      Alert.alert(strings.pleaseTypeValidRange);
    }
  }

  render() {
    return (
      <SettingStyle.SafeAreaView>
        <SettingStyle.ScrollView>
          <SettingStyle.NavigationBarViewContainer style={styles.GreyShadow}>
            <SettingStyle.NavigationTextStyle>
              {strings.settings}
            </SettingStyle.NavigationTextStyle>
          </SettingStyle.NavigationBarViewContainer>

          <SettingStyle.WrapperViewVertical>
            <SettingStyle.TableView
              data={this.state.listData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <SettingStyle.EmptyView>
                  <SettingStyle.CellContainerView
                    style={styles.GreyShadow1}
                    onPress={() => {
                      if (item.path != "Distance") {
                        this.props.navigation.push(item.path, {
                          recent: "Setting"
                        });
                      } else {
                        this.setState({ distancePop: true });
                      }
                    }}
                  >
                    <SettingStyle.PointFiveContainerView>
                      <SettingStyle.CellTextStyle>
                        {item.name}
                      </SettingStyle.CellTextStyle>
                    </SettingStyle.PointFiveContainerView>
                    <SettingStyle.PointTowContainerView>
                      {item.name != "Distance" && (
                        <SettingStyle.CellImageContainerView>
                          <Ionicons
                            name="md-arrow-dropright"
                            size={40}
                            color="grey"
                          />
                        </SettingStyle.CellImageContainerView>
                      )}
                    </SettingStyle.PointTowContainerView>
                  </SettingStyle.CellContainerView>
                  {item.name == strings.contactUs && (
                    <SettingStyle.EmptyView>
                      <SettingStyle.LogOutContainerView
                        onPress={() => {
                          AsyncStorage.clear();
                          this.props.navigation.navigate("Matching");
                          this.props.navigation.navigate("Introduction");
                        }}
                      >
                        <MaterialCommunityIcons
                          name="logout"
                          size={30}
                          color="white"
                        />
                        <SettingStyle.LogOutButtonTextStyle>
                          {strings.logOut}
                        </SettingStyle.LogOutButtonTextStyle>
                      </SettingStyle.LogOutContainerView>
                      {/* <SettingStyle.BottomContainer onPress={()=>{
                                            this.props.navigation.navigate("PaymentType")
                                    }}>
                                            <SettingStyle.UpgradeButtonTextStyle>
                                                {strings.upgradeYourMembership}
                                    </SettingStyle.UpgradeButtonTextStyle>
                                        </SettingStyle.BottomContainer> */}
                    </SettingStyle.EmptyView>
                  )}
                </SettingStyle.EmptyView>
              )}
            />
            <SettingStyle.versionContainer>
              <Text>
                version: {version}({build})
              </Text>
            </SettingStyle.versionContainer>
          </SettingStyle.WrapperViewVertical>
        </SettingStyle.ScrollView>
        {this.state.distancePop && (
          <SettingStyle.DistanceMainView
            activeOpacity={0.8}
            onPress={() => this.setState({ distancePop: false })}
          >
            <SettingStyle.DistanceInnerContainer activeOpacity={1}>
              <SettingStyle.DistanceInnerTopText>
                <SettingStyle.DistanceAddText>
                  {strings.add}{" "}
                </SettingStyle.DistanceAddText>
                {strings.distanceForFindingAMatch}
              </SettingStyle.DistanceInnerTopText>
              <SettingStyle.DistanceInputContainerView>
                <TextInput
                  style={{
                    height: 40,
                    minWidth: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    textAlign: "right",
                    color: BLACK
                  }}
                  maxLength={5}
                  placeholder=" 2000 "
                  keyboardType="number-pad"
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                  value={this.state.distanceValue.toString()}
                  onChangeText={distanceValue =>
                    this.setState({ distanceValue })
                  }
                />
                <SettingStyle.KmTextView> Km</SettingStyle.KmTextView>
              </SettingStyle.DistanceInputContainerView>
              <SettingStyle.DistanceAddButton
                onPress={() => this.distanceApi()}
              >
                <SettingStyle.AddButtonText>
                  {strings.add}
                </SettingStyle.AddButtonText>
              </SettingStyle.DistanceAddButton>
            </SettingStyle.DistanceInnerContainer>
          </SettingStyle.DistanceMainView>
        )}
      </SettingStyle.SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  GreyShadow: {
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3
  },
  GreyShadow1: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3
  }
});
function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
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
)(Setting);
