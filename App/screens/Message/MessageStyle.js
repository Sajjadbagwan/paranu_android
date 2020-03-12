import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK,OFF_WHITE, DARK_APP_COLOR, BLACK_ALPHA } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const MessageStyle = {
    MainView:styled.View`
    flex:1;
    background-color:${DARK_APP_COLOR}
    `,
    WrapperViewVertical: styled.SafeAreaView`
    flex: 1;
    justify-content:flex-end;
    margin-bottom:${Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?70 : 50}
    `,
    InnerView:styled.View`
    flex:1;
    background-color:${WHITE};
    `,
    OtherImageContainer: styled.Image`
    background-color:${BLACK_ALPHA};
    border-radius:5px;
    border-width:1px;
    width:${WIDTH/10};
    height:${WIDTH/10};
    align-self:center;
    `,
    MessageList:styled.FlatList`
    padding:10px;
    `,
    MessageContainer:styled.View`
    background-color:${WHITE};
    justify-content:center;
    

    `,
    OwnMessageContainer:styled.TouchableOpacity`
    min-height:80;
    border-bottom-width:1px;
    border-color:${BLACK_ALPHA};
    justify-content:center;
    
    `,
    MessageChat:styled.Text`
    font-size:16;
    color:${BLACK_ALPHA};
    width:${WIDTH/1.8};
    left: 70;
    `,
    NameOfChat:styled.Text`
    font-size:20;
    text-align:left;
    font-weight:bold;
    width:${WIDTH/1.5};
    left: 70
    `,
    ChatImage:styled.Image`
    height:40px;
    width:40px;
    position:absolute;
    border-radius:20px;
    `,
    ChatImageButton:styled.TouchableOpacity`
    height:40px;
    width:40px;
    position:absolute;
    left:5;
    border-radius:20px;
    justify-content:center;
    align-items:center;
    `,
    NoMessageView:styled.View`
    flex:1;
    justify-content:center;
    `,
    NomessageText:styled.Text`
    font-size:20;
    align-self:center;
    color:${DARK_APP_COLOR};
    text-align: center;
    `
    

}

export default MessageStyle;