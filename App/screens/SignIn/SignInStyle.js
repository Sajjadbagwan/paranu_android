import styled from "styled-components";
import { Dimensions, Platform } from "react-native";
import {
  BLACK_ALPHA,
  WHITE,
  DARK_APP_COLOR,
  BLACK
} from "../../component/constant/Color";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const LoginStyle = {
  WrapperViewVertical: styled.View`
    background-color: pink;
    flex: 1;
  `,
  WrapperViewHorizontal: styled.View`
    flex-direction: row;
    width: ${WIDTH / 1.1};
    align-self: center;
    justify-content: center;
    flex: 0.2;
  `,
  TopTitleTextStyle: styled.Text`
    color: white;
    font-size: 35;
    padding-left: 20;
    align-self: center;
    font-weight: bold;
    flex: 0.8;
  `,
  flexPointZeroFiveView: styled.View`
    flex: 0.05;
    width: ${WIDTH / 1.1};
    align-self: center;
    padding-top: 10;
    justify-content: center;
  `,
  EmailandPassTilteText: styled.Text`
    color: white;
    font-size: 20;
  `,
  EmailandPassViewStyle: styled.KeyboardAvoidingView`
    flex: 0.08;
    flex-direction: row;
    border-color: white;
    border-width: 1;
    border-radius: 10;
    align-self: center;
    align-items: center;
    width: ${WIDTH / 1.1};
  `,
  ForgetPasswordContainerView: styled.View`
    flex: 0.12;
    width: ${WIDTH / 1.1};
    align-self: center;
    align-items: flex-end;
  `,
  ForgetButtonTextStyle: styled.Text`
    color: white;
    font-size: 20;
    top: 10;
  `,
  LoginButtonContainerView: styled.View`
    flex: 0.1;
    width: ${WIDTH / 1.1};
    align-self: center;
    border-radius: 10;
    background-color: white;
    top: 10;
  `,
  TextView: styled.Text`
  color: white;
  font-size: 18;
  /* top: 10; */
  width: ${WIDTH / 1.1};
  left: 15;
`,
TextLink: styled.Text`
     color: white;
     text-decoration-line: underline;
    font-weight: bold;

   `,
  LoginButtonTextStyle: styled.Text`
    color: black;
    font-size: 20;
    align-self: center;
    font-weight: bold;
  `,
  SepratorContainerView: styled.View`
    padding-top: 20;
    flex: 0.13;
    align-self: center;
    flex-direction: row;
  `,
  HightOne: styled.View`
    height: 1;
    width: ${WIDTH / 0.4}
    align-self: center;
    background-color: white;
    `,
  ORTextStyle: styled.Text`
    color: white;
    font-size: 20;
    align-self: center;
    font-weight: bold;
    margin-left: 30;
    margin-right: 30;
  `,
  LoginWithFBContainerView: styled.View`
    width: ${WIDTH / 1.1};
    justify-content: center;
    border-radius: 20;
  `,
  FBButtonTextStyle: styled.Text`
    color: white;
    font-size: ${WIDTH/20};
    font-weight: bold;
    align-self: center;
    font-weight: bold;
  `,
  BottomContainerView: styled.View`
    width: ${WIDTH / 1.1};
    flex-direction: row;
    flex: 0.09;
    justify-content: center;
    align-self: center;
  `,
  BottomTextStyle: styled.Text`
    color: white;
    font-size: 18;
    font-weight: bold;
    align-self: center;
  `,
  RegisterButtonTextStyle: styled.Text`
    color: white;
    font-size: 20;
    font-weight: bold;
    align-self: center;
  `,
  NumberVerificationMain: styled.View`
    position: absolute;
    height: ${HEIGHT};
    width: ${WIDTH};
    align-self: center;
    background-color: ${BLACK_ALPHA};
  `,
  WrapperViewVerification: styled.View`
    width: ${WIDTH / 1.1};
    align-self: center;
    justify-content: center;
    padding-top: 20;
  `,
  InnerContainerVerification: styled.View`
    height: ${HEIGHT / 2};
    width: ${WIDTH - 15};
    top: ${HEIGHT / 15};
    background-color: ${WHITE};
    border-color: ${DARK_APP_COLOR};
    border-width: 1px;
    border-radius: 10px;
    align-self: center;
    padding: 10px;
    justify-content: center;
  `,
  PopUpTitle: styled.Text`
    align-self: center;
    font-size: ${WIDTH / 20};
    margin-bottom: 10;
    color: ${DARK_APP_COLOR};
  `,
  CodeTextInput: styled.TextInput`
  height: ${WIDTH/9};
  width: ${WIDTH/2};
  border-color:${DARK_APP_COLOR};
  border-width:1px;
  border-radius:10px;
  text-align: center;
  align-self:center;
  `,
  SubmitButton: styled.TouchableOpacity`
    height: ${WIDTH/9};
    width: ${WIDTH/3};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    border-radius:10px;
    top: 10;
    margin-bottom: 10; 
    align-self:center;
    justify-content:center;
    background-color:${DARK_APP_COLOR};
    `,
    SubmitButtonText: styled.Text`
    align-self: center;
    font-size: ${WIDTH/22};
    color: ${BLACK};
    `,
};

export default LoginStyle;
