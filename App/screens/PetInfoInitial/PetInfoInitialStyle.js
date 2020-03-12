import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK, PROFILE_BACKGROUND_COLOR, DARK_APP_COLOR } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const PetInfoInitialStyle = {
    WrapperViewVertical: styled.KeyboardAvoidingView`
    background-color: ${APP_COLOR};
    flex: 1;
    `,
    BackButton: styled.TouchableOpacity`
    margin-left: 10;
    width: 45;
    `
    ,
    ScrollView: styled.ScrollView`
    
    `,
    ImagePickerContainer:styled.View`
    height:${WIDTH/2.7};
    width:${WIDTH/2.7};
    justify-content:center;
    align-self:center;
    `,
    ImagePickerButton:styled.TouchableOpacity`
    height:${WIDTH/2.7};
    width:${WIDTH/2.7};
    align-self:center;
    border-radius:${WIDTH/2.7};
    background-color:${PROFILE_BACKGROUND_COLOR};
    justify-content:center;
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
    Textinformation: styled.Text`
    color:${BLACK};
    font-size:20px;
    font-weight:bold;
    align-self:center;
    text-align:center;
    padding-top:10px;
    `,
    InputDetailContainer:styled.View`
    padding:20px;
    `
    ,
    TitleEditText:styled.Text`
    color:${WHITE};
    font-size:18;
    `,
    InPutTextViewStyle: styled.View`
    height: 50px;
    border-color: ${WHITE};
    border-width: 1;
    border-radius: 10;
    margin-bottom:10px;
    margin-top:10px;
    justify-content:center;
    `,
    BerifeInPutTextViewStyle: styled.View`
    height: 100px;
    border-color: ${WHITE};
    border-width: 1;
    border-radius: 10px;
    margin-bottom:10px;
    margin-top:10px;
    `,
    OptionalText:styled.Text`
    align-self:flex-end;
    color:${WHITE};
    `,
    BottomNextButton:styled.TouchableOpacity`
    height:60px;
    border-color: ${WHITE};
    border-width: 1;
    border-radius: 10;
    background-color:${WHITE};
    justify-content:center;
    margin-vertical:20px;
    `,
    BottomNextButtonText:styled.Text`
    font-size:20;
    align-self:center;
    `,
    DownArrowImage:styled.View`
    position:absolute;
    right:10px;
    justify-content:center;
    align-content:center;
    align-items:center;
    `,
    MonthOrYearView:styled.TouchableOpacity`
    position:absolute;
    right:10px;
    justify-content:center;
    align-content:center;
    align-items:center;
    width:120;
    height: 50px;
    `

}

export default PetInfoInitialStyle