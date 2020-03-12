import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const PetULookingForStyle = {
    WrapperViewVertical: styled.View`
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
    ImagePickerContainer: styled.View`
    height:${HEIGHT / 5.8};
    width:${WIDTH};
    `,
    ImagePickerButton: styled.TouchableOpacity`
    height:${HEIGHT / 6};
    width:${HEIGHT / 6};
    align-self:center;
    border-radius:${HEIGHT / 10};
    background-color:${WHITE};
    justify-content:center;
    `,
    ImagePickerPlusButton: styled.TouchableOpacity`
    height:30;
    width:30;
    border-radius:15;
    justify-content:center;
    align-items:center;
    align-content:center;
    position:absolute;
    bottom:2;
    left:${HEIGHT / 3.7}
    background-color:${WHITE};
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
    `

}

export default PetULookingForStyle