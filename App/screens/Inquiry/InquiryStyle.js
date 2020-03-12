import styled from 'styled-components'
import {  DARK_APP_COLOR, OFF_WHITE, WHITE } from '../../component/constant/Color'
import { Dimensions } from 'react-native'
import strings from './InquiryLocalization';

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const InquiryStyle={
    WrapperView:styled.View`
    flex:1;
    background-color:${OFF_WHITE};
   `,
   SafeView:styled.SafeAreaView`
   background-color:${DARK_APP_COLOR};
   flex:1;
   `,
   MainViewContainer:styled.View`
   padding:10px;
   height:${HEIGHT-HEIGHT/15};
   `
   ,
   EmailNameTitleView: styled.View`
   flex:0.09;
   background-color: white;
   border-radius: 10;
   align-items: center;
   align-self:center;
   width: ${WIDTH/1.1};
   margin-top:15px;
   flex-direction:row;
   
   `,
   IssueView: styled.View`
   flex:0.40;
   background-color: white;
   border-radius: 10;
   align-self: center;
   width: ${WIDTH/1.1};
   margin-top:15px;
   padding:10px;
   
   `,
   TitleText:styled.Text`
   padding-horizontal:10px;
   font-size:16px;
   `,
   IssueTitleText:styled.Text`
   font-size:16px;
   padding-bottom:15px;
   `,
   MaximunTextView:styled.Text`
   align-self:flex-end;
   color:${DARK_APP_COLOR};
   font-size:16;
   `,
   ReportButton:styled.TouchableOpacity`
   margin-top:10px;
   height:50;
   width:${WIDTH/1.5};
   background-color:${DARK_APP_COLOR};
   border-radius:10px;
   border-width:1;
   align-self:center;
   justify-content:center;
   border-color:${DARK_APP_COLOR};
   `,
   ReportButtonText:styled.Text`
   color:${WHITE};
   align-self:center;
   font-size:20;
   `
 
}

export default InquiryStyle;