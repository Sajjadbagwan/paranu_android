import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { DARK_APP_COLOR } from '../../component/constant/Color';


const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width
const ForgotStyle={
    WrapperViewVertical: styled.View`
    background-color: white;
    flex: 1;
    border-radius: 5;
    `,
    InnerVerticalView: styled.View`
    background-color: white;
    flex: 1;
    justify-content:center;
    `,
    SafeAreaView: styled.SafeAreaView`
    flex: 1; 
    backgroundColor: ${DARK_APP_COLOR};
    `,
    NavigationBarViewContainer: styled.View`
    width: ${WIDTH};
    flex-direction: row;
    margin-bottom: 20;
    background-color: ${DARK_APP_COLOR};
    justify-content: center;
    height: ${HEIGHT/15};
    `,
    NavigationTextStyle: styled.Text`
    color: white;
    font-size: 20;
    font-weight: 300;
    align-self: center;
    `,
    BackButton: styled.TouchableOpacity`
    align-self: center;
    left: 10; 
    position: absolute;
    `,
    TextFieldTopTilte: styled.Text`
    color: black;
    margin-top: 20
    width: ${WIDTH/1.2};
    align-self: center;
    font-size: 20;
    `,
    TextFieldViewStyle: styled.View`
    border-color: grey;
    border-width: 0.5;
    border-radius: 10;
    align-self: center;
    height: ${WIDTH/8};
    margin-top: 10;
    width: ${WIDTH/1.2};
    margin-top:30
    `,
    ChangePasswordContainerView: styled.TouchableOpacity`
    width: ${WIDTH/2};
    height: ${WIDTH/8};
    margin-top: 30;
    border-radius: 10;
    align-self: center;
    background-color: ${DARK_APP_COLOR};
    justify-content: center;
    margin-top:${HEIGHT/6}
    `,
    ChangePasswordButtonTextStyle: styled.Text`
    color: white;
    font-size: 20;
    align-self: center;
    font-weight: bold;
    `,
    ForgetContainer: styled.TouchableOpacity`
    width: ${WIDTH/1.4};
    height: 40;
    margin-top: 10;
    align-self: center;
    justify-content: center;
    `,
    ForgetButtonTextStyle: styled.Text`
    color: ${DARK_APP_COLOR};
    font-size: 18;
    font-weight: 500;
    align-self: center;
    `,

}
export default ForgotStyle