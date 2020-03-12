import styled from 'styled-components'
import { Dimensions, } from 'react-native'
import {PROFILE_BACKGROUND_COLOR, DARK_APP_COLOR, BLACK_ALPHA, WHITE, BLACK} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const SignUpStyle = {
    WrapperViewVertical: styled.KeyboardAvoidingView`
    background-color: pink;
    flex: 1;
    `,
    WrapperViewHorizontal: styled.View`
    width: ${WIDTH/1.1};
    align-self: center;
    justify-content: center;
    padding-top: 20;
    `,
    Textinformation: styled.Text`
    color:${BLACK};
    font-size:20px;
    font-weight:bold;
    align-self:center;
    text-align:center;
    padding-top:10px;
    `,
    InPutTextTopTitle: styled.Text`
    color: white;
    font-size: 20;
    height: 20px;
    width: ${WIDTH/1.1};
    align-self: center;
    padding-top: 20;
    padding-bottom: 30;
    `,
    InPutTextViewStyle: styled.View`
    height: 50px;
    flex-direction: row;
    border-color: white;
    border-width: 1;
    border-radius: 10;
    align-self: center;
    align-items: center;
    width: ${WIDTH/1.1};
    `,
    RegisterButtonContainerView: styled.View`
    width: ${WIDTH/1.12};
    align-self: center;
    padding-top: 30;
    padding-bottom: 20;
    `,
    RegisterButtonTextStyle: styled.Text`
    color: black;
    font-size: 20;
    align-self: center;
    font-weight: bold;
    `,
    BottomContainerView: styled.View`
    flex-direction:row;
    justify-content: center;
    flex: 0.1;
    `,
     BottomTextView: styled.View`
     /* flex-direction:row;
     justify-content: center;
     flex: 0.1; */
     top: 2;
     `,
    BottomTextStyle: styled.Text`
    color: white;
    font-size: 18;
    font-weight: bold;
    align-self: center;
    `,
    LoginButtonTextStyle: styled.Text`
    color: white;
    font-size: 20;
    font-weight: bold;
    align-self: center;
    `,
    ImagePickerContainer:styled.View`
    height:${WIDTH/2.7};
    width:${WIDTH/2.7};
    justify-content:center;
    align-self:center;
    `,
    InnerImageViewWithoutImage:styled.View`
    height:${WIDTH/2.7};
    width:${WIDTH/2.7};
    border-radius:${WIDTH/5.4};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    align-self:center;
    background-color:${BLACK_ALPHA};
    justify-content:center;
    align-items:center;
    `,
    ImagePickerButton:styled.TouchableOpacity`
    height:${WIDTH/2.7};
    width:${WIDTH/2.7};
    align-self:center;
    border-radius:${WIDTH/5.4};
    background-color:${PROFILE_BACKGROUND_COLOR};
    justify-content:center;
    `,
    InnerImageView: styled.Image`
    height:${WIDTH/2.7};
    width:${WIDTH/2.7};
    border-radius:${WIDTH/5.4};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    align-self:center;
    `,
    ImagePickerPlusButton:styled.TouchableOpacity`
    height:${WIDTH/9.5};
    width:${WIDTH/9.5};
    border-radius:${WIDTH/9.5};
    align-self:flex-end;
    position:absolute;
    bottom:2;
    align-self:flex-end;
    background-color: white;
    `,
    MainView:styled.View`
    height:${HEIGHT};
    width:${WIDTH};
    align-self:center;
    background-color:${BLACK_ALPHA};

    `,
    InnerContainer:styled.View`
    height: ${HEIGHT/2};
    width:${WIDTH-15};
    top: ${HEIGHT/15};
    background-color:${WHITE};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    border-radius:10px;
    align-self:center;
    padding:10px;
    justify-content:center;
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
    PopUpTitle: styled.Text`
    align-self: center;
    font-size: ${WIDTH/20};
    margin-bottom: 10; 
    color: ${DARK_APP_COLOR};
    `,
     TextView: styled.Text`
     color: white;
     font-size: 18;
     /* top: 3; */
     width: ${WIDTH / 1.1};
     left: 15;
     margin-bottom: 10; 
   `,
     TextLink: styled.Text`
     color: white;
     text-decoration-line: underline;
    font-weight: bold;

   `,
}

export default SignUpStyle