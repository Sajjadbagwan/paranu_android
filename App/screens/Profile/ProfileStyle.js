import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK, DARK_APP_COLOR, OFF_WHITE, BLACK_ALPHA } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const ProfileStyle = {
    WrapperViewVertical: styled.SafeAreaView`
    background-color: ${DARK_APP_COLOR};
    flex: 1;
    margin-bottom:${Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?70:50}
    `,
    MainViewScrollView:styled.ScrollView`
    background-color:${WHITE};
    `,
    TopImageViewContainer:styled.View`
    justify-content:center;
    padding:10px;
    `,
    BadgeNumberText:styled.Text`
    position:absolute;
    left:10;
    top:10;
    font-size:15;
    color:${BLACK}

    `,
    Textinformation: styled.Text`
    color:${WHITE};
    font-size:15px;
    font-weight:bold;
    align-self:center;
    text-align:center;
    padding-left:10px;
    padding-right:10px;
    `,
    BadgeNumberColorText:styled.Text`
    color:green;
    font-size:17;
    align-self:center

    `,
    SecterNumberView:styled.View`
    flex-direction:row;
    align-self:center;
    align-content:center;
    `,

    InnerImageView:styled.Image`
    height:120px;
    width:120px;
    border-radius:60px;
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    align-self:center;
    `,
    TextUserName:styled.Text`
    align-self:center;
    font-size:18;
    padding-vertical:10px;
    `,
    FirstPetText:styled.Text`
    font-weight:bold;
    font-size:18;
    padding-vertical:10px;
    left:10;
    `,
    DetailContainerView:styled.View`
    padding-vertical:5px;
    padding-horizontal:10px;
    `,
    DetailContainerViewEnd:styled.View`
    paddingTop:5px;
    paddingBottom:15px;
    padding-horizontal:10px;
    `,
    HorizontalDetailInner:styled.View`
    flex-direction:row;
    background-color:${WHITE};
    height:45px;
    border-radius:15px;
    border-width:1;
    border-color:${OFF_WHITE};
    align-items:center;
    `,
    DetailTitleText:styled.Text`
    position:absolute;
    color:${BLACK};
    font-size:18;
    left:10;
    `,
    DetailText:styled.Text`
    position:absolute;
    font-size:16;
    color:${BLACK_ALPHA};
    right:15;
    `,
    BriefInformationDetail:styled.Text`
    color:${BLACK_ALPHA};
    padding:10px;
    `,
    BriefInfoContainerView:styled.View`
    padding-vertical:10px;
    padding-horizontal:10px;
    `,
    BriefInfoInner:styled.View`
    borderRadius:10px;
    border-width:1px;
    border-color:${OFF_WHITE};
    background-color:${WHITE};
    `,
    BriefInfoHeadertext:styled.Text`
    color:${BLACK};
    font-size:18;
    left:10;
    padding-top:10px;
    `,
    DividerLine:styled.View`
    height:1px;
    width:${WIDTH};
    background-color:${BLACK_ALPHA};
    align-self:center;
    `,
    ChangeInterestContainer:styled.View`
    padding-top:10px;
    padding-bottom:30px;
    `,
    ChangeInterestButton:styled.TouchableOpacity`
    align-self:center;
    `,
    ChangeInterestText:styled.Text`
    color:${DARK_APP_COLOR};
    align-self:center;
    font-size:18;
    `,
    AddButtonButtonView:styled.View`
    height:30px;
    width:${WIDTH};
    margin-bottom:10px;
    `,
    AddPetButton:styled.TouchableOpacity`
    position:absolute;
    right:20;
    height:30px;
    justify-content:center;
    border-radius:15px;
    border-width:1;
    border-color:${DARK_APP_COLOR};
    background-color:${DARK_APP_COLOR};
    `,
    PetImagesInner:styled.TouchableOpacity`
    height:80;
    width:80;
    justify-content:center;
    border-color:${APP_COLOR};
    border-width:1;
    align-self:center;
    align-items:center;
    margin:5px;
    `,
    PetImagesContainer:styled.View`
    justify-content:center;
    padding:10px;
    `,
    
    PetImagesFlatList:styled.FlatList`
    
    `,
    ChangePetView:styled.View`
    flex-direction:row;
    `,
    ChangePetRussianView:styled.View`
    ${'' /* flex-direction:row; */}
    left: 0;
    text-align: left;
    `,
    FirstPetRussianText:styled.Text`
    font-weight:bold;
    font-size:18;
    padding-vertical:10px;
    margin-left: 10px;
    `,
    ChangePetRussianButton:styled.TouchableOpacity`
    position:absolute;
    margin-left: 10px;
    `,
    ChangePetButton:styled.TouchableOpacity`
    position:absolute;
    right:10;
    `


}

export default ProfileStyle