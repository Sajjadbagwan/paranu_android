import React, { Component } from "react";
import { StyleSheet, Alert, Image,Platform,Button,
                                    View,Dimensions,Modal,TouchableHighlight,Text
                                     } from "react-native";

import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import VideoPlayer from 'react-native-video-controls';
import ImageView from "../../component/common/ImageView";
import ProfileStyle from "./ProfileStyle";
import Header from "../../component/common/Header";
import { DARK_APP_COLOR,BLACK_ALPHA,APP_COLOR } from "../../component/constant/Color";
import AntDesign from "react-native-vector-icons/AntDesign";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions"; //Import your actions
import FullScreenImageView from "../../component/common/FullScreenImageView";
//import strings from './ProfileLocalization'

import { NavigationEvents } from "react-navigation";
import strings from "../../screens/Profile/ProfileLocalization";
import * as RNLocalize from 'react-native-localize';

const route = new Route(url);
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

class Profile extends Component {
videoPlayer;
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      brief_info: "",
      indexOfPet: 0,
      showFullImageView: "",
      fullScreenImageUri: "",

      modalVisible: false,
      currentTime: 0,
      duration: 0,
      isFullScreen: true,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
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
  setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  profileDataRetriver() {
    var userId = this.props.userDetail._id;
    var token = this.props.userToken;

    route
      .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
      .then(async response => {
        if (response.error) {
          Alert.alert(strings.internetIssue);
        } else {
          this.props.alterJustUser(response.user)
          this.props.setYourPet(response.pets);
        }
      });
  }
  petBirthChecker(data){
    return {data}
  }
onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });

  render() {
     return (
      <ProfileStyle.WrapperViewVertical>

        <NavigationEvents
          onWillFocus={payload => {
            this.profileDataRetriver();
            this.setState({ indexOfPet: this.props.indexOfPet });
          }}
        />
        <Header
          headerText= {strings.profile}
          textRightButton={strings.edit}
          navBarBackgroundColor={DARK_APP_COLOR}
          onPressRightButton={() =>
            // alert(JSON.stringify(this.props.userDetail))
            this.props.navigation.navigate("EditProfile", {
              petId: this.props.yourPetInfo[this.state.indexOfPet]._id
            })
          }
        />
        <ProfileStyle.MainViewScrollView>
          <ProfileStyle.TopImageViewContainer>
          <ImageView
              urlImageUri={this.props.userDetail.facebookId? 'https://graph.facebook.com/'+this.props.userDetail.facebookId+'/picture?type=large&height=320&width=420' :this.props.userDetail.userImage}
              imageType={this.props.userDetail.facebookId?"externalFb": "external"}
              customStyle={{
                height: 120,
                width: 120,
                borderWidth: 1,
                borderRadius: 60,
                borderColor: DARK_APP_COLOR,
                alignSelf: "center",
              }}
            />
          </ProfileStyle.TopImageViewContainer>
          <ProfileStyle.TextUserName>
            {this.props.userDetail.name}
          </ProfileStyle.TextUserName>
          <ProfileStyle.SecterNumberView>
            <ProfileStyle.BadgeNumberColorText>
              {strings.userid} {"  "}
            </ProfileStyle.BadgeNumberColorText>
            <ProfileStyle.TextUserName selectable={true}>
              {this.props.userDetail.secretNumber}
            </ProfileStyle.TextUserName>
          </ProfileStyle.SecterNumberView>

         {this.props.languageOfApp === 'ru'?
         <ProfileStyle.ChangePetRussianView>
            <ProfileStyle.FirstPetRussianText style={{ marginTop: this.props.languageOfApp === 'ru'? 10: 0}}>
              {/* {this.state.indexOfPet == 0
                ? "First"
                : this.state.indexOfPet == 1
                ? "Second"
                : "Third"}{" "} */}
              {strings.pet}
            </ProfileStyle.FirstPetRussianText>
            <ProfileStyle.ChangePetRussianButton
              onPress={() =>{
                this.props.navigation.navigate("SelectPet", { from: "Profile" })
              }
              }
            >
              <ProfileStyle.ChangeInterestText>
                {strings.otherPet}
              </ProfileStyle.ChangeInterestText>
            </ProfileStyle.ChangePetRussianButton>
          </ProfileStyle.ChangePetRussianView>
         :
         <ProfileStyle.ChangePetView>
            <ProfileStyle.FirstPetText>
              {/* {this.state.indexOfPet == 0
                ? "First"
                : this.state.indexOfPet == 1
                ? "Second"
                : "Third"}{" "} */}
              {strings.pet}
            </ProfileStyle.FirstPetText>
            <ProfileStyle.ChangePetButton
              onPress={() =>{
                this.props.navigation.navigate("SelectPet", { from: "Profile" })
              }
              }
            >
              <ProfileStyle.ChangeInterestText>
                {strings.otherPet}
              </ProfileStyle.ChangeInterestText>
            </ProfileStyle.ChangePetButton>
          </ProfileStyle.ChangePetView>}
          <ProfileStyle.PetImagesContainer>
            {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
              <ProfileStyle.PetImagesFlatList
                bounces={false}
                horizontal={true}
                data={this.props.yourPetInfo[this.state.indexOfPet].petImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ProfileStyle.PetImagesInner
                    activeOpacity={1}
                    onPress={() => {
                      this.setState({
                        fullScreenImageUri: item,
                        showFullImageView: true
                      });
                    }}
                  >
                    <ImageView
                      urlImageUri={item}
                      customStyle={{
                        height: 80,
                        width: 80,
                        alignSelf: "center",
                        backgroundColor: 'black'
                      }}
                      imageType={"external"}
                    />
                  </ProfileStyle.PetImagesInner>
                )}
              />
            )}
          </ProfileStyle.PetImagesContainer>
          <ProfileStyle.FirstPetText>
            {strings.petCertificate}
          </ProfileStyle.FirstPetText>
          <ProfileStyle.PetImagesContainer>
            {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 &&
            this.props.yourPetInfo[this.state.indexOfPet].petDocs.length > 0 ? (
              <ProfileStyle.PetImagesFlatList
                bounces={false}
                horizontal={true}
                data={this.props.yourPetInfo[this.state.indexOfPet].petDocs}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <ProfileStyle.PetImagesInner
                    activeOpacity={1}
                    onPress={() => {
                      this.setState({
                        fullScreenImageUri: item,
                        showFullImageView: true
                      });
                    }}
                  >
                    <ImageView
                      urlImageUri={item}
                      customStyle={{
                        height: 80,
                        width: 80,
                        alignSelf: "center"
                      }}
                      imageType={"external"}
                    />
                  </ProfileStyle.PetImagesInner>
                )}
              />
            ) : (
              <ProfileStyle.PetImagesFlatList />
            )}
          </ProfileStyle.PetImagesContainer>

           <ProfileStyle.FirstPetText>
                       {strings.petVideo}
                     </ProfileStyle.FirstPetText>
                     <ProfileStyle.PetImagesContainer>
                       <Modal
          animationType="slide"
          transparent={false}
          style={{height: 300, width: 300}}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50,position:'absolute',top:50,width:'100%'}}>
            <View>
              <Video
                   onEnd={this.onEnd}
                   onLoad={this.onLoad}
                   onLoadStart={this.onLoadStart}
                   onProgress={this.onProgress}
                   paused={this.state.paused}
                   ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                   resizeMode={this.state.screenType}
                   onFullScreen={this.state.isFullScreen}
                   source={{ uri: "https://paranu-public.s3.us-east-2.amazonaws.com/"+this.props.yourPetInfo[this.state.indexOfPet].petVideo }}
                   style={styles.mediaPlayer}
                   volume={10}
                   controls={true}
                 />
            </View>

              <Button title="Close" style={styles.popupclosebtnText} onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }} />

          </View>

        </Modal>


                       {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 &&
                       this.props.yourPetInfo[this.state.indexOfPet].petVideo.length > 0 ? (
                         <ProfileStyle.PetImagesFlatList
                           bounces={false}
                           horizontal={true}
                           data={this.props.yourPetInfo[this.state.indexOfPet].petVideo}
                           keyExtractor={(item, index) => index.toString()}
                           renderItem={({ item }) => (
                             <ProfileStyle.PetImagesInner
                               activeOpacity={1}
                               onPress={() => {
                                 this.setState({
                                   fullScreenImageUri: item,
                                   showFullImageView: false
                                 });
                               }}
                             >
                             <TouchableHighlight
                                       onPress={() => {
                                         this.setModalVisible(true);
                                       }}>
                                       <ImageView
                                         urlImageUri="images/general/videothumb.png"
                                         customStyle={{
                                           height: 80,
                                           width: 80,
                                           alignSelf: "center"
                                         }}
                                         imageType={"external"}
                                       />
                                 </TouchableHighlight>

                             </ProfileStyle.PetImagesInner>
                           )}
                         />
                       ) : (
                         <ProfileStyle.PetImagesFlatList />
                       )}
                     </ProfileStyle.PetImagesContainer>

          <ProfileStyle.DetailContainerView>
            <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <ProfileStyle.DetailTitleText>
                {strings.petName}
              </ProfileStyle.DetailTitleText>
              {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                <ProfileStyle.DetailText>
                  {this.props.yourPetInfo[this.state.indexOfPet].name}
                </ProfileStyle.DetailText>
              )}
            </ProfileStyle.HorizontalDetailInner>
          </ProfileStyle.DetailContainerView>
          <ProfileStyle.DetailContainerView>
            <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <ProfileStyle.DetailTitleText>
                {strings.petType}
              </ProfileStyle.DetailTitleText>
              {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                <ProfileStyle.DetailText>
                  {this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Bird'? strings.bird : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Cat'? strings.cat : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Cattle' ? strings.cattle : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Dog' ? strings.dog : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Fish' ? strings.fish : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Horse' ? strings.horse : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Mini pig' ? strings.miniPig :this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Rabbit' ? strings.rabbit : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Rodent' ? strings.rodent : this.props.yourPetInfo[this.state.indexOfPet].petCategory === 'Reptile' ? strings.reptile : strings.other}
                </ProfileStyle.DetailText>
              )}
            </ProfileStyle.HorizontalDetailInner>
          </ProfileStyle.DetailContainerView>


            <ProfileStyle.DetailContainerView>
                                  <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
                                    <ProfileStyle.DetailTitleText>{strings.birthDate}</ProfileStyle.DetailTitleText>

                                      <ProfileStyle.DetailText>
                                       {this.props.yourPetInfo[this.props.indexOfPet].birthDate}
                                      </ProfileStyle.DetailText>

                                  </ProfileStyle.HorizontalDetailInner>
                                </ProfileStyle.DetailContainerView>





          <ProfileStyle.DetailContainerView>
            <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <ProfileStyle.DetailTitleText>{strings.breed}</ProfileStyle.DetailTitleText>
              {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                <ProfileStyle.DetailText>
                  {this.props.yourPetInfo[this.state.indexOfPet].type === 'Crossbreed'? strings.crossBreed : this.props.yourPetInfo[this.state.indexOfPet].type === 'Purebred'? strings.pureBreed : strings.dontKnow}
                </ProfileStyle.DetailText>
              )}
            </ProfileStyle.HorizontalDetailInner>
          </ProfileStyle.DetailContainerView>
          <ProfileStyle.DetailContainerView>
            <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <ProfileStyle.DetailTitleText>{strings.size}</ProfileStyle.DetailTitleText>
              {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                <ProfileStyle.DetailText>
                  {this.props.yourPetInfo[this.state.indexOfPet].size === 'Small'? strings.small : this.props.yourPetInfo[this.state.indexOfPet].size === 'Medium'? strings.medium : this.props.yourPetInfo[this.state.indexOfPet].size  === 'Big'? strings.big : strings.dosntMetter}
                </ProfileStyle.DetailText>
              )}
            </ProfileStyle.HorizontalDetailInner>
          </ProfileStyle.DetailContainerView>

          <ProfileStyle.DetailContainerView>
            <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <ProfileStyle.DetailTitleText>{strings.sex}</ProfileStyle.DetailTitleText>
              {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                <ProfileStyle.DetailText>
                  {this.props.yourPetInfo[this.state.indexOfPet].sex == 'Male'? strings.male : this.props.yourPetInfo[this.state.indexOfPet].sex == 'Female'? strings.female : strings.dosntMetter}
                </ProfileStyle.DetailText>
              )}
            </ProfileStyle.HorizontalDetailInner>
          </ProfileStyle.DetailContainerView>



          <ProfileStyle.DetailContainerView>
            <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
              <ProfileStyle.DetailTitleText>{strings.city}</ProfileStyle.DetailTitleText>
              <ProfileStyle.DetailText>
                {this.props.userDetail.city}
              </ProfileStyle.DetailText>
            </ProfileStyle.HorizontalDetailInner>
          </ProfileStyle.DetailContainerView>
          <ProfileStyle.BriefInfoContainerView>
            <ProfileStyle.BriefInfoInner style={styles.GreyShadow1}>
              <ProfileStyle.BriefInfoHeadertext>
                {strings.briefInformation}
              </ProfileStyle.BriefInfoHeadertext>
              {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                <ProfileStyle.BriefInformationDetail numberOfLines={4}>
                  {
                    this.props.yourPetInfo[this.state.indexOfPet]
                      .briefInformation
                  }
                </ProfileStyle.BriefInformationDetail>
              )}
            </ProfileStyle.BriefInfoInner>
          </ProfileStyle.BriefInfoContainerView>
          <ProfileStyle.DividerLine />
          <ProfileStyle.FirstPetText>{strings.lookingFor}</ProfileStyle.FirstPetText>
          {this.props.yourPetInfo[this.props.indexOfPet].interest && (
            <ProfileStyle.DetailContainerView>
              <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
                <ProfileStyle.DetailTitleText>
                  {strings.petType}
                </ProfileStyle.DetailTitleText>
                <ProfileStyle.DetailText>
                  {
                    this.props.yourPetInfo[this.props.indexOfPet].interest
                      .petCategory === 'Bird'? strings.bird : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Cat'? strings.cat : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Cattle' ? strings.cattle : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Dog' ? strings.dog : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Fish' ? strings.fish : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Horse' ? strings.horse : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Mini pig' ? strings.miniPig : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Rabbit' ? strings.rabbit : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Rodent' ? strings.rodent : this.props.yourPetInfo[this.props.indexOfPet].interest.petCategory === 'Reptile' ? strings.reptile : strings.other
                  }
                </ProfileStyle.DetailText>
              </ProfileStyle.HorizontalDetailInner>
            </ProfileStyle.DetailContainerView>
          )}
          {this.props.yourPetInfo[this.props.indexOfPet].interest && (
            <ProfileStyle.DetailContainerView>
              <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
                <ProfileStyle.DetailTitleText>
                  {strings.breed}
                </ProfileStyle.DetailTitleText>
                {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                  <ProfileStyle.DetailText>
                    {
                      this.props.yourPetInfo[this.props.indexOfPet].interest.type === 'Crossbreed'? strings.crossBreed : this.props.yourPetInfo[this.props.indexOfPet].interest.type === 'Purebred'? strings.pureBreed : strings.dontKnow

                    }
                  </ProfileStyle.DetailText>
                )}
              </ProfileStyle.HorizontalDetailInner>
            </ProfileStyle.DetailContainerView>
          )}
          {this.props.yourPetInfo[this.props.indexOfPet].interest && (
            <ProfileStyle.DetailContainerView>
              <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
                <ProfileStyle.DetailTitleText>
                  {strings.size}
                </ProfileStyle.DetailTitleText>
                <ProfileStyle.DetailText>
                  {this.props.yourPetInfo[this.props.indexOfPet].interest.size === 'Small'? strings.small : this.props.yourPetInfo[this.props.indexOfPet].interest.size === 'Medium'? strings.medium : this.props.yourPetInfo[this.props.indexOfPet].interest.size === 'Big'? strings.big : strings.dosntMetter}
                </ProfileStyle.DetailText>
              </ProfileStyle.HorizontalDetailInner>
            </ProfileStyle.DetailContainerView>
          )}
          {this.props.yourPetInfo[this.props.indexOfPet].interest && (
            <ProfileStyle.DetailContainerViewEnd>
              <ProfileStyle.HorizontalDetailInner style={styles.GreyShadow1}>
                <ProfileStyle.DetailTitleText>{strings.sex}</ProfileStyle.DetailTitleText>
                {this.props.yourPetInfo  && this.props.yourPetInfo.length > 0 && (
                  <ProfileStyle.DetailText>
                    {this.props.yourPetInfo[this.props.indexOfPet].interest.sex == 'Male'? strings.male : this.props.yourPetInfo[this.props.indexOfPet].interest.sex == 'Female'? strings.female : strings.dosntMetter}
                  </ProfileStyle.DetailText>
                )}
              </ProfileStyle.HorizontalDetailInner>
            </ProfileStyle.DetailContainerViewEnd>
          )}
          {!this.props.yourPetInfo[this.props.indexOfPet].interest && (
            <ProfileStyle.ChangeInterestContainer>
              <ProfileStyle.ChangeInterestButton
                onPress={() =>
                  this.props.navigation.push("PetULookingFor", {
                    petId: this.props.yourPetInfo[this.props.indexOfPet]._id,
                    recentPath: "profile"
                  })
                }
              >
                <ProfileStyle.ChangeInterestText>
                  {strings.addInterest}
                </ProfileStyle.ChangeInterestText>
              </ProfileStyle.ChangeInterestButton>
            </ProfileStyle.ChangeInterestContainer>
          )}
          <ProfileStyle.AddButtonButtonView>
          <ProfileStyle.AddPetButton
            onPress={() =>{
              this.props.navigation.push("PetInfoInitial", {
                recentPath: "profile"
              })
            }
            }
          >
            <ProfileStyle.Textinformation>{strings.addPet}</ProfileStyle.Textinformation>
          </ProfileStyle.AddPetButton>
        </ProfileStyle.AddButtonButtonView>
        </ProfileStyle.MainViewScrollView>
        {this.state.showFullImageView ? (
          <FullScreenImageView
            imageUri={this.state.fullScreenImageUri}
            closePressed={() => this.setState({ showFullImageView: false })}
          />
        ) : null}
      </ProfileStyle.WrapperViewVertical>
    );
  }
}
const styles = StyleSheet.create({
  GreyShadow: {
    shadowOffset: { width: 0, height: 3.5 },
    shadowColor: "grey",
    shadowOpacity: 1,
    elevation: 3
  },
  GreyShadow1: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3
  },
  container: {
      flex: 1,
    },
    toolbar: {
      marginTop: 30,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
    },
    mediaPlayer: {
      position: 'absolute',
      width:'100%',
      height: HEIGHT / 2.4,
      borderRadius: 0,
      borderColor: BLACK_ALPHA,
      opacity: 1,
      top:50,
      backgroundColor: 'white',
      borderColor: APP_COLOR,
      borderWidth: 1

    },
    popupclosebtnText:{
      width:'20%',
      justifyContent:'center'
    }
});

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    yourPetInfo: state.pet.yourPetDetail,
    moveCalled:true,
    allPets: state.pet.allPets,
    allAds: state.pet.allAds,
    allAdsFromProps:state.pet.allAds,
    indexOfPet: state.pet.petIndex,
    languageOfApp: state.appState.languageOfApp,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
