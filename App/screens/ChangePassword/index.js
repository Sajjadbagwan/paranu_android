import React, { Component } from 'react';
import { Dimensions, TextInput, StyleSheet,Alert } from 'react-native';
import ChangePasswordStyle from './ChangePasswordStyle';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Route from '../../network/route'
import { url } from '../../component/constant/Url'
import ActivityLoading from '../../component/common/ActivityLoading'
import { connect } from "react-redux";
import strings from "../../screens/ChangePassword/ChangePasswordLocalization";
import * as RNLocalize from 'react-native-localize';


const route = new Route(url)
const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        if(this.props.languageOfApp){
            strings.setLanguage(this.props.languageOfApp)
          }
       
        

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            loading: false,
            latitude: null,
      longitude: null,
      error:null,

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
    changePasswordApi() {
        this.setState({loading:true})
        oldPassword = this.state.oldPassword
        newPassword = this.state.newPassword
        confirmPassword = this.state.confirmPassword
        if (oldPassword == '' || newPassword == '' || confirmPassword == ''||newPassword.length<8) {
            this.setState({loading:false})
            this.alert(strings.alert1)
            
        }
        else{
            if(newPassword==confirmPassword){
                var data = { oldPassword: oldPassword, newPassword: newPassword }
                var token = this.props.userToken
                route.put("user/"+this.props.userDetail._id, data, token,)
                    .then(async (response) => {
                        if (response.error) {
                            this.setState({loading:false})
                            Alert.alert(response.error.message)
                        }
                        else {
                            this.setState({loading:false})
                            Alert.alert(
                                strings.alert2,
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
                this.setState({loading:false})
                this.alert(strings.alert3)
            }
        }
    }
alert(message){
    Alert.alert(message);
}

    render() {
        return (
            <ChangePasswordStyle.SafeAreaView>
                <ChangePasswordStyle.WrapperViewVertical>
                    <ChangePasswordStyle.NavigationBarViewContainer>
                        <ChangePasswordStyle.NavigationTextStyle>
                            {strings.changePassword}
                        </ChangePasswordStyle.NavigationTextStyle>
                        <ChangePasswordStyle.BackButton onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name='arrowleft' size={30} color='white' />
                        </ChangePasswordStyle.BackButton>
                    </ChangePasswordStyle.NavigationBarViewContainer>

                    <ChangePasswordStyle.TextFieldTopTilte>
                        {strings.oldPassword}
                    </ChangePasswordStyle.TextFieldTopTilte>
                    <ChangePasswordStyle.TextFieldViewStyle>
                        <TextInput style={styles.InputTextStyle}
                            secureTextEntry={true}
                            onChangeText={(oldPassword) => this.setState({ oldPassword })} >
                        </TextInput>
                    </ChangePasswordStyle.TextFieldViewStyle>
                    <ChangePasswordStyle.TextFieldTopTilte>
                        {strings.newPassword}
                    </ChangePasswordStyle.TextFieldTopTilte>
                    <ChangePasswordStyle.TextFieldViewStyle>
                        <TextInput style={styles.InputTextStyle}
                            secureTextEntry={true}
                            onChangeText={(newPassword) => this.setState({ newPassword })} >
                        </TextInput>
                    </ChangePasswordStyle.TextFieldViewStyle>
                    <ChangePasswordStyle.TextFieldTopTilte>
                        {strings.confirmPassword}
                    </ChangePasswordStyle.TextFieldTopTilte>
                    <ChangePasswordStyle.TextFieldViewStyle>
                        <TextInput style={styles.InputTextStyle}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })} >
                        </TextInput>
                    </ChangePasswordStyle.TextFieldViewStyle>

                    <ChangePasswordStyle.ChangePasswordContainerView onPress={()=>this.changePasswordApi()}>
                        <ChangePasswordStyle.ChangePasswordButtonTextStyle>
                            {strings.changePassword}
                        </ChangePasswordStyle.ChangePasswordButtonTextStyle>
                    </ChangePasswordStyle.ChangePasswordContainerView>
                    <ChangePasswordStyle.ForgetContainer onPress={()=>this.props.navigation.navigate("ForgotPassword")}>
                        <ChangePasswordStyle.ForgetButtonTextStyle>
                            {strings.forgetPassword}
                        </ChangePasswordStyle.ForgetButtonTextStyle>
                    </ChangePasswordStyle.ForgetContainer>

                </ChangePasswordStyle.WrapperViewVertical>
                {this.state.loading&&<ActivityLoading textLoading={strings.changingPassword} />}
            </ChangePasswordStyle.SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    InputTextStyle: { fontSize: 12, marginLeft: 10, marginRight: 10, flex: 1, height: 30, color: 'black' },
});

function mapStateToProps(state, props) {
    return {
        userDetail: state.user.userDetail,
        userToken: state.user.userToken,
    languageOfApp: state.appState.languageOfApp,
    };
}
export default connect(mapStateToProps)(ChangePassword);