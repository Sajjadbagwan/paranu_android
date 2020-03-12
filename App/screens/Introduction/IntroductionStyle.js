import styled from 'styled-components'
import { Dimensions, Platform, PixelRatio } from 'react-native'
import {DARK_APP_COLOR, WHITE, APP_COLOR, BLACK} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const IntroductionStyle = {
    WrapperViewVertical: styled.View`
    flex: 1;
    `,
    SafeAreaView: styled.SafeAreaView`
    flex: 1; 
    `,
    BottomView: styled.View`
    position: absolute;
    bottom: 0;
    height: ${WIDTH/2};
    width: ${WIDTH};
    justify-content:center;
    align-self: center;
    
    
    
    `,
    BottomText: styled.Text`
    padding-left: 20;
    padding-right: 20;
    padding-bottom: 5;
    padding-top: 6;
    font-weight: 500;
    font-size: ${WIDTH/32};
    position: absolute;
    bottom: ${WIDTH/7};
    /* height: ${WIDTH/4}; */
    height: ${Platform.OS === 'ios' ? WIDTH/3.8 : WIDTH/3.3};  
    width: ${WIDTH};
    justify-content:center;
    align-self: center;
    align-items:center;
    `,
    PageControllerView: styled.View`
    position: absolute;
    flex-direction: row;
    bottom: 0;
    height: ${WIDTH/8};
    width: ${WIDTH/0.1};
    `,
    NextButtonView: styled.View`
    width:${WIDTH/2};
    height:${WIDTH/8};
    justify-content:center;
    `,
    NextButtonText: styled.Text`
    font-weight: 400;
    font-size: ${WIDTH/20};
    /* font-size: ${PixelRatio.get() === 2 ? 40 / PixelRatio.get() : PixelRatio.get() === 3 ? 30 / PixelRatio.get() : 40 / PixelRatio.get()}; */
    color:  ${DARK_APP_COLOR};
    position:absolute;
    right:10;
    maxWidth: ${WIDTH/4}
    `,
    NextButtonText2: styled.Text`
    font-weight: 400;
    font-size: ${WIDTH/20};
    color:  ${DARK_APP_COLOR};
    position:absolute;
    left:10;
    `,
    BackButtonView: styled.View`
     width:${WIDTH/2};
    height:${WIDTH/8};
    justify-content:center;
    `,
    FirstTextColor:styled.Text`
    color:${DARK_APP_COLOR};
    font-weight: 500;
    font-size: ${WIDTH/25.5};
    `
}



export default IntroductionStyle