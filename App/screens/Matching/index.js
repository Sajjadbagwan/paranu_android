import React, { Component } from "react";
import {
  Dimensions,
  SafeAreaView,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import Header from "../../component/common/Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import Route from "../../network/route";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from 'react-native-vector-icons/Entypo'
import { url } from "../../component/constant/Url";
import ActivityLoading from "../../component/common/ActivityLoading";
import ImageView from "../../component/common/ImageView";
import { DARK_APP_COLOR, WHITE, BLACK } from "../../component/constant/Color";
import MatchingStyle from "./MatchingStyle";
import { NavigationEvents } from "react-navigation";
import Likedislike from "../../component/common/Likedislike";
import strings from "../../screens/Matching/MatchingLocalization";
import * as RNLocalize from 'react-native-localize';
import ParanuLog from "../../Helper/ParanuLog";
const route = new Route(url);
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const newInnerviewHeight =
  Platform.OS === "ios" &&
  (HEIGHT === 812 || WIDTH === 812 || (HEIGHT === 896 || WIDTH === 896))
    ? HEIGHT - 150
    : HEIGHT - 100;

var matchListGlobal = [];

class Matching extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    
    this.state = {
      loading: false,
      popUpView: false,
      matchList: [],
      selectedPetInfo: [],
      noData: false,
      matching:true,
      matchFound:true,
  }
    };
    

  

  getMatchList() {
    this.setState({ loading: true });
    var token = this.props.userToken;
    route.getAuthenticated("pet/matchlist", token).then(async response => {
      if (response.error) {
        this.setState({ loading: false });
        Alert.alert(strings.alert1);
      } else {
        this.props.getAllMatchList(response);
        this.setState({ loading: false });
        if(response.length>0){
          this.setPetMatchList(response);
          this.setState({ matchList: response });
        }
        
        // console.log("tokenCheckingResponse",JSON.stringify(response))
        
      }
    });
  }

  setPetMatchList(list) {
    matchListGlobal=[]
    list.forEach((match, index) => {
      var randomData = {};
      randomData.data = match;
      randomData.index = index;
      matchListGlobal.push(randomData);
    });
  }

  componentDidMount() {
    if (this.props.allMatchList == "") {
      this.getMatchList();
    }
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    countryInfo=RNLocalize.getLocales();
                switch (countryInfo[0].languageCode){
      case "sv":
      strings.setLanguage("sv")
      break;
      case "it":
      strings.setLanguage("it")
      break;
      case "fr":
      strings.setLanguage("fr")
      break;
      case "es":
      strings.setLanguage("es")
      break;
      case "de":
      strings.setLanguage("ddr")
      break;
      case "ru":
      strings.setLanguage("ru")
      break;
      case "pt":
      strings.setLanguage("es");
      break;
      case "tt":
      strings.setLanguage("ru");
      break;
      default :
      strings.setLanguage("en")
      break;
    }
  }

  renderPet = item => {
    return (
      <MatchingStyle.MatchListContainer
        activeOpacity={0.8}
        onPress={() => {
          this.setState({ selectedPetInfo: item, popUpView: true });
        }}
      >
        <MatchingStyle.ButtonTextStyle>
          {item.otherPet.user.name}
        </MatchingStyle.ButtonTextStyle>
        <MatchingStyle.HorizontalView>
          <MatchingStyle.VerticalView>
            <ImageView
              urlImageUri={item.myPet.petImages[0]}
              imageType={"externel"}
              customStyle={{
                height: 90,
                width: 90,
                borderWidth: 1,
                borderRadius: 45,
                borderColor: DARK_APP_COLOR,
                alignSelf: "center"
              }}
            />
            <MatchingStyle.ButtonTextStyle>
              {item.myPet.name}
            </MatchingStyle.ButtonTextStyle>
          </MatchingStyle.VerticalView>
          <MatchingStyle.MessageText>{strings.matched}</MatchingStyle.MessageText>
          <MatchingStyle.VerticalView>
            <ImageView
              urlImageUri={item.otherPet.petImages[0]}
              imageType={"externel"}
              customStyle={{
                height: 90,
                width: 90,
                borderWidth: 1,
                borderRadius: 45,
                borderColor: DARK_APP_COLOR,
                alignSelf: "center"
              }}
            />
            <MatchingStyle.ButtonTextStyle>
              {item.otherPet.name}
            </MatchingStyle.ButtonTextStyle>
          </MatchingStyle.VerticalView>
        </MatchingStyle.HorizontalView>
      </MatchingStyle.MatchListContainer>
    );
  };

  render() {
    return (
      <MatchingStyle.WrapperViewVertical>
        {!this.state.loading && (
          <SafeAreaView style={{
            backgroundColor: DARK_APP_COLOR,
            flex: 1,
            marginBottom: 50,
            }}>
            <Header headerText={strings.matchings} />

            <NavigationEvents
              onDidFocus={payload => {
                  this.getMatchList();
                
              }}
            />

            {this.state.matchList.length > 0 && matchListGlobal.length > 0 ? (
              <MatchingStyle.MatchList
                data={matchListGlobal}
                keyExtractor={item => item.index.toString()}
                renderItem={({ item }) => this.renderPet(item.data)}
              />
            ) : (
              <MatchingStyle.HorizontalView>
                <MatchingStyle.MessageText>
                  {strings.noMatchingYetSwipeToGetSome}
                </MatchingStyle.MessageText>
              </MatchingStyle.HorizontalView>
            )}
            {this.state.popUpView && (
              <MatchingStyle.MainPopUpView
                activeOpacity={0.9}
                onPress={() =>
                  this.setState({ popUpView: false, selectedPetInfo: [] })
                }
              >

                <MatchingStyle.PopUpViewInnerView activeOpacity={1}>
                  <MatchingStyle.verticalPopUpView>
                    <ImageView
                      urlImageUri={
                        this.state.selectedPetInfo.otherPet.petImages[0]
                      }
                      imageType={"externel"}
                      customStyle={{
                        height: newInnerviewHeight / 2.4,
                        width: WIDTH - 30,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: WHITE,
                        alignSelf: "center"
                      }}
                    />
                  </MatchingStyle.verticalPopUpView>

                  <MatchingStyle.verticalPopUpView>
                  <MatchingStyle.BackButton onPress={()=> this.setState({popUpView:false})} >
                        <MatchingStyle.MessageTexts >
                          {strings.back}
                        </MatchingStyle.MessageTexts>
                        </MatchingStyle.BackButton>
                        
                    <MatchingStyle.HorizontalViewPopUps>
                      <MatchingStyle.VerticalViewPopUp >
                        <MatchingStyle.MessageText>
                          {strings.name} :
                        </MatchingStyle.MessageText>
                      </MatchingStyle.VerticalViewPopUp>
                      <MatchingStyle.VerticalViewForDetail>
                          <MatchingStyle.ButtonTextStyle>
                              {this.state.selectedPetInfo.otherPet.name}
                          </MatchingStyle.ButtonTextStyle>
                      </MatchingStyle.VerticalViewForDetail>
                    </MatchingStyle.HorizontalViewPopUps>
                    <MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.VerticalViewPopUp >
                        <MatchingStyle.MessageText>
                          {strings.sex} :
                        </MatchingStyle.MessageText>
                      </MatchingStyle.VerticalViewPopUp>
                      <MatchingStyle.VerticalViewForDetail>
                      <MatchingStyle.ButtonTextStyle>
                              {this.state.selectedPetInfo.otherPet.sex == 'Male'? strings.male : this.state.selectedPetInfo.otherPet.sex == 'Female'? strings.female : strings.dosntMetter}
                          </MatchingStyle.ButtonTextStyle>
                      </MatchingStyle.VerticalViewForDetail>
                    </MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.VerticalViewPopUp >
                        <MatchingStyle.MessageText>
                          {strings.interest} :
                        </MatchingStyle.MessageText>
                      </MatchingStyle.VerticalViewPopUp>
                      <MatchingStyle.VerticalViewForDetail>
                      <MatchingStyle.ButtonTextStyle>
                      {this.state.selectedPetInfo.otherPet.interest.interests.map(data => {
                  return (
                    <MatchingStyle.ButtonTextStyle>
                      {data == 'Mate'?strings.mate: data == 'Walk' ? strings.walk : data == 'Meet' ? strings.meet : data == 'Talk' ? strings.talk : strings.sit}{" "}
                    </MatchingStyle.ButtonTextStyle>
                  );
                })}
                </MatchingStyle.ButtonTextStyle>
                      </MatchingStyle.VerticalViewForDetail>
                    </MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.VerticalViewPopUp >
                        <MatchingStyle.MessageText>
                          {strings.type} :
                        </MatchingStyle.MessageText>
                      </MatchingStyle.VerticalViewPopUp>
                      <MatchingStyle.VerticalViewForDetail>
                      <MatchingStyle.ButtonTextStyle>
                              {this.state.selectedPetInfo.otherPet.type === 'Crossbreed'? strings.crossBreed : this.state.selectedPetInfo.otherPet.type === 'Purebred'? strings.pureBreed : strings.dontKnow}
                          </MatchingStyle.ButtonTextStyle>
                      </MatchingStyle.VerticalViewForDetail>
                    </MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.HorizontalViewPopUp>
                    <MatchingStyle.VerticalViewPopUp >
                        <MatchingStyle.MessageText>
                          {strings.closestCity} :
                        </MatchingStyle.MessageText>
                      </MatchingStyle.VerticalViewPopUp>
                      <MatchingStyle.VerticalViewForDetail>
                      <MatchingStyle.ButtonTextStyle>
                              {this.state.selectedPetInfo.otherPet.user.city}
                          </MatchingStyle.ButtonTextStyle>
                      </MatchingStyle.VerticalViewForDetail>
                    </MatchingStyle.HorizontalViewPopUp>
                    {/* <MatchingStyle.BackButton onPress={()=> this.setState({popUpView:false})} >
                        <MatchingStyle.MessageTexts >
                          {strings.back}
                        </MatchingStyle.MessageTexts>
                        </MatchingStyle.BackButton> */}
                  </MatchingStyle.verticalPopUpView>
                  <MatchingStyle.PointThreeHorizontalView >
                    <MatchingStyle.VerticalView>
                        <MatchingStyle.ButtonBottom onPress={() =>
                      this.props.navigation.navigate("ProfileOther", {
                        idOfUser: this.state.selectedPetInfo.otherPet.user._id
                      })
                    }>
                           <SimpleLineIcons name={"user"} size={newInnerviewHeight-(newInnerviewHeight/1.02)} color={BLACK}/>
                           <MatchingStyle.BottomButtonText>
                            {" "} {strings.profile}
                           </MatchingStyle.BottomButtonText>
                        </MatchingStyle.ButtonBottom>
                    </MatchingStyle.VerticalView>
                    <MatchingStyle.VerticalView>
                      <MatchingStyle.ButtonBottom onPress={()=>this.props.navigation.navigate("MessageSpecific", {
                        from: "Matching",
                        recieverId: this.state.selectedPetInfo.otherPet.user._id,
                        senderId: this.props.userDetail._id,
                        userInfo: this.state.selectedPetInfo.otherPet.user

                      })}>
                          <Entypo name={"new-message"} size={newInnerviewHeight-(newInnerviewHeight/1.02)} color={BLACK}/>
                          <MatchingStyle.BottomButtonText>
                            {" "} {strings.message}
                           </MatchingStyle.BottomButtonText>
                        </MatchingStyle.ButtonBottom>
                    </MatchingStyle.VerticalView>
                  </MatchingStyle.PointThreeHorizontalView>
                </MatchingStyle.PopUpViewInnerView>
              </MatchingStyle.MainPopUpView>
            )}
            
          </SafeAreaView>
        )}

        {this.state.matchList.length > 0 && this.state.matchFound && 
        <Likedislike 
        lan = {strings}
        myPetImageUri={this.state.matchList[0].myPet.petImages[0]}
        otherPetImageUri={this.state.matchList[0].otherPet.petImages[0]}
        continueSwipePress={() => this.setState({matchFound:false}) }
        sendmessagePress={() => this.props.navigation.navigate("MessageSpecific", {
                        from: "Matching",
                        recieverId: this.state.matchList[0].otherPet.user._id,
                        senderId: this.props.userDetail._id,
                        userInfo: this.state.matchList[0].otherPet.user,
                      })}/>}
        {this.state.loading && <ActivityLoading /> }        
      </MatchingStyle.WrapperViewVertical>
    );
  }
}

const styles = StyleSheet.create({
  BlackShadow: {
    shadowOffset: { width: 0.5, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.35
  }
});

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
    allMatchList: state.pet.allMatchList,
    languageOfApp: state.appState.languageOfApp,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matching);
