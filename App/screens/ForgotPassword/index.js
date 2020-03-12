import React, { Component } from "react";
import { Dimensions, TextInput, StyleSheet, Alert } from "react-native";
import ForgotStyle from "./ForgotStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import ActivityLoading from "../../component/common/ActivityLoading";
import { connect } from "react-redux";
import strings from "../../screens/ForgotPassword/ForgotPasswordLocalization";
import * as RNLocalize from 'react-native-localize';

const route = new Route(url);
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      email: "",
      validated:''
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

  validate = text => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // console.log("Email is Not Correct");
      this.setState({ email: text });
      this.setState({ validated: false });
    } else {
      this.setState({ email: text });
      this.setState({ validated: true });
      // console.log("Email is Correct");
    }
  };
  sendEmail() {
    this.setState({ loading: true });
    if(this.state.validated==true){
      const  dataToSend={"email":this.state.email}
        route.postdata("auth/resetPassword" , dataToSend)
                .then(async (response) => {
                    if (response.error) {
                        Alert.alert(response.error.message)
                        this.setState({loading:false})
                    }
                    else {
                        this.setState({loading:false})
                        Alert.alert(
                            strings.alert1+this.state.email, 
                            "",
                            [
                              {text: strings.ok , onPress: () => this.props.navigation.goBack()},
                            ],
                            { cancelable: false }
                          )
                    }
                })
      
    }
    else{
        this.alert(strings.alert2)
    }
  }
  alert(message) {
      this.setState({loading:false})
    Alert.alert(message);
  }

  render() {
    return (
      <ForgotStyle.SafeAreaView>
        <ForgotStyle.WrapperViewVertical>
          <ForgotStyle.NavigationBarViewContainer>
            <ForgotStyle.NavigationTextStyle>
              {strings.changePassword}
            </ForgotStyle.NavigationTextStyle>
            <ForgotStyle.BackButton
              onPress={() => this.props.navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={30} color="white" />
            </ForgotStyle.BackButton>
          </ForgotStyle.NavigationBarViewContainer>
          <ForgotStyle.InnerVerticalView>
            <ForgotStyle.TextFieldTopTilte>
              {strings.email}
            </ForgotStyle.TextFieldTopTilte>
            <ForgotStyle.TextFieldViewStyle>
              <TextInput
                style={styles.InputTextStyle}
                placeholder={"testemail@gmail.com"}
                keyboardType="email-address"
                onChangeText={email => this.validate(email)}
              />
            </ForgotStyle.TextFieldViewStyle>

            <ForgotStyle.ChangePasswordContainerView
              onPress={() => this.sendEmail()}
            >
              <ForgotStyle.ChangePasswordButtonTextStyle>
                {strings.sendEmail}
              </ForgotStyle.ChangePasswordButtonTextStyle>
            </ForgotStyle.ChangePasswordContainerView>
          </ForgotStyle.InnerVerticalView>
        </ForgotStyle.WrapperViewVertical>
        {this.state.loading && <ActivityLoading />}
      </ForgotStyle.SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  InputTextStyle: {
    fontSize: 12,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    height: 30,
    color: "black"
  }
});

function mapStateToProps(state, props) {
  return {
    userDetail: state.user.userDetail,
    userToken: state.user.userToken,
    languageOfApp: state.appState.languageOfApp,

  };
}
export default connect(mapStateToProps)(ForgotPassword);
