import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import {DARK_APP_COLOR, WHITE} from '../../constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const PetsStyle = {
    WrapperViewVertical: styled.View`
    flex: 1;
    background-color:${WHITE};
    padding-bottom: 70
    `,
    PointFiveVerticalView: styled.TouchableOpacity`
    background-color: white;
    height: ${WIDTH/2};
    width:${WIDTH/2.3};
    align-self:center;
    margin-top:10px;
    border-color:${DARK_APP_COLOR};
    border-width:1;
    border-radius:10px;

    `,
    InnerImageContainerView: styled.View`
    background-color: white;
    border-width: 4;
    border-radius: 10;
    border-color: white;
    height:${WIDTH/3.1};
    width:${WIDTH/3.3};
    top:10;
    align-self:center;
    `,
    CheckBoxView: styled.View`
    height: 20;
    width: 20;
    top:5;
    position:absolute;
    right:5;
    `,
    PetNameView:styled.View`
    position:absolute;
    width:${WIDTH/2.3};
    bottom:0;
    background-color:${DARK_APP_COLOR};
    min-height:${WIDTH/10};
    justify-content:center;
    `,
    PetNameText:styled.Text`
    align-self:center;
    font-size:16;
    color:${WHITE};
    `,
    InterestInnerText:styled.Text`
    align-self:center;
    text-align:center;
    width:${WIDTH/2.3}`
    ,
    InterestText:styled.Text`
    align-self:center;
    text-align:center;
    width:${WIDTH/2.3};
    top:10
    `,
}

export default PetsStyle