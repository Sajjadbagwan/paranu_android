import React, { Component } from 'react'
import { TextInput, Alert } from 'react-native'
import InquiryStyle from './InquiryStyle'
import Header from '../../component/common/Header'
import { connect } from "react-redux";
import { DARK_APP_COLOR, OFF_WHITE } from '../../component/constant/Color'
import ActivityLoading from '../../component/common/ActivityLoading'
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import strings from "./InquiryLocalization";
import * as RNLocalize from 'react-native-localize';

const route = new Route(url);
class Inquiry extends Component {

    constructor(props) {
        super(props)
        if(this.props.languageOfApp){
            strings.setLanguage(this.props.languageOfApp)
          }
        this.state = {
            name: '',
            email: '',
            title: '',
            issue: '',
            loading:false
        }
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
    validate = (text) => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log("Email is Not Correct");
            // Alert.alert(strings.alert)
            return false
        } else {
            return true
        }
    }

    handleEmail = () => {
        if (this.state.name == "" || this.state.email == "" || this.state.title == "" || this.state.issue == "") {
            Alert.alert(strings.alert2)

        } else {
            if (this.validate(this.state.email)) {
                this.setState({ loading: true });
                var credentials = {
                  title: "Inquiry",
                  email: this.state.email,
                  name: this.state.name,
                  body: this.state.issue,

                };
                route.sendMessage("user/inquiry", credentials,this.props.userToken).then(async response => {
                    this.setState({ loading: false });
                  if (response.error) {
                    Alert.alert(strings.internetIssue);
                  } else {
                    Alert.alert(
                        strings.success,
                        strings.emailSent,
                        [
                          {text: 'OK', onPress: () => this.props.navigation.goBack()},
                        ],
                        { cancelable: false }
                      )
                  }
                }).catch(async error => {
                    this.setState({ loading: false });
                });
            }
            else{
                Alert.alert(strings.EmailIsNotValid)
            }
        }


    }

    render() {
        return (
            <InquiryStyle.SafeView>
                <InquiryStyle.WrapperView>
                    <Header
                        headerText={strings.inquiry}
                        iconName={"arrowleft"}
                        iconColor={"white"}
                        navBarBackgroundColor={DARK_APP_COLOR}
                        onPressButton={() => this.props.navigation.goBack()}

                    />
                    <InquiryStyle.MainViewContainer>
                        <InquiryStyle.EmailNameTitleView>
                            <InquiryStyle.TitleText>
                                {strings.name} :
                            </InquiryStyle.TitleText>
                            <TextInput
                                placeholder={strings.placeHolder1}
                                style={{ fontSize: 16 }}
                                maxLength={25}
                                onChangeText={(name) => { this.setState({ name: name }) }}
                            />
                        </InquiryStyle.EmailNameTitleView>
                        <InquiryStyle.EmailNameTitleView>
                            <InquiryStyle.TitleText>
                            {strings.email} :
                            </InquiryStyle.TitleText>
                            <TextInput
                                placeholder={strings.placeHolder2}
                                style={{ fontSize: 16 }}
                                onChangeText={(email) => { this.setState({ email: email }) }}
                            />
                        </InquiryStyle.EmailNameTitleView>
                        <InquiryStyle.EmailNameTitleView>
                            <InquiryStyle.TitleText>
                            {strings.title} :
                            </InquiryStyle.TitleText>
                            <TextInput
                                placeholder={strings.placeHolder3}
                                style={{ fontSize: 16 }}
                                maxLength={25}
                                onChangeText={(title) => { this.setState({ title: title }) }}
                            />
                        </InquiryStyle.EmailNameTitleView>
                        <InquiryStyle.IssueView>
                            <InquiryStyle.IssueTitleText>
                                {strings.inquiry} :
                            </InquiryStyle.IssueTitleText>
                            <TextInput
                                placeholder={strings.placeHolder4}
                                style={{ fontSize: 16, backgroundColor: OFF_WHITE, flex: 1, paddingHorizontal: 10 }}
                                multiline={true}
                                maxLength={200}
                                blurOnSubmit={true}
                                onChangeText={(issue) => { this.setState({ issue: issue }) }}
                            />
                        </InquiryStyle.IssueView>
                        <InquiryStyle.MaximunTextView>
                            ({strings.maximum200Characters})
                        </InquiryStyle.MaximunTextView>
                        <InquiryStyle.ReportButton onPress={() => this.handleEmail()}>
                            <InquiryStyle.ReportButtonText>
                                {strings.report}
                        </InquiryStyle.ReportButtonText>
                        </InquiryStyle.ReportButton>
                    </InquiryStyle.MainViewContainer>
                </InquiryStyle.WrapperView>
                {this.state.loading&&<ActivityLoading textLoading={strings.sendingMail}/>}
            </InquiryStyle.SafeView>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        userToken: state.user.userToken,
        languageOfApp: state.appState.languageOfApp,

    };
}

export default connect(mapStateToProps)(Inquiry);
