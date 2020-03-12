import React, { Component } from 'react'
import { TextInput, Dimensions,Alert } from 'react-native'
import ReportProblemStyle from './ReportProblemStyle'
import Header from '../../component/common/Header'
import { DARK_APP_COLOR, OFF_WHITE } from '../../component/constant/Color'

import { connect } from "react-redux";
import ActivityLoading from '../../component/common/ActivityLoading'
import Route from "../../network/route";
import { url } from "../../component/constant/Url";
import strings from "../../screens/ReportProblem/ReportProblemLocalization";
import * as RNLocalize from 'react-native-localize';

//import strings from './ReportProblemLocalization'


const route = new Route(url);
class ReportProblem extends Component {

    constructor(props) {
        super(props);
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
            // Alert.alert("Email is not correct")
            return false

        }
        else {

            return true
        }
    }

    handleEmail = () => {
        if (this.state.name == "" || this.state.email == "" || this.state.title == "" || this.state.issue == "") {
            Alert.alert(strings.alert2)

        }
        else {
            if (this.validate(this.state.email)) {
                this.setState({ loading: true });
                var credentials = {
                  title: strings.report,
                  email: this.state.email,
                  name: this.state.name,
                  body: this.state.issue,

                };
                route.sendMessage("user/inquiry", credentials,this.props.userToken).then(async response => {
                    this.setState({ loading: false });
                  if (response.error) {
                    Alert.alert(strings.alert1);
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
                    //console.log(JSON.stringify(error));
                });
            }
            else{
                Alert.alert(strings.emailIsNotValid)
            }
        }




    }

    render() {
        return (
            <ReportProblemStyle.SafeView>
                <ReportProblemStyle.WrapperView>
                    <Header
                        headerText={strings.report}
                        iconName={"arrowleft"}
                        iconColor={"white"}
                        navBarBackgroundColor={DARK_APP_COLOR}
                        onPressButton={() => this.props.navigation.goBack()}

                    />
                    <ReportProblemStyle.MainViewContainer>
                        <ReportProblemStyle.EmailNameTitleView>
                            <ReportProblemStyle.TitleText>
                                {strings.name} :
                            </ReportProblemStyle.TitleText>
                            <TextInput
                                placeholder={strings.typeYourFullName}
                                style={{ fontSize: 16 }}
                                maxLength={25}
                                onChangeText={(name) => { this.setState({ name: name }) }}
                            />
                        </ReportProblemStyle.EmailNameTitleView>
                        <ReportProblemStyle.EmailNameTitleView>
                            <ReportProblemStyle.TitleText>
                                {strings.email} :
                            </ReportProblemStyle.TitleText>
                            <TextInput
                                placeholder={strings.typeYourEmail}
                                style={{ fontSize: 16 }}
                                onChangeText={(email) => { this.setState({ email: email }) }}
                            />
                        </ReportProblemStyle.EmailNameTitleView>
                        <ReportProblemStyle.EmailNameTitleView>
                            <ReportProblemStyle.TitleText>
                                {strings.title} :
                            </ReportProblemStyle.TitleText>
                            <TextInput
                                placeholder={strings.enterYourTitleHere}
                                style={{ fontSize: 16 }}
                                maxLength={25}
                                onChangeText={(title) => { this.setState({ title: title }) }}
                            />
                        </ReportProblemStyle.EmailNameTitleView>
                        <ReportProblemStyle.IssueView>
                            <ReportProblemStyle.IssueTitleText>
                                {strings.issue}
                            </ReportProblemStyle.IssueTitleText>
                            <TextInput
                                placeholder={strings.enterYourTextHere}
                                style={{ fontSize: 16, backgroundColor: OFF_WHITE, flex: 1, paddingHorizontal: 10 }}
                                multiline={true}
                                blurOnSubmit={true}
                                maxLength={200}
                                onChangeText={(issue) => { this.setState({ issue: issue }) }}
                            />
                        </ReportProblemStyle.IssueView>
                        <ReportProblemStyle.MaximunTextView>
                            ({strings.maximum200Characters})
                        </ReportProblemStyle.MaximunTextView>
                        <ReportProblemStyle.ReportButton onPress={() => this.handleEmail()}>
                            <ReportProblemStyle.ReportButtonText>
                                {strings.report}
                        </ReportProblemStyle.ReportButtonText>
                        </ReportProblemStyle.ReportButton>
                    </ReportProblemStyle.MainViewContainer>
                </ReportProblemStyle.WrapperView>
                {this.state.loading&&<ActivityLoading textLoading={strings.sendingMail}/>}
            </ReportProblemStyle.SafeView>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        userToken: state.user.userToken,
    languageOfApp: state.appState.languageOfApp,

    };
}

export default connect(mapStateToProps)(ReportProblem);
