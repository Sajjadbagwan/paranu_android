import styled from 'styled-components'
import { Dimensions} from 'react-native'
import {DARK_APP_COLOR, WHITE, APP_COLOR, BLACK, BLACK_ALPHA} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const PaymentTypeStyle = {
    WrapperViewVertical: styled.View`
    background-color: ${DARK_APP_COLOR};
    flex: 1;
    `,
    SafeAreaView: styled.SafeAreaView`
    flex: 1; 
    `,
    WrapperViewHorizontal: styled.View`
    flex-direction: row;
    width: ${WIDTH};
    align-self: center;
    justify-content: center;
    height: ${HEIGHT/10}
    `,
    PaymentViewTopTitle: styled.Text`
    align-self: center;
    font-size: ${WIDTH/15};
    font-weight: bold;
    color: ${WHITE};
    padding-bottom: 15;
    `,
    CarouselContainerView: styled.View`
    flex: 1;
    border-radius: 20;
    background-color: ${WHITE};
    `,
    CarouselTopContainerView: styled.View`
    flex: 0.15;
    justify-content: center;
    border-top-right-radius: 20;
    border-top-left-radius: 20;
    `,
    CarouselBottomContainerView: styled.View`
    flex: 0.85;
    border-bottom-right-radius: 20;
    border-bottom-left-radius: 20;
    `,
    CardTypeTitle: styled.Text`
    align-self: center;
    font-size: ${WIDTH/15};
    font-weight: 300;
    color: ${WHITE};
    `,
    ProfileLimitText: styled.Text`
    padding-top: 10;
    padding-bottom: 10;
    align-self: center;
    font-size: ${WIDTH/18};
    font-weight: bold;
    color: ${BLACK};
    `,
    ChossePkgView: styled.TouchableOpacity`
    align-self: center;
    align-items: center;
    flex-direction: row;
    width: ${WIDTH/1.35};
    height: ${HEIGHT/15};
    margin-top: 13;
    border-radius: 10;
    background-color: ${WHITE};
    `,
    FlatListView:styled.FlatList`
    `,
    StarContainerView: styled.View`
    margin-left: 10;
    `,
    PointEightView: styled.View`
    flex: 0.75;
    `,
    PointTwoView: styled.View`
    flex: 0.25;
    `,
    PaymentCancelText: styled.Text`
    ${'' /* align-self: center; */}
    ${'' /* font-size: ${WIDTH/22}; */}
    color: ${BLACK};
    left: 20;
    font-size: 22;
    `,
    DiscountContainerView: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom-right-radius: 20;
    border-bottom-left-radius: 20;
    flex: 1;
    `,
    DiscountText: styled.Text`
    align-self: center;
    margin-left: 5;
    font-size: ${WIDTH/25};
    color: ${BLACK};
    ${'' /* font-size: 15; */}
    `,
    CodeContainerView: styled.TouchableOpacity`
    background-color: ${DARK_APP_COLOR};
    min-width: ${WIDTH/6};
    margin-left: 5;
    flex-direction: row;
    justify-content: center;
    border-radius: ${WIDTH};
    height: ${WIDTH/11};
    `,
    CodeText: styled.Text`
    align-self: center;
    font-size: ${WIDTH/23};
    color: ${WHITE};
    padding-horizontal:3px;
    `,
    DistanceMainView:styled.TouchableOpacity`
    position:absolute;
    height:${HEIGHT};
    width:${WIDTH};
    align-self:center;
    justify-content:center;
    background-color:${BLACK_ALPHA};

    `,
    DistanceInnerContainer:styled.View`
    height: 380;
    width:${WIDTH-15};
    background-color:${WHITE};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    border-radius:10px;
    align-self:center;
    justify-content:center;
    padding:10px;
    `,
    CloseButton: styled.TouchableOpacity`
    bottom:10;
    `,
    SubmitButton: styled.TouchableOpacity`
    height: ${WIDTH/9};
    width: ${WIDTH/5};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    border-radius:10px;
    top: 10;
    align-self:center;
    justify-content:center;
    background-color:${DARK_APP_COLOR};
    `,
    SubmitButtonText: styled.Text`
    align-self: center;
    font-size: ${WIDTH/22};
    color: ${BLACK};
    `,

}

export default PaymentTypeStyle