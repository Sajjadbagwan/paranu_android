import React, {Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { TouchableOpacity,Alert } from "react-native";
import { NavigationEvents } from "react-navigation";


import * as Actions from "../../actions";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import Header from "../../component/common/Header";
import ActivityLoading from "../../component/common/ActivityLoading";
import ImageView from "../../component/common/ImageView";
import strings from "../../screens/Message/MessageLocalization";
import * as RNLocalize from 'react-native-localize';

const route = new Route(url);

var messageData = [];
import MessageStyle from "./MessageStyle";
import { APP_COLOR, DARK_APP_COLOR } from "../../component/constant/Color";
import ParanuLog from "../../Helper/ParanuLog";

class Message extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
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
  getMessages() {
    this.setState({ loading: true });
    var token = this.props.userToken;
    route.getAuthenticatedMessage("messages", token).then(async response => {
      this.setState({ loading: false });
      // ParanuLog.debug(`response: ${JSON.stringify(response)}`)
      if (response.error) {
        Alert.alert(strings.alert1);
      } else {
        // ParanuLog.info(`in the else ${JSON.stringify(response)}`);
        this.props.setAllMessage(response);
        this.messageRetriever();
      }
    })
    .catch(async error => {
      this.setState({ loading: false });
      ParanuLog.error(`Error Received: ${JSON.stringify(error)}`);
    });
  }
  messageRetriever() {
    // ParanuLog.info('in the messageRetriever');
    messageData = [];
    var point = 0;
    if (this.props.message.length > 0) {
      this.props.message.forEach((message, index) => {
        var randomData = {};
        randomData.data = message;
        randomData.position = point;
        messageData.push(randomData);
        point += 1;
      });

      this.setState({ loading: false });
    }
  }
  ValidURL(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(str);
  }

  render() {
    return (
      <MessageStyle.MainView>
        <NavigationEvents onWillFocus={payload => this.getMessages()} />
        <MessageStyle.WrapperViewVertical>
          <MessageStyle.InnerView>
            <Header
              navBarBackgroundColor={DARK_APP_COLOR}
              headerText={strings.chat}
              onPressRightButton={()=>{
                Alert.alert(
            strings.reportuser,
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

            {this.props.message.length > 0 ? (
              <MessageStyle.MessageList
                data={messageData}
                keyExtractor={item => item.position.toString()}
                renderItem={({ item }) => (
                  <MessageStyle.MessageContainer>
                    <MessageStyle.OwnMessageContainer
                      onPress={() =>
                        this.props.navigation.navigate("MessageSpecific", {
                          userMessages: item.data,
                          from: "AllMessages"
                        })
                      }
                    >
                      <MessageStyle.NameOfChat>
                        {item.data.sender.id == this.props.userDetail._id
                          ? item.data.receiver.name
                          : item.data.sender.name}
                      </MessageStyle.NameOfChat>
                      {this.ValidURL(item.data.messages[0].body) ? (

                        <MessageStyle.OtherImageContainer

                          source={{ uri: item.data.messages[0].body }}
                        />


                      ) : (
                        <MessageStyle.MessageChat>
                          {item.data.messages[0].body}
                        </MessageStyle.MessageChat>
                      )}
                      <MessageStyle.ChatImageButton
                        onPress={() => {
                          var idOfPerson = "";
                          if (
                            item.data.sender.id == this.props.userDetail._id
                          ) {
                            idOfPerson = item.data.receiver.id;
                          } else {
                            idOfPerson = item.data.sender.id;
                          }
                          this.props.navigation.navigate("ProfileOther", {
                            idOfUser: idOfPerson
                          });
                        }}
                      >
                        <ImageView
                          urlImageUri={item.data.sender.id == this.props.userDetail._id?(item.data.receiver.facebookId?'https://graph.facebook.com/'+item.data.receiver.facebookId+'/picture?type=large&height=120&width=120' : item.data.receiver.userImage):
                          (item.data.sender.facebookId?'https://graph.facebook.com/'+item.data.sender.facebookId+'/picture?type=large&height=120&width=120' : item.data.sender.userImage)}
                          customStyle={{
                            height: 40,
                            width: 40,
                            borderRadius:20,
                            alignSelf:"center",
                          }}
                          imageType={item.data.sender.id == this.props.userDetail._id?(item.data.receiver.facebookId?"externalFb":"external"):(item.data.sender.facebookId?"externalFb":"external")}
                        />

                      </MessageStyle.ChatImageButton>
                    </MessageStyle.OwnMessageContainer>
                  </MessageStyle.MessageContainer>
                )}
              />
            ) : (
              <MessageStyle.NoMessageView>
                <MessageStyle.NomessageText>
                  {strings.youHaveNotChattedWithAnyoneYet}
                </MessageStyle.NomessageText>
              </MessageStyle.NoMessageView>
            )}
          </MessageStyle.InnerView>
        </MessageStyle.WrapperViewVertical>
        {this.state.loading && <ActivityLoading />}
      </MessageStyle.MainView>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
    message: state.messageData.allMessages,
    languageOfApp: state.appState.languageOfApp,

  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
