import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Alert,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import * as RNLocalize from "react-native-localize";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";

import * as Actions from "../../actions";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import Header from "../../component/common/Header";
import ImageView from "../../component/common/ImageView";
import FullScreenImageView from "../../component/common/FullScreenImageView";
import ParanuLog from "../../Helper/ParanuLog";

const route = new Route(url);
const WIDTH = Dimensions.get("screen").width;
var idForReportUser = "";

import MessageSpecificStyle from "./MessageSpecificStyle";
import {
  BLACK_ALPHA,
  WHITE,
  DARK_APP_COLOR,
  BLACK
} from "../../component/constant/Color";
import ActivityLoading from "../../component/common/ActivityLoading";
import strings from "./MessageSpecificLocalization";

class MessageSpecific extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loading: false,
      messagesArray: "",
      imageuri: "",
      imageUriOfOtherUser: "",
      loadingText: ""
    };
  }
  imagePickerFromGallary() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.8
    }).then(image => {
      this.setState({ imageuri: image.path });
    });
  }

  realTimeUpdateMessage(from) {
    ParanuLog.debug(`from: ${from}`);
    const { params } = this.props.navigation.state;
    var data = {};
    if (from === "matching") {
      data = {
        senderId: params.senderId,
        receiverId: params.recieverId
      };
    } else {
      data = {
        senderId: params.userMessages.sender.id,
        receiverId: params.userMessages.receiver.id
      };
    }
    route
      .sendMessage("select-message", data, this.props.userToken)
      .then(async response => {
        ParanuLog.debug(`messages: ${JSON.stringify(response)}`);
        if (response.error) {
          ParanuLog.error("in the get all messages");
        } else {
          this.setState({ messagesArray: response.messages });
        }
        this.timeHandler = setTimeout(() => {
          this.realTimeUpdateMessage(from);
        }, 10000);
      });
  }

  textMessageSending(recieverId, senderId) {
    if (this.state.message != "") {
      this.setState({ loading: true, loadingText: strings.sendingMessage });
      var param = {
        receiverId: recieverId, //params.userMessages.sender.id,
        senderId: senderId, //params.userMessages.receiver.id,
        message: this.state.message
      };
      //console.log("URL actually param",JSON.stringify(param))
      route
        .sendMessage("text-message", param, this.props.userToken)
        .then(async response => {
          this.setState({ loading: false });
          if (response.error) {
            Alert.alert(strings.alert1);
          } else {
            this.setState({
              message: "",
              messagesArray: response.messages.reverse()
            });
          }
        });
    } else {
      Alert.alert(strings.alert2);
    }
  }

  reportUser(id) {
    var token = this.props.userToken;
    this.setState({ loading: true, loadingText: strings.reporting });
    route
      .getAuthenticatedMessage("user/" + id + "/report", token)
      .then(async response => {
        // console.log(`sultan: response: ${JSON.stringify(response)}`);
        if (response.error || response.message) {
          this.setState({ loading: false, loadingText: "" });
          if (response.error.message === "You already report this User") {
            Alert.alert(strings.alreadyReported);
          } else {
            Alert.alert(strings.alert1);
          }
        } else {
          this.setState({ loadingText: strings.reported });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
        }
      })
      .catch(error => {
        this.setState({ loading: false, loadingText: "" });
        ParanuLog.error(`reporting user: ${JSON.stringify(error)}`);
      });
  }

  apiCalling(URL, data) {
    var token = this.props.userToken;
    return axios
      .create({
        baseURL: url,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .post(URL, data);
  }

  imageSending(recieverId, senderId) {
    if (this.state.imageuri != "") {
      this.setState({ loading: true, loadingText: strings.sendingMessage });
      var photo = {
        uri: this.state.imageuri,
        type: "image/jpeg",
        name: "user.jpg"
      };
      var form = new FormData();
      form.append("image", photo);
      form.append("receiverId", recieverId);
      form.append("senderId", senderId);

      this.apiCalling("image-message", form)
        .then(response => {
          this.setState({
            loading: false,
            imageuri: "",
            message: "",
            messagesArray: response.data.messages.reverse()
          });
        })
        .catch(error => {
          this.setState({ loading: false, imageuri: "" });
          //Alert.alert("Internet issue",JSON.stringify(error))
        });
    } else {
      Alert.alert(strings.alert3);
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    ParanuLog.debug(
      `navigationState: ${JSON.stringify(this.props.navigation.state)}`
    );
    if (params.from == "Matching") {
      this.realTimeUpdateMessage("matching");
      this.setState({
        imageUriOfOtherUser: params.userInfo.facebookId
          ? "https://graph.facebook.com/" +
            params.userInfo.facebookId +
            "/picture?type=large&height=120&width=120"
          : "https://s3.us-east-2.amazonaws.com/paranu-public/" +
            params.userInfo.userImage
      });
      idForReportUser = params.recieverId;
    } else {
      idForReportUser = params.userMessages.receiver.id;
      if (params.userMessages.sender.id == this.props.userDetail._id) {
        this.setState({
          imageUriOfOtherUser: params.userMessages.receiver.facebookId
            ? "https://graph.facebook.com/" +
              params.userMessages.receiver.facebookId +
              "/picture?type=large&height=120&width=120"
            : "https://s3.us-east-2.amazonaws.com/paranu-public/" +
              params.userMessages.receiver.userImage
        });
      } else {
        this.setState({
          imageUriOfOtherUser: params.userMessages.sender.facebookId
            ? "https://graph.facebook.com/" +
              params.userMessages.sender.facebookId +
              "/picture?type=large&height=120&width=120"
            : "https://s3.us-east-2.amazonaws.com/paranu-public/" +
              params.userMessages.sender.userImage
        });
      }
      this.setState({ messagesArray: params.userMessages.messages });

      this.realTimeUpdateMessage("allMessage");
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

  ValidURL(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <MessageSpecificStyle.MainView behavior="padding" enabled>
        <MessageSpecificStyle.WrapperSafeView>
          <Header
            headerText={strings.message}
            iconName={"arrowleft"}
            iconColor={"white"}
            navBarBackgroundColor={DARK_APP_COLOR}
            onPressButton={() => {
              clearTimeout(this.timeHandler);
              this.props.navigation.pop();
            }}
            rightImageSource={require("../../assets/images/report_logo_button.png")}
            onPressRightButton={() => {
              Alert.alert(
                strings.reportUser,
                "",
                [
                  {
                    text: strings.report,
                    onPress: () => {
                      this.reportUser(idForReportUser);
                    }
                  },
                  { text: strings.cancel }
                ],
                { cancelable: false }
              );
            }}
          />
          <MessageSpecificStyle.InnerView>
            <MessageSpecificStyle.MessageList
              data={this.state.messagesArray}
              inverted={true}
              keyExtractor={item => item._id.toString()}
              renderItem={({ item }) => (
                <MessageSpecificStyle.MessageContainer>
                  {item.owner_id == this.props.userDetail._id ? (
                    <MessageSpecificStyle.MessageInnerView>
                      <MessageSpecificStyle.YourChatImage
                        source={{
                          uri: this.props.userDetail.facebookId
                            ? "https://graph.facebook.com/" +
                              this.props.userDetail.facebookId +
                              "/picture?type=large&height=320&width=420"
                            : "https://s3.us-east-2.amazonaws.com/paranu-public/" +
                              this.props.userDetail.userImage
                        }}
                      />
                      {this.ValidURL(item.body) ? (
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            this.setState({
                              fullScreenImageUri: item.body,
                              showFullImageView: true
                            });
                          }}
                        >
                          <MessageSpecificStyle.OwnImageContainer
                            source={{ uri: item.body }}
                            style={{ backgroundColor: "black" }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <MessageSpecificStyle.OwnMessageContainer>
                          <MessageSpecificStyle.MessageChat>
                            {item.body}
                          </MessageSpecificStyle.MessageChat>
                        </MessageSpecificStyle.OwnMessageContainer>
                      )}
                      <MessageSpecificStyle.MessageChat
                        style={{ color: BLACK }}
                      >
                        {new Date(item.createdAt)
                          .toUTCString()
                          .replace("GMT", "")}
                      </MessageSpecificStyle.MessageChat>
                    </MessageSpecificStyle.MessageInnerView>
                  ) : (
                    <MessageSpecificStyle.MessageInnerView>
                      {this.ValidURL(item.body) ? (
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => {
                            this.setState({
                              fullScreenImageUri: item.body,
                              showFullImageView: true
                            });
                          }}
                          style={{ flexDirection: "row" }}
                        >
                          <ImageView
                            urlImageUri={{ uri: item.body }}
                            customStyle={{
                              height: 30,
                              width: 30
                            }}
                            imageType={"external"}
                          />
                          <MessageSpecificStyle.OtherImageContainer
                            source={{ uri: item.body }}
                            style={{ left: 30 }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <MessageSpecificStyle.OtherMessageContainer>
                          <MessageSpecificStyle.MessageChat>
                            {item.body}
                          </MessageSpecificStyle.MessageChat>
                        </MessageSpecificStyle.OtherMessageContainer>
                      )}
                      <MessageSpecificStyle.OtherChatImageButton
                        onPress={() => {
                          var id = "";
                          if (params.from == "Matching") {
                            id =
                              params.recieverId == this.props.userDetail._id
                                ? params.senderId
                                : params.recieverId;
                          } else {
                            id =
                              params.userMessages.sender.id ==
                              this.props.userDetail._id
                                ? params.userMessages.receiver.id
                                : params.userMessages.sender.id;
                          }
                          this.props.navigation.navigate("ProfileOther", {
                            idOfUser: id
                          });
                        }}
                      >
                        <MessageSpecificStyle.OtherChatImage
                          source={{
                            uri: this.state.imageUriOfOtherUser
                          }}
                        />
                      </MessageSpecificStyle.OtherChatImageButton>
                      <MessageSpecificStyle.MessageChat
                        style={{ color: BLACK }}
                      >
                        {new Date(item.createdAt)
                          .toUTCString()
                          .replace("GMT", "")}
                      </MessageSpecificStyle.MessageChat>
                    </MessageSpecificStyle.MessageInnerView>
                  )}
                </MessageSpecificStyle.MessageContainer>
              )}
            />
            <KeyboardAvoidingView>
              <MessageSpecificStyle.BottomInputTextContainer>
                {this.state.imageuri != "" ? (
                  <MessageSpecificStyle.OtherImageContainer
                    source={{ uri: this.state.imageuri }}
                  />
                ) : (
                  <TextInput
                    multiline={true}
                    placeholder=""
                    placeholderTextColor="white"
                    onChangeText={message => this.setState({ message })}
                    value={this.state.message}
                    style={{
                      color: "white",
                      borderRadius: 15,
                      minHeight: 40,
                      width: WIDTH - 100,
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 16,
                      padding: 5
                    }}
                  />
                )}
                <MessageSpecificStyle.BottomCameraButton
                  onPress={() => this.imagePickerFromGallary()}
                >
                  <AntDesign name={"camera"} size={20} color={WHITE} />
                </MessageSpecificStyle.BottomCameraButton>
                <MessageSpecificStyle.BottomSendButton
                  onPress={() => {
                    if (params.recieverId) {
                      {
                        this.state.imageuri != ""
                          ? this.imageSending(
                              params.recieverId,
                              this.props.userDetail._id
                            )
                          : this.textMessageSending(
                              params.recieverId,
                              this.props.userDetail._id
                            );
                      }
                    } else {
                      var sender = "";
                      var reciever = "";
                      if (
                        params.userMessages.receiver.id ==
                        this.props.userDetail._id
                      ) {
                        sender = this.props.userDetail._id;
                        reciever = params.userMessages.sender.id;
                      } else {
                        sender = this.props.userDetail._id;
                        reciever = params.userMessages.receiver.id;
                      }
                      {
                        this.state.imageuri != ""
                          ? this.imageSending(reciever, sender)
                          : this.textMessageSending(reciever, sender);
                      }
                    }
                  }}
                >
                  <Ionicons name={"md-send"} size={20} color={WHITE} />
                </MessageSpecificStyle.BottomSendButton>
              </MessageSpecificStyle.BottomInputTextContainer>
            </KeyboardAvoidingView>
          </MessageSpecificStyle.InnerView>
        </MessageSpecificStyle.WrapperSafeView>
        {this.state.loading && (
          <ActivityLoading textLoading={this.state.loadingText} />
        )}

        {this.state.showFullImageView ? (
          <FullScreenImageView
            imageUri={this.state.fullScreenImageUri}
            closePressed={() => this.setState({ showFullImageView: false })}
            completeUri={true}
          />
        ) : null}
      </MessageSpecificStyle.MainView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    message: state.messageData.allMessages,
    languageOfApp: state.appState.languageOfApp
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageSpecific);
