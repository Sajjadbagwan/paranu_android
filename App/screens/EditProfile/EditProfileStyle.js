import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK, DARK_APP_COLOR, OFF_WHITE, BLACK_ALPHA } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const EditProfileStyle = {
    WrapperViewVertical: styled.SafeAreaView`
    background-color: ${DARK_APP_COLOR};
    flex: 1;
    margin-bottom:${Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812) || (HEIGHT === 896 || WIDTH === 896)) ? 70 : 50}
    `,
    MainViewScrollView: styled.ScrollView`
    background-color:${WHITE};
    `,
    TopImageViewContainer: styled.TouchableOpacity`
    justify-content:center;
    padding:10px;
    height:120px;
    width:120px;
    align-self:center;
    margin-top: 5px;
    `,
    
    InnerImageView: styled.Image`
    height:120px;
    width:120px;
    border-radius:60px;
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    align-self:center;
    `, 
    InnerImageViewPet: styled.Image`
    height:80;
    width:80;
    align-self:center;
    `,
    InnerImageViewWithoutImage:styled.View`
    height:120px;
    width:120px;
    border-radius:60px;
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    align-self:center;
    background-color:${BLACK_ALPHA};
    justify-content:center;
    align-items:center;
    `,
    TextUserName: styled.Text`
    align-self:center;
    font-size:18;
    padding-vertical:10px;
    `,
    FirstPetText: styled.Text`
    font-weight:bold;
    font-size:18;
    padding-vertical:10px;
    left:10;
    `,
    DetailContainerView: styled.View`
    padding-vertical:5px;
    padding-horizontal:10px;
    `,
    HorizontalDetailInner: styled.View`
    flex-direction:row;
    background-color:${WHITE};
    height:45px;
    border-radius:15px;
    border-width:1;
    border-color:${OFF_WHITE};
    align-items:center;
    justify-content:flex-end;
    `,
    DetailTitleText: styled.Text`
    position:absolute;
    color:${BLACK};
    font-size:18;
    left:10;
    `,
    DownArrowImage:styled.View`
    position:absolute;
    right:10px;
    justify-content:center;
    align-content:center;
    align-items:center;
    `,
    DetailText: styled.Text`
    position:absolute;
    font-size:16;
    color:${BLACK_ALPHA};
    right:15;
    `,
    BriefInfoContainerView: styled.View`
    padding-vertical:10px;
    padding-horizontal:10px;
    `,
    BriefInfoInner: styled.View`
    border-radius: 10px;
    border-width:1px;
    border-color:${OFF_WHITE};
    background-color:${WHITE};
    `,
    BriefInfoHeadertext: styled.Text`
    color:${BLACK};
    font-size:18;
    left:10;
    padding-bottom:3px;
    padding-top:8px;
    `,
    
    DividerLine: styled.View`
    height:1px;
    width:${WIDTH};
    background-color:${BLACK_ALPHA};
    align-self:center;
    `,
    ChangeInterestContainer: styled.View`
    padding-top:10px;
    padding-bottom:30px;
    `,
    ChangeInterestButton: styled.TouchableOpacity`
    align-self:center;
    `,
    ChangeInterestText: styled.Text`
    color:${DARK_APP_COLOR};
    align-self:center;
    font-size:18;
    `,
    AddPetButton: styled.TouchableOpacity`
    position:absolute;
    bottom:10;
    right:10;
    height:30px;
    width:30px;
    justify-content:center;
    align-items:center;
    border-radius:15px;
    border-width:1;
    border-color:${DARK_APP_COLOR};
    background-color:${DARK_APP_COLOR};
    `,
    PetImagesContainer: styled.View`
    justify-content:center;
    padding:10px;
    flex-direction:row;
    `,
    PetImagesInner:styled.View`
    height:80;
    width:80;
    justify-content:center;
    border-color:${WHITE};
    border-width:1;
    align-self:center;
    align-items:center;
    margin:8px;
    background-color: ${BLACK};
    `,

    PetImagesFlatList: styled.FlatList`
    
    `,
    EmptyView:styled.View`
    justify-content:center;
    width:${WIDTH-100}
    `,
    ImagePetAdd:styled.TouchableOpacity`
    height:80;
    width:80;
    justify-content:center;
    background-color:${BLACK_ALPHA};
    border-color:${WHITE};
    border-width:1;
    align-self:center;
    align-items:center;
    `,
    LookingPetDetailContainer:styled.View`
    justify-content:center;
    `


}

export default EditProfileStyle