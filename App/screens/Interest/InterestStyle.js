import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import {DARK_APP_COLOR} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const IntrestStyle = {
    WrapperViewVertical: styled.View`
    background-color: ${DARK_APP_COLOR};
    flex: 1;
    `,
    WhiteWrapperViewVertical: styled.ScrollView`
    background-color: white;
    flex: 1;
    `,
    NavigationBarViewContainer: styled.View`
    width: ${WIDTH};
    flex-direction: row;
    background-color: ${DARK_APP_COLOR};
    justify-content: center;
    height: ${HEIGHT/15};
    `,
    NavigationTextStyle: styled.Text`
    color: white;
    font-size: 20;
    font-weight: bold;
    align-self: center;
    `,
    TopTitleText: styled.Text`
    color: ${DARK_APP_COLOR};
    font-size: 16;
    text-align: center;
    padding-top: 20;
    height: 70;
    `,
    MainContainerView: styled.View`
    width: ${WIDTH};
    height: ${WIDTH};
    background-color: white;
    `,
    WrapperViewHorizontal: styled.View`
    background-color: white;
    height:${WIDTH/3};
    flex-direction: row;
    margin:10px;
    `,
    InnerConatinerView:styled.View`
    flex:1;
    justify-content:center;
    `,
    PointFiveVerticalView: styled.TouchableOpacity`
    background-color: white;
    height:${WIDTH/3};
    width:${WIDTH/2.5};
    border-radius: 10;
    justify-content: center;
    align-self:center;
    `,
    InnerImageContainerView: styled.View`
    background-color: white;
    height:${WIDTH/4};
    width:${WIDTH/4};
    align-self:center;
    border-color: white;
    `,
    SittingImageConatiner:styled.View`
    background-color: white;
    ${'' /* height:${WIDTH/4.8}; */}
    width:${WIDTH/4.5};
    align-self:center;
    border-color: ${DARK_APP_COLOR};
    border-width:1px;
    border-radius:5px;
    justify-content:center;
    `,
    SittingText:styled.Text`
    color:${DARK_APP_COLOR};
    align-self:center;
    font-size:18;
    `,
    CheckBoxView: styled.View`
    height: 15;
    width: 15;
    border-width: 1;
    border-color: grey;
    position:absolute;
    right:6;
    top:11;
    `,
    CheckBoxInnerView:styled.View`
    flex:1;
    background-color:green
    `,
    NextContainerView: styled.TouchableOpacity`
    width: ${WIDTH/1.2};
    align-self: center;
    height: 60;
    justify-content: center;
    border-radius: 10;
    background-color: ${DARK_APP_COLOR};
    margin-top: ${HEIGHT/30};
    margin-bottom:5px;
    `,
    NextButtonTextStyle: styled.Text`
    color: white;
    font-size: 20;
    font-weight: bold;
    align-self: center;
    `,
}

export default IntrestStyle