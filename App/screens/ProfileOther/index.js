import React, { Component } from "react";
import { StyleSheet, TextInput, Alert, Image,Platform,Button,
                                    View,Dimensions,Modal,TouchableHighlight,Text } from "react-native";

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import ImageView from "../../component/common/ImageView";
import ProfileOtherStyle from "./ProfileOtherStyle";
import Header from "../../component/common/Header";
import { DARK_APP_COLOR,BLACK_ALPHA,APP_COLOR } from "../../component/constant/Color";
import AntDesign from "react-native-vector-icons/AntDesign";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions"; //Import your actions
import ActivityLoading from "../../component/common/ActivityLoading";
import Pets from "../../component/common/Pets";
import FullScreenImageView from "../../component/common/FullScreenImageView";
import strings from './ProfileOtherLocalization'
import { NavigationEvents } from "react-navigation";
import * as RNLocalize from 'react-native-localize';

const route = new Route(url);
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
var petsArray = [];

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
      loading: true,
      userPetsInfo: "",
      userInfo: "",
      userInterestInfo : "",
      indexOfIntrest:0,
      selectPetpop: false,
      allPets: "",
      showFullImageView: false,
      fullScreenImageUri: "",
      loadingText:'',

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
  profileDataRetriver(params) {
    var token = this.props.userToken;
    route
      .getAuthenticated(
        "user/" + JSON.parse(JSON.stringify(params.idOfUser)),
        token
      )
      .then(async response => {
        if (response.error) {
          this.setState({ loading: false });
          Alert.alert(strings.alert1);
        } else {
          this.setState({ userInfo: response.user });
          this.setState({ userPetsInfo: response.pets });
          this.setState({ loading: false });
          petsArray = [];
          if (response.pets.length > 0) {
            this.petListGenrator(response.pets);
          }
          if(this.props.languageOfApp){
            strings.setLanguage(this.props.languageOfApp)
          }
        }
      });
  }

  petListGenrator(data) {
    petsArray = [];
    data.forEach((petD, index) => {
      pet = {};
      pet.name = petD.name;
      pet.index = index;
      pet.petImage=petD.petImages;
      if(petD.interest){
        pet.interests=petD.interest.interests
      }
      else{
        pet.interest="nothing"
      }

      petsArray.push(pet);
    });
  }

  reportUser(id){
    const url = "user/"+id+"/report";
    // alert(`id: ${id} url: ${url}`);
    this.setState({loading:true,loadingText:strings.reporting})

    route.getAuthenticatedMessage(url, this.props.userToken).then(async response => {
    if (response.error) {
      this.setState({ loading: false,loadingText:'' });
      Alert.alert(strings.alreadyReported);
    } else {
      this.setState({loadingText:strings.reported });
      setTimeout(()=>{ this.setState({loading:false}) }, 500);
      alert(strings.success);
    }
  }).catch(async error => {
    this.setState({ loading: false,loadingText:'' });
    //console.log(`Error: ${JSON.stringify(error)}`);
  });
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

    onProgress(data){
      const { isLoading, playerState } = this.state;
      // Video Player will continue progress even if the video already ended
      if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
        this.setState({ currentTime: data.currentTime });
      }
    }

    onLoad(data){
       this.setState({ duration: data.duration, isLoading: false });
    }

    onLoadStart(){
      this.setState({ isLoading: true });
    }

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
    const { params } = this.props.navigation.state;
    return (
      <ProfileOtherStyle.WrapperViewVertical>
        <NavigationEvents
          onDidFocus={payload => {
            this.setState({ loading: true });
            this.profileDataRetriver(params);

          }}
        />
        <Header
          iconName={"arrowleft"}
          iconColor={"white"}
          onPressButton={() => this.props.navigation.goBack()}
          headerText={strings.userProfile}
          navBarBackgroundColor={DARK_APP_COLOR}
          rightImageSource={require('../../assets/images/report_logo_button.png')}
          onPressRightButton={()=>{
            Alert.alert(
        strings.reportUser,
        "",
        [
          {
            text: strings.report,
            onPress: () => {this.reportUser(params.idOfUser)}
          },
          { text: strings.cancel }
        ],
        { cancelable: false }
      );
          }
          }
        />
        {this.state.userInfo.length != "" && (
          <ProfileOtherStyle.MainViewScrollView>
            <ProfileOtherStyle.TopImageViewContainer>
              <ImageView
                urlImageUri={this.state.userInfo.facebookId? 'https://graph.facebook.com/'+this.state.userInfo.facebookId+'/picture?type=large&height=320&width=420' :this.state.userInfo.userImage}
                imageType={this.state.userInfo.facebookId ? "externalFb": "external"}
                customStyle={{
                  height: 120,
                  width: 120,
                  borderWidth: 1,
                  borderRadius: 60,
                  borderColor: DARK_APP_COLOR,
                  alignSelf: "center"
                }}
              />
            </ProfileOtherStyle.TopImageViewContainer>
            <ProfileOtherStyle.TextUserName>
              {this.state.userInfo.name}
            </ProfileOtherStyle.TextUserName>
            <ProfileOtherStyle.ChangePetView>
              <ProfileOtherStyle.FirstPetText>
                {strings.pet}
              </ProfileOtherStyle.FirstPetText>
              <ProfileOtherStyle.ChangePetButton
                onPress={() => {
                  this.setState({ selectPetpop: true });
                }}
              >
                <ProfileOtherStyle.ChangeInterestText>
                  {strings.otherPet}
                </ProfileOtherStyle.ChangeInterestText>
              </ProfileOtherStyle.ChangePetButton>
            </ProfileOtherStyle.ChangePetView>
            {this.state.userPetsInfo.length > 0 && (
              <ProfileOtherStyle.petInfoMainView>
                {this.state.userPetsInfo.length > 0 &&
                  this.state.userPetsInfo[this.state.indexOfPet].petImages
                    .length > 0 && (
                    <ProfileOtherStyle.PetImagesContainer>
                      <ProfileOtherStyle.PetImagesFlatList
                        bounces={false}
                        horizontal={true}
                        data={
                          this.state.userPetsInfo[this.state.indexOfPet]
                            .petImages
                        }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <ProfileOtherStyle.PetImagesInner
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
                          </ProfileOtherStyle.PetImagesInner>
                        )}
                      />
                    </ProfileOtherStyle.PetImagesContainer>
                  )}
                <ProfileOtherStyle.FirstPetText>
                  {strings.petCertificates}
                </ProfileOtherStyle.FirstPetText>
                <ProfileOtherStyle.PetImagesContainer>
                  {this.state.userPetsInfo[this.state.indexOfPet].petDocs
                    .length > 0 ? (
                    <ProfileOtherStyle.PetImagesFlatList
                      bounces={false}
                      horizontal={true}
                      data={
                        this.state.userPetsInfo[this.state.indexOfPet].petDocs
                      }
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <ProfileOtherStyle.PetImagesInner
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
                        </ProfileOtherStyle.PetImagesInner>
                      )}
                    />
                  ) : (
                    <ProfileOtherStyle.PetImagesFlatList />
                  )}
                </ProfileOtherStyle.PetImagesContainer>

                <ProfileOtherStyle.FirstPetText>
                  {strings.petVideo}
                </ProfileOtherStyle.FirstPetText>
                <ProfileOtherStyle.PetImagesContainer>
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
                         <VideoPlayer
                              onEnd={this.onEnd}
                              onLoad={e => this.onLoad(e)}
                              onLoadStart={e => this.onLoadStart(e)}
                              onProgress={e => this.onProgress(e)}
                              paused={this.state.paused}
                              ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                              resizeMode={this.state.screenType}
                              onFullScreen={this.state.isFullScreen}
                              source={{ uri: "https://paranu-public.s3.us-east-2.amazonaws.com/"+this.state.userPetsInfo[this.state.indexOfPet].petVideo }}
                              style={styles.mediaPlayer}
                              volume={10}
                              controls={true}
                            />

                       <Button title="Close" style={styles.popupclosebtnText} onPress={() => {
                         this.setModalVisible(!this.state.modalVisible);
                       }} />
                   </View>
                 </View>


                   </Modal>


                  {this.state.userPetsInfo[this.state.indexOfPet].petVideo
                    .length > 0 ? (
                    <ProfileOtherStyle.PetImagesFlatList
                      bounces={false}
                      horizontal={true}
                      data={
                        this.state.userPetsInfo[this.state.indexOfPet].petVideo
                      }
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (

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

                      )}
                    />
                  ) : (
                    <ProfileOtherStyle.PetImagesFlatList />
                  )}
                </ProfileOtherStyle.PetImagesContainer>

                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.petName}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {this.state.userPetsInfo[this.state.indexOfPet].name}
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.petType}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {
                        this.state.userPetsInfo[this.state.indexOfPet].petCategory === 'Bird'? strings.bird : this.state.userPetsInfo[this.state.indexOfPet].petCategory === 'Cat'? strings.cat : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Cattle' ? strings.cattle : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Dog' ? strings.dog : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Fish' ? strings.fish : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Horse' ? strings.horse : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Mini pig' ? strings.miniPig : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Rabbit' ? strings.rabbit : this.state.userPetsInfo[this.state.indexOfPet].petCategory  === 'Rodent' ? strings.rodent : this.state.userPetsInfo[this.state.indexOfPet].petCategory   === 'Reptile' ? strings.reptile : strings.other
                      }
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.birthDate}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {this.state.userPetsInfo[this.state.indexOfPet].birthDate}
                    </ProfileOtherStyle.DetailText>



                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.breed}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {this.state.userPetsInfo[this.state.indexOfPet].type === 'Crossbreed'? strings.crossBreed : this.state.userPetsInfo[this.state.indexOfPet].type === 'Purebred'? strings.pureBreed : strings.dontKnow}
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>

                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.size}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {this.state.userPetsInfo[this.state.indexOfPet].size === 'Small'? strings.small : this.state.userPetsInfo[this.state.indexOfPet].size === 'Medium'? strings.medium : this.state.userPetsInfo[this.state.indexOfPet].size === 'Big'? strings.big : strings.dosntMetter}
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>

                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.sex}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {this.state.userPetsInfo[this.state.indexOfPet].sex == 'Male'? strings.male :
                      this.state.userPetsInfo[this.state.indexOfPet].sex == 'Female'? strings.female :
                      strings.dosntMetter}
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>


                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                    {strings.interest}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                       {

                       this.state.userPetsInfo[this.state.indexOfPet] && this.state.userPetsInfo[this.state.indexOfPet].interest.interests.map(data => {
                         return (
                           data == "Mate"
                         ? strings.mate+" "
                         : data == "Walk"
                           ? strings.walk+" "
                           : data == "Meet"
                             ? strings.meet+" "
                             : data == "Talk"
                               ? strings.talk+" "
                               : strings.sit
                             );
                      })
                      }{" "}

                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>

                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.city}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {this.state.userInfo.city}
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.BriefInfoContainerView>
                  <ProfileOtherStyle.BriefInfoInner style={styles.GreyShadow1}>
                    <ProfileOtherStyle.BriefInfoHeadertext>
                        {strings.briefInformation}
                    </ProfileOtherStyle.BriefInfoHeadertext>
                    {this.state.userPetsInfo.length > 0 && (
                      <ProfileOtherStyle.BriefInformationDetail
                        numberOfLines={4}
                      >
                        {
                          this.state.userPetsInfo[this.state.indexOfPet]
                            .briefInformation
                        }
                      </ProfileOtherStyle.BriefInformationDetail>
                    )}
                  </ProfileOtherStyle.BriefInfoInner>
                </ProfileOtherStyle.BriefInfoContainerView>
                <ProfileOtherStyle.DividerLine />
                <ProfileOtherStyle.FirstPetText>
                  {strings.lookingFor}
                </ProfileOtherStyle.FirstPetText>
               { this.state.userPetsInfo[this.state.indexOfPet].interest&& <ProfileOtherStyle.LookingPetDetailContainer>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.petType}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {
                        this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory === 'Bird'? strings.bird : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Cat'? strings.cat : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Cattle' ? strings.cattle : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Dog' ? strings.dog : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Fish' ? strings.fish : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Horse' ? strings.horse : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Mini pig' ? strings.miniPig : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory  === 'Rabbit' ? strings.rabbit : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory === 'Rodent' ? strings.rodent
                        : this.state.userPetsInfo[this.state.indexOfPet].interest.petCategory=== 'Reptile' ? strings.reptile : strings.other
                      }
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.breed}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {
                        this.state.userPetsInfo[this.state.indexOfPet].interest.type === 'Crossbreed'? strings.crossBreed : this.state.userPetsInfo[this.state.indexOfPet].interest.type === 'Purebred'? strings.pureBreed : strings.dontKnow
                      }
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                      {strings.size}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {
                        this.state.userPetsInfo[this.state.indexOfPet].interest.size === 'Small'? strings.small : this.state.userPetsInfo[this.state.indexOfPet].interest.size === 'Medium'? strings.medium : this.state.userPetsInfo[this.state.indexOfPet].interest.size === 'Big'? strings.big : strings.dosntMetter
                      }
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                <ProfileOtherStyle.DetailContainerView>
                  <ProfileOtherStyle.HorizontalDetailInner
                    style={styles.GreyShadow1}
                  >
                    <ProfileOtherStyle.DetailTitleText>
                    {strings.sex}
                    </ProfileOtherStyle.DetailTitleText>
                    <ProfileOtherStyle.DetailText>
                      {
                        this.state.userPetsInfo[this.state.indexOfPet].interest.sex == 'Male'? strings.male : this.state.userPetsInfo[this.state.indexOfPet].interest.sex == 'Female'? strings.female : strings.dosntMetter
                      }
                    </ProfileOtherStyle.DetailText>
                  </ProfileOtherStyle.HorizontalDetailInner>
                </ProfileOtherStyle.DetailContainerView>
                </ProfileOtherStyle.LookingPetDetailContainer>}
              </ProfileOtherStyle.petInfoMainView>
            )}
          </ProfileOtherStyle.MainViewScrollView>
        )}
        {this.state.selectPetpop && petsArray.length > 0 && (
          <Pets
          lan= {strings}
            items={petsArray}
            index={this.state.indexOfPet}
            onItemPress={id => {
              this.setState({ indexOfPet: id, selectPetpop: false });
            }}
            onBackPress={() => this.setState({ selectPetpop: false })}
          />
        )}
        {this.state.loading && <ActivityLoading textLoading={this.state.loadingText}/>}
        {this.state.showFullImageView ? (
          <FullScreenImageView
            imageUri={this.state.fullScreenImageUri}
            closePressed={() => this.setState({ showFullImageView: false })}
          />
        ) : null}
      </ProfileOtherStyle.WrapperViewVertical>
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
  GreyShadow1: {
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 3
  }
});

function mapStateToProps(state, props) {
  return {
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
)(Profile);
