import styled from 'styled-components'
import { Dimensions, } from 'react-native'
import { APP_COLOR, DARK_APP_COLOR, OFF_WHITE, BLACK} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const ParanuGuideStyle = {
    WrapperViewVertical: styled.SafeAreaView`
    background-color: ${DARK_APP_COLOR};
    flex: 1;
    `,
    WrapperInnerView:styled.ScrollView`
    background-color:${OFF_WHITE};
    padding-horizontal:5px;
    `,
    ImageWithTitle:styled.Image`
    align-self:center;
    margin-vertical  :${WIDTH/20};
    width:270;
    height:70;
    `,
    TitleOverViewText:styled.Text`
    font-size:22;
    color:${DARK_APP_COLOR};
    font-weight:bold;
    padding-vertical:${WIDTH/20};
    `,
    QuestionTitleText:styled.Text`
    color:${DARK_APP_COLOR};
    font-size:16;
    `,
    DescriptionText:styled.Text`
    color:${BLACK};
    font-size:16;
    padding-bottom:15;
    `
}

export default ParanuGuideStyle