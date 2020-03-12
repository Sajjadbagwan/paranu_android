import styled from 'styled-components'
import { Dimensions} from 'react-native'
import {APP_COLOR, WHITE, BLACK_TRANSPARENT} from '../../component/constant/Color'
const WIDTH = Dimensions.get('screen').width

const LoginTypeStyle={
    WrapperView:styled.View`
    flex:1;
    background-color:${APP_COLOR};
    `,
    TopView:styled.View`
    flex:.4;
    padding-horizontal:10;
    `,
    BottomView:styled.View`
    flex:.4;
    justify-content:flex-end;
    `,
    CenterView:styled.View`
    flex:.2;
    justify-content:center;
    align-items:center;
    `,
    HorizontalCenterView:styled.View`
    flex-direction:row;
    align-self:center;

    `,
    CenterText:styled.Text`
     font-size:35px;
     font-family:Palatino-BoldItalic;
     color:${WHITE};
     padding-left:10px;
     align-self:center
    `,
    BottomHorizontalView:styled.View`
    flex-direction:row;
    height:${WIDTH/6};
    background-color:${WHITE};
    `,
    BottomButtonText:styled.Text`
    align-self:center;
    font-weight: 500;
    font-size:${WIDTH/20};
    `,
    ButtonDivider:styled.View`
    width:0.5;
    background-color:${BLACK_TRANSPARENT};
    `

}

export default LoginTypeStyle;