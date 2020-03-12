import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK, DARK_APP_COLOR, BLACK_ALPHA, PLACE_HOLDER_COLOR } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width
const NewHeight = Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?HEIGHT-75 : HEIGHT-50
const newInnerviewHeight=Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?HEIGHT-180 : HEIGHT-100

const MatchingStyle = {
    WrapperViewVertical: styled.View`
    background-color: ${WHITE};
    height:${NewHeight}
    `,
    HorizontalView: styled.View`
    flex:1;
    align-items:center;
    flex-direction:row; 
    background-color:${WHITE};
    `,
    BackButton: styled.TouchableOpacity`
    position:absolute;
    top:15;
    height:50;
    left:15;
    
    
    `,
    MessageTexts: styled.Text`
    font-size:20;
    text-align:center;
    flex:1; 
    color:${DARK_APP_COLOR};
    fontWeight:bold;
    `,
    MessageText: styled.Text`
    font-size:20;
    text-align:center;
    flex:1; 
    color:${DARK_APP_COLOR};
    
    `,
    MainPopUpView: styled.TouchableOpacity`
    position:absolute;
    height:${HEIGHT};
    width:${WIDTH};
    align-self:center;
    justify-content:center;
    background-color:${BLACK_ALPHA};
    `,
    ButtonTextStyle: styled.Text`
    font-size: ${WIDTH/25};
    padding:5px;
    `,
    BackButtonTextStyle: styled.TouchableOpacity`
    font-size: ${WIDTH/25};
    padding:15px;
    
    `,
    MatchListContainer:styled.TouchableOpacity`
    background-color:${WHITE};
    min-height:200;
    padding:10px;
    justify-content:center;
    border-width:1;
    border-color:${DARK_APP_COLOR};
    border-radius:10;
    margin:5px;
    `,
    MatchList:styled.FlatList`
    padding:10px;
    margin-bottom: 20px;
    `,
    VerticalView:styled.View`
    justify-content:center;
    flex:1;
    align-items:center;
    `,
    VerticalViewForDetail:styled.View`
    justify-content:center;
    flex:1;
    `,
    PopUpViewInnerView:styled.TouchableOpacity`
    height:${newInnerviewHeight};
    width:${WIDTH-30};
    background-color:${WHITE};
    align-self:center;
    `,
    PointThreeHorizontalView:styled.View`
    ${'' /* height:${newInnerviewHeight-(newInnerviewHeight/1.0)}; */}
    height: ${Platform.OS === 'ios' ? newInnerviewHeight-(newInnerviewHeight/1.2) : newInnerviewHeight-(newInnerviewHeight/1.0)};
    flex-direction:row;
    `,
    verticalPopUpView:styled.View`
    height:${newInnerviewHeight/2.4};
    width:${WIDTH-30};
    background-color:${WHITE};
    align-self:center;
    justify-content:center;
    
    `,
    HorizontalViewPopUps:styled.View`
    flex-direction:row;
    min-height:30;
    padding-top: 30;
    `,
    HorizontalViewPopUp:styled.View`
    flex-direction:row;
    min-height:30;
    `,
    VerticalViewPopUp:styled.View`
    flex:1;
    justify-content:center;
    align-items:flex-end;
    
    `,
    ButtonBottom:styled.TouchableOpacity`
    height:${newInnerviewHeight-(newInnerviewHeight/1.08)};
    border-radius:2;
    border-width:1;
    border-color:${PLACE_HOLDER_COLOR};
    padding:10px;
    flex-direction:row;
    align-items:center
    `,
    BottomButtonText:styled.Text`
    font-size: ${WIDTH/25};
    align-self: center;
    text-align:center;
    `,

}

export default MatchingStyle