import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  Dimensions,
  AsyncStorage
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { DARK_APP_COLOR } from "../../component/constant/Color";

import IntrestStyle from "./InterestStyle";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import * as Actions from "../../actions"; //Import your actions
import Header from "../../component/common/Header";
import ActivityLoading from "../../component/common/ActivityLoading";
import strings from "../../screens/Interest/InterestLocalization";
import * as RNLocalize from 'react-native-localize';
import ParanuLog from "../../Helper/ParanuLog";

const route = new Route(url);
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;
class Interest extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      mateCheck: false,
      walkCheck: false,
      meetCheck: false,
      talkCheck: false,
      sitCheck: false,
      loading: false,
      mateImage: require("../../assets/images/MateImage.png"),
      walkImage: require("../../assets/images/walkImage.png"),
      meetImage: require("../../assets/images/meetImage.png"),
      talkImage: require("../../assets/images/talkImage.png"),
      settingImage: require("../../assets/images/settingEng.png"),
    };
  }

  componentDidMount(){
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    countryInfo=RNLocalize.getLocales();
                switch (countryInfo[0].languageCode){
      case "sv":
      strings.setLanguage("sv")
      this.setState({mateImage:require('../../assets/images/mateSwedish.png'), walkImage:require('../../assets/images/walkSwedish.png'),
      meetImage: require('../../assets/images/meetSwedish.png'), talkImage: require('../../assets/images/talkSwedish.png'),
      settingImage: require("../../assets/images/settingSv.png") })
      break;
      case "it":
      strings.setLanguage("it")
      this.setState({mateImage:require('../../assets/images/mateItalian.png'), walkImage:require('../../assets/images/walkItalian.png'),
        meetImage: require('../../assets/images/meetItalian.png'), talkImage: require('../../assets/images/talkItalian.png'),
        settingImage: require("../../assets/images/settingIt.png") })
      break;
      case "fr":
      strings.setLanguage("fr")
      this.setState({mateImage:require('../../assets/images/mateFrench.png'), walkImage:require('../../assets/images/walkFrench.png'),
      meetImage: require('../../assets/images/meetFrench.png'), talkImage: require('../../assets/images/talkFrench.png'),
      settingImage: require("../../assets/images/settingFr.png") })
      break;
      case "es":
      strings.setLanguage("es")
      this.setState({mateImage:require('../../assets/images/mateSpanish.png'), walkImage:require('../../assets/images/walkSpanish.png'),
      meetImage: require('../../assets/images/meetSpanish.png'), talkImage: require('../../assets/images/talkSpanish.png'),
      settingImage: require("../../assets/images/settingEs.png") })
      break;
      case "de":
      strings.setLanguage("ddr")
      this.setState({mateImage:require('../../assets/images/mateGerman.png'), walkImage:require('../../assets/images/walkGerman.png'),
      meetImage: require('../../assets/images/meetGerman.png'), talkImage: require('../../assets/images/talkGerman.png'),
      settingImage: require("../../assets/images/settingDdr.png") })
      break;
      case "ru":
      strings.setLanguage("ru")
      this.setState({mateImage:require('../../assets/images/mateRussian.png'), walkImage:require('../../assets/images/walkRussian.png'),
      meetImage: require('../../assets/images/meetRussian.png'), talkImage: require('../../assets/images/talkRussian.png'),
      settingImage: require("../../assets/images/settingRu.png") })
      break;
      case "pt":
      strings.setLanguage("es")
      this.setState({mateImage:require('../../assets/images/mateSpanish.png'), walkImage:require('../../assets/images/walkSpanish.png'),
      meetImage: require('../../assets/images/meetSpanish.png'), talkImage: require('../../assets/images/talkSpanish.png'),
      settingImage: require("../../assets/images/settingEs.png") })
      break;
      case "tt":
      strings.setLanguage("ru")
      this.setState({mateImage:require('../../assets/images/mateRussian.png'), walkImage:require('../../assets/images/walkRussian.png'),
      meetImage: require('../../assets/images/meetRussian.png'), talkImage: require('../../assets/images/talkRussian.png'),
      settingImage: require("../../assets/images/settingRu.png") })
      break;
      default :
      strings.setLanguage("en")
      this.setState({mateImage:require('../../assets/images/MateImage.png'), walkImage:require('../../assets/images/walkImage.png'),
      meetImage: require('../../assets/images/meetImage.png'), talkImage: require('../../assets/images/talkImage.png'),
      settingImage: require("../../assets/images/settingEng.png") });
      break;
    }
  }


  toggleCallFunc(call) {
    switch (call) {
      case "mate":
        this.setState({ mateCheck: !this.state.mateCheck });
        break;
      case "walk":
        this.setState({ walkCheck: !this.state.walkCheck });
        break;
      case "meet":
        this.setState({ meetCheck: !this.state.meetCheck });
        break;
      case "talk":
        this.setState({ talkCheck: !this.state.talkCheck });
        break;
      case "sit":
        this.setState({ sitCheck: !this.state.sitCheck });
    }
  }

  petInterest(params, id) {
    ParanuLog.debug('in the pet interest');
    if (
      this.state.mateCheck ||
      this.state.walkCheck ||
      this.state.meetCheck ||
      this.state.talkCheck ||
      this.state.sitCheck

    ) {
      this.setState({ loading: true });
      var interestArray = [];
      if (this.state.mateCheck) {
        interestArray.push("Mate");
      }
      if (this.state.walkCheck) {
        interestArray.push("Walk");
      }
      if (this.state.meetCheck) {
        interestArray.push("Meet");
      }
      if (this.state.talkCheck) {
        interestArray.push("Talk");
      }
      if (this.state.sitCheck) {
        interestArray.push("Sit");
      }
      params.dataToSend.interests = interestArray;
      params.dataToSend.user = this.props.userDetail._id;
      this.callApi(params.dataToSend, this.props.userToken, id,params);
    } else {
      this.setState({loading:false})
      Alert.alert(strings.alert1);
    }
  }

  callApi(dataToSend, token, petId,params) {
    route
      .updateData("pet/" + petId + "/interest", dataToSend, token)
      .then(async response => {
        ParanuLog.debug(`response: ${JSON.stringify(response)}`)
        if (response.error) {
          this.setState({ loading: false });
          Alert.alert(strings.alert1, response.error.message);
        } else {
          this.getProfileData(params);
        }
      });
  }

  getValuLocally = async () => {
    var data = await AsyncStorage.getItem("FIRSTTIME");
    ParanuLog.debug(`is user first time: ${data}`)
    if (data == null || data == "" || data == "true") {
      this.props.navigation.navigate("ParanuInstructions", {
        recent: "signUp"
      });
    } else {
      this.props.navigation.navigate("TabNavigator");
    }
  };

  getProfileData(params) {
    var userId = this.props.userDetail._id;
    var token = this.props.userToken;

    route
      .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
      .then(async responses => {
        ParanuLog.debug(`response in getProfileData: ${JSON.stringify(responses)}`);
        if (responses.error) {
          Alert.alert(strings.internetissue);
          this.setState({ loading: true });
        } else {
          this.setState({ loading: true });
          this.props.setYourPet(responses.pets);
          this.getAllPets(params);
        }
      });
  }

  InterestChanging(params) {
    ParanuLog.debug("in the InterestChanging");
    this.setState({ loading: true });
    if (
      this.state.mateCheck ||
      this.state.walkCheck ||
      this.state.meetCheck ||
      this.state.talkCheck ||
      this.state.sitCheck
    ) {
      var interestArray = [];
      if (this.state.mateCheck) {
        interestArray.push("Mate");
      }
      if (this.state.walkCheck) {
        interestArray.push("Walk");
      }
      if (this.state.meetCheck) {
        interestArray.push("Meet");
      }
      if (this.state.talkCheck) {
        interestArray.push("Talk");
      }
      if (this.state.sitCheck) {
        interestArray.push("Sitting");
      }
      params.dataToSend.interests = interestArray;
      route
        .put(
          "pet/" + params.petId + "/interest/" + params.interestPetId,
          params.dataToSend,
          this.props.userToken
        )
        .then(async response => {
          if (response.error) {
            this.setState({ loading: false });
            Alert.alert(strings.alert2+strings.pet+"/" + params.petId + "/"+strings.interest+"/"+ params.interestPetId);
          } else {
            this.getAllPets(params);
          }
        }).catch(e => {
          this.setState({ loading: false })
          ParanuLog.error(`Interest Changing ${JSON.stringify(e)}`);
        });
    } else {
      this.setState({ loading: false });
      Alert.alert(strings.alert1);
    }
  }

  getAllPets(params) {
    var token = this.props.userToken;
    ParanuLog.debug(`in the get all pets token: ${token}`);
    route.getAuthenticated("pet/", token).then(async response => {
      ParanuLog.debug(`response get All pet: ${JSON.stringify(response)}`)
      ParanuLog.debug(`recent path:  ${params.recentPath}`)
      if (response.error) {
        Alert.alert(strings.internetissue);
      } else {
        this.props.getAllPets(response);
        this.setState({ loading: false });
        {

          params.recentPath!="home"
            ? this.props.navigation.navigate("Profile")
            : this.getValuLocally();
        }
      }
    });
  }

  render() {
    var { params } = this.props.navigation.state;
    return (
      <IntrestStyle.WrapperViewVertical>
        <SafeAreaView style={{ flex: 1, paddingBottom: 10 }}>
          <Header
            headerText={strings.interests}
            iconName={"arrowleft"}
            iconColor={"white"}
            onPressButton={() => this.props.navigation.goBack()}
          />
          <IntrestStyle.WhiteWrapperViewVertical>
            <IntrestStyle.TopTitleText>
              {strings.chooseOneOrMore}
            </IntrestStyle.TopTitleText>
            <IntrestStyle.WrapperViewHorizontal>
              <IntrestStyle.InnerConatinerView>
                <IntrestStyle.PointFiveVerticalView
                  style={styles.BlackShadow}
                  onPress={() => this.toggleCallFunc("mate")}
                >
                  <IntrestStyle.CheckBoxView>
                    {this.state.mateCheck && (
                      <Feather
                        name={"check-square"}
                        size={13}
                        color={DARK_APP_COLOR}
                      />
                    )}
                  </IntrestStyle.CheckBoxView>
                  <IntrestStyle.InnerImageContainerView>
                    <Image
                      source={this.state.mateImage}
                      style={{ flex: 1, height: undefined, width: undefined }}
                    />
                  </IntrestStyle.InnerImageContainerView>
                </IntrestStyle.PointFiveVerticalView>
              </IntrestStyle.InnerConatinerView>
              <IntrestStyle.InnerConatinerView>
                <IntrestStyle.PointFiveVerticalView
                  style={styles.BlackShadow}
                  onPress={() => this.toggleCallFunc("walk")}
                >
                  <IntrestStyle.CheckBoxView>
                    {this.state.walkCheck && (
                      <Feather
                        name={"check-square"}
                        size={13}
                        color={DARK_APP_COLOR}
                      />
                    )}
                  </IntrestStyle.CheckBoxView>
                  <IntrestStyle.InnerImageContainerView>
                    <Image
                      source={this.state.walkImage}
                      style={{ flex: 1, height: undefined, width: undefined }}
                    />
                  </IntrestStyle.InnerImageContainerView>
                </IntrestStyle.PointFiveVerticalView>
              </IntrestStyle.InnerConatinerView>
            </IntrestStyle.WrapperViewHorizontal>
            <IntrestStyle.WrapperViewHorizontal>
              <IntrestStyle.InnerConatinerView>
                <IntrestStyle.PointFiveVerticalView
                  style={styles.BlackShadow}
                  onPress={() => this.toggleCallFunc("meet")}
                >
                  <IntrestStyle.CheckBoxView>
                    {this.state.meetCheck && (
                      <Feather
                        name={"check-square"}
                        size={13}
                        color={DARK_APP_COLOR}
                      />
                    )}
                  </IntrestStyle.CheckBoxView>
                  <IntrestStyle.InnerImageContainerView>
                    <Image
                      source={this.state.meetImage}
                      style={{ flex: 1, height: undefined, width: undefined }}
                    />
                  </IntrestStyle.InnerImageContainerView>
                </IntrestStyle.PointFiveVerticalView>
              </IntrestStyle.InnerConatinerView>
              <IntrestStyle.InnerConatinerView>
                <IntrestStyle.PointFiveVerticalView
                  style={styles.BlackShadow}
                  onPress={() => this.toggleCallFunc("talk")}
                >
                  <IntrestStyle.CheckBoxView>
                    {this.state.talkCheck && (
                      <Feather
                        name={"check-square"}
                        size={13}
                        color={DARK_APP_COLOR}
                      />
                    )}
                  </IntrestStyle.CheckBoxView>
                  <IntrestStyle.InnerImageContainerView>
                    <Image
                      source={this.state.talkImage}
                      style={{ flex: 1, height: undefined, width: undefined }}
                    />
                  </IntrestStyle.InnerImageContainerView>
                </IntrestStyle.PointFiveVerticalView>
              </IntrestStyle.InnerConatinerView>
            </IntrestStyle.WrapperViewHorizontal>
            <IntrestStyle.WrapperViewHorizontal>
              <IntrestStyle.InnerConatinerView>
                <IntrestStyle.PointFiveVerticalView
                  style={styles.BlackShadow}
                  onPress={() => this.toggleCallFunc("sit")}
                >
                  <IntrestStyle.CheckBoxView>
                    {this.state.sitCheck && (
                      <Feather
                        name={"check-square"}
                        size={13}
                        color={DARK_APP_COLOR}
                      />
                    )}
                  </IntrestStyle.CheckBoxView>
                  <IntrestStyle.InnerImageContainerView>
                    <IntrestStyle.InnerImageContainerView>
                      <Image
                      source={this.state.settingImage}
                      style={{ flex: 1, height: undefined, width: undefined }}
                    />
                    </IntrestStyle.InnerImageContainerView>
                  </IntrestStyle.InnerImageContainerView>
                </IntrestStyle.PointFiveVerticalView>
              </IntrestStyle.InnerConatinerView>
            </IntrestStyle.WrapperViewHorizontal>

            <IntrestStyle.NextContainerView
              onPress={() => {
                if (params.recentPath!="editProfile") {
                  this.petInterest(params,params.petId);
                } else {
                  this.InterestChanging(params);
                }
              }}
            >
              <IntrestStyle.NextButtonTextStyle>
                {strings.next}
              </IntrestStyle.NextButtonTextStyle>
            </IntrestStyle.NextContainerView>
          </IntrestStyle.WhiteWrapperViewVertical>
        </SafeAreaView>
        {this.state.loading && <ActivityLoading />}
      </IntrestStyle.WrapperViewVertical>
    );
  }
}

const styles = StyleSheet.create({
  BackButtonImageStyle: { height: 25, width: 50 },
  BackButtonStyle: { alignSelf: "center", left: 10, position: "absolute" },
  BlackShadow: {
    shadowOffset: { width: 0.5, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.35,
    elevation: 5
  }
});
function mapStateToProps(state, props) {
  // console.log(state)
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    yourPetInfo: state.pet.yourPetDetail,
    languageOfApp: state.appState.languageOfApp,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interest);
