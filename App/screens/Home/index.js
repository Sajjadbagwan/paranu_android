import React, { Component } from "react";
import {
  Text,
  TextInput,
  Image,
  Animated,
  Dimensions,
  PanResponder,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
  View,
  Button,
  StyleSheet,
  Linking,
  TouchableOpacity
} from "react-native";

import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Header from "../../component/common/Header";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";

import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import ActivityLoading from "../../component/common/ActivityLoading";
import { NavigationEvents } from "react-navigation";
import Likedislike from "../../component/common/Likedislike";

import HomeStyle from "./HomeStyle";
import ImageView from "../../component/common/ImageView";
import CountDown from 'react-native-countdown-component';
import {
  DARK_APP_COLOR,
  BLACK_ALPHA,
  BLACK_TRANSPARENT,
  WHITE_Caream,
  BLACK,
  APP_COLOR
} from "../../component/constant/Color";
import PersonInfoHome from "../../component/common/PersonInfoHome";
import strings from "../../screens/Home/HomeLocalization";
import * as RNLocalize from "react-native-localize";
import ParanuLog from "../../Helper/ParanuLog";

const route = new Route(url);
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
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
    resizeMode:'cover',
    height: HEIGHT / 2.3,
    borderRadius: 0,
    borderColor: BLACK_ALPHA,
    opacity: 1,
    backgroundColor: 'white',
    borderColor: APP_COLOR,
    borderWidth: 1

  },
});
const styles_cus = StyleSheet.create({
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  mainBox:{
    position:'absolute'
  },
  red: {
    position: 'absolute',
    width:'100%',
    height: HEIGHT / 2.3,
    borderRadius: 0,
    borderColor: BLACK_ALPHA,
    opacity: 1,
    borderColor: APP_COLOR,
    borderWidth: 1,
    zIndex:9999

  },
});


class Home extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.getMessages();
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp);
    }
    this.position = new Animated.ValueXY();
    global.advertiseratio1 = 10;
    this.state = {
      imageindex: 0,
      adCounter:0,
      adIndexCounter:0,
      imageLength:0,
      currentIndex: 0,
      index_counter:1,
      adsView:false,
      moveCalled:false,
      swipeLoad:true,
      swipeEnable:true,
      tinderLoad:false,
      adsIndex:0,
      adsImpression:0,
      searchIndicator: false,
      searchList: [],
      loading: false,
      searchText: "",
      matchObject: "",
      personInfoPopUp: false,
      imageReplace: true,
      noData: false,
      matching: false,
      advertiseratio:10,
      ready: false,
      timePassed: false,
      currentPetId:0,
      allPetFromProps: this.props.allPets,
      allAdsFromProps: this.props.allAds != 'undefined' ? this.props.allAds:[],
      allAdsFromProps_clone: this.props.allAds != 'undefined' ? this.props.allAds:[],
      allSettingsFromProps: this.props.allSettings!= 'undefined' ? this.props.allSettings:10,
      currentTime: 0,
      loadOnce:true,
            duration: 0,
            isFullScreen: true,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cover',
    };
    this.adsImpressionSet = this.adsImpressionSet.bind(this);
    this.adsHandler = this.adsHandler.bind(this);
    this.swipeTinder = this.swipeTinder.bind(this);
    this.LinkButton = this.LinkButton.bind(this);
    this.rotate = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: "clamp"
    });

    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [1, 0.1, 1],
      extrapolate: "clamp"
    });
  }
  LinkButton(link){
    Linking.openURL(link).catch((err) => console.error('An error occurred', err));
  }
  getMessages() {
    var token = this.props.userToken;

    route.getAuthenticatedMessage("messages", token).then(async response => {
      if (response.error) {
        Alert.alert(strings.alert1);
      } else {
        this.props.setAllMessage(response);
      }
    });
  }

  getAllPets() {
    // ParanuLog.debug('ín the get all pet');
    this.setState({ allPetFromProps: [] });
    //this.setState({ allAdsFromProps: [] });
    this.setState({ loading: true });
    var token = this.props.userToken;
    route.getAuthenticated("pet/", token).then(async response => {
      if (response.error) {
        this.setState({ loading: false });
        Alert.alert(strings.alert1);
      } else {
        this.forceUpdate();
        this.setState({
          ready: true,
          currentIndex: 0,
          currentPetId:response[this.state.currentIndex]?response[this.state.currentIndex]._id:0,
          allPetFromProps: response
        });
        // ParanuLog.info(`countAllPet: ${this.state.allPetFromProps.length}`);
        this.props.getAllPets(response);
        this.setState({ loading: false });
      }
    });
  }

  getAdvertise() {
      //ParanuLog.debug('ín the get all pet1');
      this.setState({ allAdsFromProps: [] });
      this.setState({ loading: true });
      var token = this.props.userToken;
      route.getAuthenticated("pet/getadvertisement/", token).then(async response => {

        if (response.error) {
          this.setState({ loading: false });
          //Alert.alert(strings.alert1);
        } else {
          this.forceUpdate();
          this.setState({
            ready: true,
            adIndexCounter: 0,
            allAdsFromProps: response
          });
          // ParanuLog.info(`countAllPet: ${this.state.allAdsFromProps.length}`);
        //  this.props.getAdvertise(response);
          this.setState({ loading: false });
        }
      });


    }

  getSettings(){
    this.setState({ loading: true });
    this.setState({ allSettingsFromProps: [] });
    var token = this.props.userToken;
    route.getAuthenticated("pet/getSettings/", token).then(async response => {
        if (response.error) {
          Alert.alert(strings.alert1);
        } else {
            global.advertiseratio1 = response.advertiseratio;

            //this.setState({advertiseratio:response.advertiseratio});

            this.setState({ loading: false });
        }

      });
  }

  profileDataRetriver() {
    var userId = this.props.userDetail._id;
    var token = this.props.userToken;

    route
      .getAuthenticated("user/" + JSON.parse(JSON.stringify(userId)), token)
      .then(async response => {
        if (response.error) {
          Alert.alert(strings.alert1);
        } else {
          this.setState({ currentIndex: 0 });
          if (this.props.yourPetInfo == "") {
            this.profileDataRetriver();
          }
        }
      });


  }

  componentDidMount() {
    this.mounted = true;
    this.getAllPets();
    this.getAdvertise();
    this.getSettings();
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


  }

  swipeTinder(){
    this.getAllPets();
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
          this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
         const{currentIndex,adsIndex,allAdsFromProps,adsView} = this.state;



      },
      onPanResponderRelease: (evt, gestureState) => {
            const{index_counter,currentIndex,adsIndex,allAdsFromProps,adsView} = this.state;
              if (gestureState.dx > 120 || gestureState.dx < -120) {
                if(index_counter % global.advertiseratio1 == 0){
                   //alert('ads load')
                  this.setState({moveCalled:false,adsView:false},()=>{
                         if(allAdsFromProps != 'undefined' && allAdsFromProps.length > 0){
                            this.setState({adsView:true,swipeEnable:true });
                            this.adsImpressionSet(allAdsFromProps[adsIndex]._id,allAdsFromProps[adsIndex].impression + 1)
                            this.position.setValue({ x: 0, y: 0 });
                         }
                   });
                 }
              }


        if (gestureState.dx == 0 && gestureState.dy == 0 && adsView == false) {
          this.props.setOpacityOfTabBar(0);
          this.setState({ personInfoPopUp: true});
        }


        if (gestureState.dx > 120) {
          if(allAdsFromProps.length > adsIndex){

            if(index_counter % global.advertiseratio1 == 0){
                this.setState({moveCalled:true,adsView:true, swipeLoad:false,swipeEnable:true })
                gestureState.dx = 0;
                gestureState.dy = 0;
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
                this.adsImpressionSet(allAdsFromProps[adsIndex]._id,allAdsFromProps[adsIndex].impression + 1)
            }
          }else{
          //  this.setState({adsView:false})

          }

          let allAds = allAdsFromProps;
          if(allAdsFromProps.length > 0 && adsView){
            this.setState({adsView:false},()=>{
                allAds.splice(adsIndex, 1);
            })
          }else{
            allAds = allAdsFromProps;
          }
          this.setState({allAdsFromProps:allAds});
          if(this.state.allAdsFromProps.length == 0){
            this.setState({adsView:false})
          }
          if(!adsView){
            this.likeApiCalling(this.props.allPets[this.state.currentIndex]._id);
          }


            Animated.spring(this.position, {
              toValue: { x: WIDTH + 100, y: gestureState.dy }
            }).start(() => {

                if(!adsView){
                  this.setState({currentIndex: this.state.currentIndex + 1,index_counter:this.state.index_counter + 1})
                }
                this.setState(
                  {
                    imageReplace: true,
                    imageindex: 0
                  },
                  () => {
                    this.position.setValue({ x: 0, y: 0 });
                    this.setState({currentPetId:this.state.allPetFromProps[this.state.currentIndex] && this.state.allPetFromProps[this.state.currentIndex]._id ? this.state.allPetFromProps[this.state.currentIndex]._id:this.state.currentPetId})
                  }
                );


            });


        } else if (gestureState.dx < -120) {
          if(allAdsFromProps.length > adsIndex){
            if(index_counter % global.advertiseratio1 == 0){
                this.setState({moveCalled:true,adsView:true, swipeLoad:false,swipeEnable:true })
                gestureState.dx = 0;
                gestureState.dy = 0;
                this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
                this.adsImpressionSet(allAdsFromProps[adsIndex]._id,allAdsFromProps[adsIndex].impression + 1)
            }
          }else{
          //  this.setState({adsView:false})

          }

          let allAds = allAdsFromProps;
          if(allAdsFromProps.length > 0 && adsView){
            this.setState({adsView:false},()=>{
                allAds.splice(adsIndex, 1);
            })
          }else{
            allAds = allAdsFromProps;
          }
          this.setState({allAdsFromProps:allAds});
          if(this.state.allAdsFromProps.length == 0){
            this.setState({adsView:false})
          }
          if(!adsView){
            this.disLikeApiCalling(
              this.props.allPets[this.state.currentIndex]._id
            );
          }

            Animated.spring(this.position, {
              toValue: { x: -WIDTH - 100, y: gestureState.dy }
            }).start(() => {

              if(!adsView){
                this.setState({currentIndex: this.state.currentIndex + 1,index_counter:this.state.index_counter + 1})
              }
              this.setState(
                {

                  imageReplace: true,
                  imageindex: 0,
                  currentPetId:this.props.allPets[this.state.currentIndex]._id,
                },
                () => {
                  this.position.setValue({ x: 0, y: 0 });
                }
              );

            });


        } else if (gestureState.dy > 120 && this.state.imageindex > 0) {
          this.position.setValue({ x: 0, y: 0 });
          this.setState({ imageindex: this.state.imageindex - 1 });
          this.setState({currentPetId:this.props.allPets[this.state.currentIndex]._id})
        } else if (gestureState.dy < -120) {
          if (
            this.state.imageindex !==
            (this.props.allPets[this.state.currentIndex].petImages.length + 1) - 1
          ) {
            this.setState({ imageindex: this.state.imageindex + 1 });
            this.setState({currentPetId:this.props.allPets[this.state.currentIndex]._id})
          }
          this.position.setValue({ x: 0, y: 0 });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 10
          }).start();
        }
      }
    });
  }
  componentWillMount() {
    this.swipeTinder();
  }
  componentWillUnmount(){
    this.mounted = false;
  }

  componentWillReceiveProps(props) {

    // ParanuLog.debug(`in the will recived props ${JSON.stringify(props)}`);
    // ParanuLog.debug(`distance changed props: ${JSON.stringify(this.props.distanceChanged)}`)
    if (props.distanceChanged !== undefined && props.distanceChanged !== this.props.distanceChanged) {
      // ParanuLog.debug("in the distance Chaged");
      this.getAllPets();
      this.getAdvertise();
      this.getSettings();
    }
  }
  componentDidUpdate(props){
   const{index_counter,currentPetId,adsView,currentIndex,moveCalled,allAdsFromProps,adsIndex,allAdsFromProps_clone,loadOnce} = this.state;

   /*console.log('----------------------------------------------------------------')
   console.log("moveCalled:"+moveCalled)
   console.log("currentIndex:"+currentIndex)
   console.log("adsView:"+adsView)*/

  /* if(currentIndex && currentIndex % global.advertiseratio1 == 0 && (moveCalled || props.moveCalled)){
     //alert('ads load')
    this.setState({moveCalled:false,adsView:false},()=>{
           if(allAdsFromProps != 'undefined' && allAdsFromProps.length > 0){
              this.setState({adsView:true});
              this.adsImpressionSet(allAdsFromProps[adsIndex]._id,allAdsFromProps[adsIndex].impression + 1)
              this.position.setValue({ x: 0, y: 0 });
           }
     });
   }*/
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

  onLoad = data => this.setState({ duration: data.duration, isLoading: true });

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

  renderAdv = () => {
    //console.log(this.state.allAdsFromProps)\

    const{adsIndex} = this.state;

    return this.state.allAdsFromProps
     .map((item, i , arr) => {
        let that = this;
          //setTimeout(function(){that.setState({timePassed: true})}, 9000);
          //ParanuLog.debug("tetetsetetetet")
        //ParanuLog.debug(this.state.timePassed)
          if(i == adsIndex){

        return (

                        <View>
                          {(this.state.swipeEnable ? <View
                            style={[
                              {
                                opacity: 1,
                                height: HEIGHT / 2.3,
                                width: '100%',
                                position: "absolute",
                                alignSelf: "center",
                                zIndex:999999
                              }]}><Text style={styles_cus.red}>&nbsp;</Text>
                          </View>:<Text style={[
                            {
                              opacity: 1,
                              height: HEIGHT / 2.3,
                              width: '100%',
                              position: "absolute",
                              alignSelf: "center",
                              zIndex:0
                            }]}></Text>)}
                            <Animated.View
                                          {...this.PanResponder.panHandlers}
                                          key={item.id}
                                          style={[
                                            this.rotateAndTranslate,
                                            {
                                              opacity: 1,
                                              height: HEIGHT / 2.3,
                                              width: '100%',
                                              position: "absolute",
                                              alignSelf: "center",
                                              display:'none'
                                              //opacity: this.myCardOpacity,
                                              //opacity: this.nextCardOpacity,
                                            }
                                          ]}
                                        >

                                          <Animated.View
                                            style={{
                                              opacity: this.likeOpacity,
                                              transform: [{ rotate: "-30deg" }],
                                              position: "absolute",
                                              top: 50,
                                              left: 40,
                                              zIndex: 1000
                                            }}>
                                            <Text
                                              style={{
                                                borderWidth: 1,
                                                borderColor: "green",
                                                color: "green",
                                                fontSize: 32,
                                                fontWeight: "800",
                                                padding: 10
                                              }}
                                            >
                                              {strings.like}
                                            </Text>
                                          </Animated.View>

                                          <Animated.View
                                            style={{
                                              opacity: this.dislikeOpacity,
                                              transform: [{ rotate: "30deg" }],
                                              position: "absolute",
                                              top: 50,
                                              right: 40,
                                              zIndex: 1000
                                            }}
                                          >
                                            <Text
                                              style={{
                                                borderWidth: 1,
                                                borderColor: "red",
                                                color: "red",
                                                fontSize: 32,
                                                fontWeight: "800",
                                                padding: 10
                                              }}
                                            >
                                              {strings.nope}
                                            </Text>
                                          </Animated.View>

                            <HomeStyle.CrousalView>

                                    {item.advType == "video"  ? (
                                    <Video

                                      onEnd={this.onEnd}
                                      onLoad={this.onLoad}
                                      onLoadStart={this.onLoadStart}
                                      onProgress={this.onProgress}
                                      onBuffer={this.onBuffer}
                                      paused={this.state.paused}
                                      ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                                      resizeMode={this.state.screenType}
                                      onFullScreen={this.state.isFullScreen}
                                      source={{ uri: "https://paranu-public.s3.us-east-2.amazonaws.com/"+item.advfile }}
                                      style={styles.mediaPlayer}
                                      volume={10}
                                    />
                                    ):(
                                        <View
                                          style={{
                                            position: 'relative',
                                            textAlign: 'center',
                                            color: 'white'
                                      }}>

                                          <ImageView
                                          urlImageUri={item.advfile}
                                          loadingCallBack={() => {
                                            Platform.OS === 'ios' ? setTimeout(() => {
                                              this.setState({ loading: false })
                                            }, 400) : setTimeout(() => {
                                              this.setState({ loading: false })
                                            }, 5000)
                                          }}
                                          customStyle={{
                                            height: HEIGHT / 2.3,
                                            width: '100%',
                                            resizeMode:'cover',
                                            borderRadius: 0,
                                            borderColor: BLACK_ALPHA,
                                            opacity: 1,
                                            position: "absolute",
                                            right:0,
                                            left:0,
                                            top:0,
                                            backgroundColor: 'white',
                                            borderColor: APP_COLOR,
                                            borderWidth: 1
                                          }}
                                          imageType={"external"}
                                        />

                                    </View>
                                    )}
                          </HomeStyle.CrousalView>
                          </Animated.View>

                          <View   style={{
                              height: HEIGHT/2.5,
                              width: '100%',
                              bottom: -(HEIGHT/1.2),
                              cursor:'pointer',
                              pointerEvent:'inherit',
                              alignSelf:'center',
                              position:'absolute',
                              zIndex:99999
                            }}>
                            <HomeStyle.ContentTextView>
                              <Text style={{textAlign: 'center',color: 'black',fontSize:18,fontWeight:'bold',lineHeight:35}}>
                                  {item.title}
                                </Text>
                                <Text style={{textAlign: 'center',color: 'black',fontSize:16}}>
                                  {item.description}
                                </Text>
                              <View  style={{width:'auto',alignSelf:'center'}}>
                                 <HomeStyle.AddButtonButtonView>
                                   <HomeStyle.AddPetButton onPress={() => this.LinkButton(item.link)}>
                                     <HomeStyle.Textinformation>{item.linkTitle}</HomeStyle.Textinformation>
                                   </HomeStyle.AddPetButton>
                                 </HomeStyle.AddButtonButtonView>

                              </View>
                                </HomeStyle.ContentTextView>

                          </View>



                      </View>

 )};

}).reverse();
this.state.adCounter = parseInt(this.state.adCounter)+1;

  };

  onSeeking = currentTime => this.setState({ currentTime });
  renderUsers = () => {
    return this.state.allPetFromProps
      .map((item, i ,arr) => {

        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id}
              style={[
                this.rotateAndTranslate,
                {
                  opacity: 1,
                  height: '100%',
                  width: '100%',
                  position: "absolute",
                  alignSelf: "center",
                  //opacity: this.myCardOpacity,
                  //opacity: this.nextCardOpacity,
                }
              ]}
            >
              <Animated.View
                style={{
                  opacity: this.likeOpacity,
                  transform: [{ rotate: "-30deg" }],
                  position: "absolute",
                  top: 50,
                  left: 40,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "green",
                    color: "green",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10
                  }}
                >
                  {strings.like}
                </Text>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: this.dislikeOpacity,
                  transform: [{ rotate: "30deg" }],
                  position: "absolute",
                  top: 50,
                  right: 40,
                  zIndex: 1000
                }}
              >
                <Text
                  style={{
                    borderWidth: 1,
                    borderColor: "red",
                    color: "red",
                    fontSize: 32,
                    fontWeight: "800",
                    padding: 10
                  }}
                >
                  {strings.nope}
                </Text>
              </Animated.View>
                { this.state.imageindex < item.petImages.length ?
                  <HomeStyle.CrousalView>
                    <ImageView
                         urlImageUri={item.petImages[this.state.imageindex]}
                         loadingCallBack={() => {
                           Platform.OS === 'ios' ? setTimeout(() => {
                             this.setState({ loading: false })
                           }, 400) : setTimeout(() => {
                             this.setState({ loading: false })
                           }, 5000)
                         }}
                         customStyle={{
                           height: HEIGHT / 2.3,
                           width: '100%',
                           borderRadius: 0,
                           borderColor: BLACK_ALPHA,
                           opacity: 1,
                           resizeMode:'cover',
                           position: "absolute",
                           backgroundColor: 'white',
                           borderColor: APP_COLOR,
                           borderWidth: 1
                         }}
                         imageType={"external"}
                       />

                   </HomeStyle.CrousalView>:

                    <View style={styles.container}>
                    <HomeStyle.CrousalView>
                        <ImageView
                          urlImageUri={item.petImages[this.state.imageindex]}
                          loadingCallBack={() => {
                            Platform.OS === 'ios' ? setTimeout(() => {
                              this.setState({ loading: false })
                            }, 400) : setTimeout(() => {
                              this.setState({ loading: false })
                            }, 5000)
                          }}
                          customStyle={{
                            height: HEIGHT / 2.3,
                            width: '100%',
                            borderRadius: 0,
                            borderColor: BLACK_ALPHA,
                            opacity: 1,
                            position: "absolute",
                            backgroundColor: 'white',
                            borderColor: APP_COLOR,
                            borderWidth: 1
                          }}
                          imageType={"external"}
                        />
                        <Video
                              onEnd={this.onEnd}
                              onLoad={this.onLoad}
                              onLoadStart={this.onLoadStart}
                              onProgress={this.onProgress}
                              paused={this.state.paused}
                              ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                              resizeMode={this.state.screenType}
                              onFullScreen={this.state.isFullScreen}
                              source={{ uri: "https://paranu-public.s3.us-east-2.amazonaws.com/"+this.props.allPets[this.state.currentIndex].petVideo[0] }}
                              style={styles.mediaPlayer}
                              volume={10}
                            />
                        </HomeStyle.CrousalView>
                        </View>

                }


            </Animated.View>
          );
        } else {
          return (
            <Animated.View

              key={item.id}
              style={[
                {
                  opacity: 1,
                  transform: [{ scale: this.nextCardScale }],
                  height: HEIGHT / 2.3,
                  width: '100%',
                  position: "absolute",
                  alignSelf: "center",

                }
              ]}
            >
              <ImageView

                urlImageUri={item.petImages[0]}
                customStyle={{
                  height: HEIGHT / 2.3,/* Previous height 2.5*/
                  width: '100%',
                  borderRadius: 0,
                  borderColor: BLACK_ALPHA,
                }}
                imageType={"external"}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  adsImpressionSet(ads_id,impression_total){
    var obj = {
      'impression':impression_total,
      'ad_id':ads_id,
      'user_id':this.props.userDetail._id
    }


    var token = this.props.userToken;

    route
      .put("pet/advertiselog",obj, token)
      .then(async response => {
        if (response.error) {
        //  Alert.alert(strings.alert1);
        } else {
          if (this.props.yourPetInfo == "") {
            this.profileDataRetriver();
          }
         // this.setState({ currentIndex: this.state.currentIndex+1 });
          //this.props.setYourPet(response.pets);
        }
      });
  }
  async adsHandler(){
    const{currentIndex,adsView,allAdsFromProps,adsIndex} = this.state;
    this.setState({moveCalled:false,swipeLoad:true,swipeEnable:false})
  }

  likeApiCalling(petID) {
    this.setState({ loading: true });
    if (this.state.currentIndex + 1 == this.props.allPets.length) {
      // this.setState({ noData: true });
      this.getAllPets();
    }
    var token = this.props.userToken;
    route
      .getAuthenticatedMessage("/pet/" + petID + "/like", token)
      .then(async response => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
        if (response.error) {
        } else {
          if (response.match) {
            this.setState({ matchObject: response.match, matching: true });
          }
        }
      });
  }

  disLikeApiCalling(petID) {
    this.setState({ loading: true });
    if (this.state.currentIndex + 1 == this.props.allPets.length) {
      this.setState({ noData: true });
      this.getAllPets();
    }

    var token = this.props.userToken;
    route
      .getAuthenticatedMessage("/pet/" + petID + "/reject", token)
      .then(async response => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);


        if (response.error) {
        } else {
        }
      });
  }

  likeAction() {
    const{index_counter,currentIndex,adsIndex,allAdsFromProps,adsView,moveCalled,swipeLoad} = this.state;
    this.likeApiCalling(this.props.allPets[this.state.currentIndex]._id);

    if(allAdsFromProps.length > adsIndex){
      if(index_counter % global.advertiseratio1 == 0){
          this.setState({moveCalled:true,adsView:true, swipeLoad:false,swipeEnable:true })
          this.adsImpressionSet(allAdsFromProps[adsIndex]._id,allAdsFromProps[adsIndex].impression + 1)

      }
    }
    Animated.spring(this.position, {
      toValue: { x: WIDTH + 100, y: HEIGHT }
    }).start(() => {

      this.setState(
        {
          currentIndex: this.state.currentIndex + 1,
          index_counter: this.state.index_counter + 1,
          imageReplace: true,
          imageindex: 0
        },
        () => {



          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });

  }

  disLikeAction() {
    const{index_counter,currentIndex,adsIndex,allAdsFromProps,adsView} = this.state;
    this.disLikeApiCalling(this.props.allPets[this.state.currentIndex]._id);
    if(allAdsFromProps.length > adsIndex){
      if(index_counter % global.advertiseratio1 == 0){
          this.setState({moveCalled:true,adsView:true, swipeLoad:false,swipeEnable:true })
          this.adsImpressionSet(allAdsFromProps[adsIndex]._id,allAdsFromProps[adsIndex].impression + 1)
      }
    }
    Animated.spring(this.position, {
      toValue: { x: -WIDTH - 100, y: HEIGHT }
    }).start(() => {

      this.setState(
        {
          currentIndex: this.state.currentIndex + 1,
          index_counter:this.state.index_counter + 1,
          imageReplace: true,
          imageindex: 0
        },
        () => {


          this.position.setValue({ x: 0, y: 0 });
        }
      );
    });

  }

  onSearchPress() {
    this.props.setOpacityOfTabBar(0);
    this.setState({ searchPopUp: true });
  }

  searchApi(searchText) {
    this.setState({ searchIndicator: true });
    var token = this.props.userToken;

    route
      .getAuthenticated("/user/search?search=" + searchText, token)
      .then(async response => {
        if (response.error) {
          Alert.alert(strings.alert1);
        } else {
          // console.log("responseSearch", JSON.stringify(response));
          this.setState({ searchList: response, searchIndicator: false });
        }
      });
  }

  render() {
    const{adsView,adsIndex} = this.state;
    if(adsView){

      return this.props.allPets && this.state.ready ? (
        <SafeAreaView style={{ backgroundColor: DARK_APP_COLOR, flex: 1 }}>
          <NavigationEvents
            onDidFocus={payload => {
            //  this.setState({ allPetFromProps: this.props.allPets });
          //    this.setState({ allAdsFromProps: this.props.allAds});
              // ParanuLog.info('in the onDidFocus');
              if (this.props.yourPetInfo == "") {
                this.profileDataRetriver();
              }

              if (
                this.state.currentIndex + 1 == this.props.allPets.length ||
                this.props.allPets.length === 0
              ) {
                this.getAllPets();
              }
            }}
          />
          <Header
            headerText={strings.home}
            rightIconName={"search1"}
            iconColor={"white"}
            onPressButton={() => console.log("callllllll")}
            profileImageUri={
              this.props.userDetail.facebookId
                ? "https://graph.facebook.com/" +
                this.props.userDetail.facebookId +
                "/picture?type=large&height=320&width=420"
                : this.props.userDetail.userImage
            }
            imageType={
              this.props.userDetail.facebookId ? "externalFb" : "external"
            }
            navBarBackgroundColor={DARK_APP_COLOR}
            onPressRightButton={() => this.onSearchPress()}
          />

          {
            this.state.allAdsFromProps != null &&
          this.state.adsIndex < this.state.allAdsFromProps.length ? (
          /* Home view start*/
         /* this.state.adsView ?
          <HomeStyle.WrapperViewVertical>
                  {this.renderAdv()}

                 </HomeStyle.WrapperViewVertical>
            :*/
            <HomeStyle.WrapperViewVertical>
              {this.props.allPets != null && this.state.allPetFromProps && this.state.allAdsFromProps && (
                <HomeStyle.ImageContainerView>
                  {this.state.allPetFromProps.length > 0 &&
                    this.state.allPetFromProps &&
                     this.renderAdv()
                  }


                </HomeStyle.ImageContainerView>
              )}

            </HomeStyle.WrapperViewVertical>

          ) : (
              <HomeStyle.HorizontalView>
                <HomeStyle.MessageText>
                  {" "}
                  {strings.thereIsNoDataToShowAccordingYourInterest}
                </HomeStyle.MessageText>
              </HomeStyle.HorizontalView>
            )}
            <HomeStyle.BottomContainerViewCounter  >
                  <CountDown
                  until={0 * 10 + this.state.allAdsFromProps && this.state.allAdsFromProps[adsIndex] ? parseInt(this.state.allAdsFromProps[adsIndex].advtime):10}
                  size={30}
                  onFinish={() =>  this.adsHandler()}
                  onStart={() => this.position.setValue({ x: 0, y: 0 }) }
                  digitStyle={{backgroundColor: 'transparent'}}
                  digitTxtStyle={{color: '#f86e76'}}
                  timeToShow={['S']}
                  timeLabels={{s: null}}
                  />

          </HomeStyle.BottomContainerViewCounter>
          {this.state.searchPopUp && (
            <HomeStyle.SearchView>
              <HomeStyle.SearchTopInputContainer>
                <HomeStyle.SearchInputInnerContainer>
                  <MaterialIcons
                    name="search"
                    size={20}
                    color={BLACK_TRANSPARENT}
                    style={{ position: "absolute", left: 5 }}
                  />
                  <TextInput
                    style={{
                      height: WIDTH / 8,
                      width: WIDTH - 135,
                      left: 25,
                      backgroundColor: WHITE_Caream,
                      fontSize: 20
                    }}
                    placeholder={strings.search}
                    autoCorrect={false}
                    placeholderTextColor={BLACK_TRANSPARENT}
                    onChangeText={searchText => {
                      if (searchText.length > 7) {
                        this.searchApi(searchText);
                      }
                    }}
                  />
                </HomeStyle.SearchInputInnerContainer>
                <HomeStyle.CancelButton
                  onPress={() => {
                    this.props.setOpacityOfTabBar(1);
                    this.setState({ searchPopUp: false });
                  }}
                >
                  <HomeStyle.CancelText>{strings.cancel}</HomeStyle.CancelText>
                </HomeStyle.CancelButton>
              </HomeStyle.SearchTopInputContainer>
              {this.state.searchIndicator && (
                <HomeStyle.SearchIndicator>
                  <ActivityIndicator color={DARK_APP_COLOR} size={"large"} />
                </HomeStyle.SearchIndicator>
              )}
              {this.state.searchList.length > 0 && (
                <HomeStyle.SearchFlatlist
                  data={this.state.searchList}
                  keyExtractor={item => item._id.toString()}
                  renderItem={({ item }) => (
                    <HomeStyle.SearchPersonView
                      onPress={() =>
                        this.props.navigation.navigate("ProfileOther", {
                          idOfUser: item._id
                        })
                      }
                    >
                      <HomeStyle.SearchPersonText>
                        {item.name}
                      </HomeStyle.SearchPersonText>
                    </HomeStyle.SearchPersonView>
                  )}
                />
              )}
            </HomeStyle.SearchView>
          )}

          {this.state.personInfoPopUp && (
            <PersonInfoHome
              lan={strings}
              terminateClick={() => {
                this.props.setOpacityOfTabBar(1);
                this.setState({ personInfoPopUp: false });

              }}
              imageUri={this.props.allPets[this.state.currentIndex].petImages}
              petName={this.props.allPets[this.state.currentIndex].name}
              userName={
                this.props.allPets[this.state.currentIndex].briefInformation
              }
              onOwnerProfileClick={() =>
                this.props.navigation.navigate("ProfileOther", {
                  idOfUser: this.props.allPets[this.state.currentIndex].user._id
                })
              }
            />
          )}
          {this.state.matching && (
            <Likedislike
              lan={strings}
              otherPetImageUri={this.state.matchObject.otherPet.petImages[0]}
              myPetImageUri={this.state.matchObject.myPet.petImages[0]}
              sendmessagePress={() => {
                this.props.navigation.navigate("MessageSpecific", {
                  from: "Matching",
                  recieverId: this.state.matchObject.otherPet.user._id,
                  senderId: this.props.userDetail._id,
                  userInfo: this.state.matchObject.otherPet.user
                });
              }}
              continueSwipePress={() => this.setState({ matching: false })}
            />
          )}
          {this.state.loading && (
            <ActivityLoading textLoading={strings.pleasewat} />
          )}
        </SafeAreaView>
      ) : (
          <ActivityLoading textLoading={strings.pleasewat} />
        );
    }

    return this.props.allPets && this.state.ready ? (
      <SafeAreaView style={{ backgroundColor: DARK_APP_COLOR, flex: 1 }}>
        <NavigationEvents
          onDidFocus={payload => {
            this.setState({ allPetFromProps: this.props.allPets });
            //this.setState({ allAdsFromProps: this.props.allAds});
            // ParanuLog.info('in the onDidFocus');
            if (this.props.yourPetInfo == "") {
              this.profileDataRetriver();
            }
            if (
              this.state.currentIndex + 1 == this.props.allPets.length ||
              this.props.allPets.length === 0
            ) {
              this.getAllPets();
            }
          }}
        />
        <Header
          headerText={strings.home}
          rightIconName={"search1"}
          iconColor={"white"}
          onPressButton={() => console.log("callllllll")}
          profileImageUri={
            this.props.userDetail.facebookId
              ? "https://graph.facebook.com/" +
              this.props.userDetail.facebookId +
              "/picture?type=large&height=320&width=420"
              : this.props.userDetail.userImage
          }
          imageType={
            this.props.userDetail.facebookId ? "externalFb" : "external"
          }
          navBarBackgroundColor={DARK_APP_COLOR}
          onPressRightButton={() => this.onSearchPress()}
        />

        {


        this.state.currentIndex < this.props.allPets.length ? (
        /* Home view start*/
       /* this.state.adsView ?
        <HomeStyle.WrapperViewVertical>
                {this.renderAdv()}

               </HomeStyle.WrapperViewVertical>
          :*/

          <HomeStyle.WrapperViewVertical>
            {this.props.allPets != null && this.state.allPetFromProps && (
              <HomeStyle.ImageContainerView>
                {this.state.allPetFromProps.length > 0 &&
                  this.state.allPetFromProps &&
                   this.renderUsers()
                }
              </HomeStyle.ImageContainerView>
            )}
            <HomeStyle.ContentTextView>
            <HomeStyle.TitlesContainerView>
              <HomeStyle.RightTextContainerView>
                <HomeStyle.RightTitlesTextStyle>
                  {strings.name}
                </HomeStyle.RightTitlesTextStyle>
              </HomeStyle.RightTextContainerView>
              <HomeStyle.LeftTitlesTextStyle>
                {this.props.allPets[this.state.currentIndex].name}
              </HomeStyle.LeftTitlesTextStyle>
            </HomeStyle.TitlesContainerView>

            <HomeStyle.TitlesContainerView>
              <HomeStyle.RightTextContainerView>
                <HomeStyle.RightTitlesTextStyle>
                  {strings.sex}
                </HomeStyle.RightTitlesTextStyle>
              </HomeStyle.RightTextContainerView>
              <HomeStyle.LeftTitlesTextStyle>
                {this.props.allPets[this.state.currentIndex].sex == "Male"
                  ? strings.male
                  : this.props.allPets[this.state.currentIndex].sex == "Female"
                    ? strings.female
                    : strings.dontKnow}{" "}
              </HomeStyle.LeftTitlesTextStyle>
            </HomeStyle.TitlesContainerView>



            <HomeStyle.TitlesContainerView>
              <HomeStyle.RightTextContainerView>
                <HomeStyle.RightTitlesTextStyle>
                  {strings.type}
                </HomeStyle.RightTitlesTextStyle>
              </HomeStyle.RightTextContainerView>
              <HomeStyle.LeftTitlesTextStyle>
                {this.props.allPets[this.state.currentIndex].type ===
                  "Crossbreed"
                  ? strings.crossBreed
                  : this.props.allPets[this.state.currentIndex].type ===
                    "Purebred"
                    ? strings.pureBreed
                    : strings.dontKnow}
              </HomeStyle.LeftTitlesTextStyle>
            </HomeStyle.TitlesContainerView>
            <HomeStyle.TitlesContainerView>
              <HomeStyle.RightTextContainerView>
                <HomeStyle.RightTitlesTextStyle>
                  {strings.closestCity}
                </HomeStyle.RightTitlesTextStyle>
              </HomeStyle.RightTextContainerView>
              <HomeStyle.LeftTitlesTextStyle numberOfLines={2}>
                {this.props.allPets[this.state.currentIndex].user.city}
              </HomeStyle.LeftTitlesTextStyle>
            </HomeStyle.TitlesContainerView>
            </HomeStyle.ContentTextView>
            <HomeStyle.BottomContainerView>

              <HomeStyle.LikeAndDislikeButton
                style={{ backgroundColor: "red" }}
                onPress={() => this.disLikeAction()}
              >
                <Entypo name="cross" size={HEIGHT / 20} color={"white"} />
              </HomeStyle.LikeAndDislikeButton>

              <HomeStyle.LikeAndDislikeButton
                style={{ backgroundColor: "rgba(110,194,70,1)" }}
                onPress={() => this.likeAction()}
              >
                <AntDesign name="like2" size={HEIGHT / 20} color={"white"} />
              </HomeStyle.LikeAndDislikeButton>
            </HomeStyle.BottomContainerView>

          </HomeStyle.WrapperViewVertical>
        ) : (
            <HomeStyle.HorizontalView>
              <HomeStyle.MessageText>
                {" "}
                {strings.thereIsNoDataToShowAccordingYourInterest}
              </HomeStyle.MessageText>
            </HomeStyle.HorizontalView>
          )}
        {this.state.searchPopUp && (
          <HomeStyle.SearchView>
            <HomeStyle.SearchTopInputContainer>
              <HomeStyle.SearchInputInnerContainer>
                <MaterialIcons
                  name="search"
                  size={20}
                  color={BLACK_TRANSPARENT}
                  style={{ position: "absolute", left: 5 }}
                />
                <TextInput
                  style={{
                    height: WIDTH / 8,
                    width: WIDTH - 135,
                    left: 25,
                    backgroundColor: WHITE_Caream,
                    fontSize: 20
                  }}
                  placeholder={strings.search}
                  autoCorrect={false}
                  placeholderTextColor={BLACK_TRANSPARENT}
                  onChangeText={searchText => {
                    if (searchText.length > 7) {
                      this.searchApi(searchText);
                    }
                  }}
                />
              </HomeStyle.SearchInputInnerContainer>
              <HomeStyle.CancelButton
                onPress={() => {
                  this.props.setOpacityOfTabBar(1);
                  this.setState({ searchPopUp: false });
                }}
              >
                <HomeStyle.CancelText>{strings.cancel}</HomeStyle.CancelText>
              </HomeStyle.CancelButton>
            </HomeStyle.SearchTopInputContainer>
            {this.state.searchIndicator && (
              <HomeStyle.SearchIndicator>
                <ActivityIndicator color={DARK_APP_COLOR} size={"large"} />
              </HomeStyle.SearchIndicator>
            )}
            {this.state.searchList.length > 0 && (
              <HomeStyle.SearchFlatlist
                data={this.state.searchList}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item }) => (
                  <HomeStyle.SearchPersonView
                    onPress={() =>
                      this.props.navigation.navigate("ProfileOther", {
                        idOfUser: item._id
                      })
                    }
                  >
                    <HomeStyle.SearchPersonText>
                      {item.name}
                    </HomeStyle.SearchPersonText>
                  </HomeStyle.SearchPersonView>
                )}
              />
            )}
          </HomeStyle.SearchView>
        )}

        {this.state.personInfoPopUp && (
          <PersonInfoHome
            lan={strings}
            terminateClick={() => {
              this.props.setOpacityOfTabBar(1);
              this.setState({ personInfoPopUp: false });
            }}
            imageUri={this.props.allPets[this.state.currentIndex].petImages}
            petName={this.props.allPets[this.state.currentIndex].name}
            userName={
              this.props.allPets[this.state.currentIndex].briefInformation
            }
            onOwnerProfileClick={() =>
              this.props.navigation.navigate("ProfileOther", {
                idOfUser: this.props.allPets[this.state.currentIndex].user._id
              })
            }
          />
        )}
        {this.state.matching && (
          <Likedislike
            lan={strings}
            otherPetImageUri={this.state.matchObject.otherPet.petImages[0]}
            myPetImageUri={this.state.matchObject.myPet.petImages[0]}
            sendmessagePress={() => {
              this.props.navigation.navigate("MessageSpecific", {
                from: "Matching",
                recieverId: this.state.matchObject.otherPet.user._id,
                senderId: this.props.userDetail._id,
                userInfo: this.state.matchObject.otherPet.user
              });
            }}
            continueSwipePress={() => this.setState({ matching: false })}
          />
        )}
        {this.state.loading && (
          <ActivityLoading textLoading={strings.pleasewat} />
        )}
      </SafeAreaView>
    ) : (
        <ActivityLoading textLoading={strings.pleasewat} />
      );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    petYoulookingForDetail: state.pet.petYouLookingForDetail,
    yourPetInfo: state.pet.yourPetDetail,
    allPets: state.pet.allPets,
    allAds: state.pet.allAds,
    indexOfPet:0,
    moveCalled:true,
    languageOfApp: state.appState.languageOfApp,
    opacityOfTabBar: state.appState.opacity,
    distanceChanged: state.user.newDistance
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
