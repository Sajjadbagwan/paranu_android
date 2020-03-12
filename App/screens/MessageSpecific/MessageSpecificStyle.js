import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK, OFF_WHITE, DARK_APP_COLOR, BLACK_ALPHA } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const MessageSpecificStyle = {
    MainView: styled.View`
    flex:1;
    background-color:${DARK_APP_COLOR}
    `,
    WrapperSafeView: styled.SafeAreaView`
    flex: 1;
    justify-content:flex-end;
    `,
    InnerView: styled.View`
    flex:1;
    background-color:${WHITE};
    `,
    MessageList: styled.FlatList`
    padding:10px;
    margin-top:20;
    `,
    MessageContainer: styled.View`
    background-color:${WHITE};
    padding-vertical:10px;
    `,
    MessageInnerView:styled.View`
    background-color:${WHITE};
    `,
    OwnMessageContainer: styled.View`
    border-radius:10px;
    border-width:1px;
    justify-content:center;
    background-color:${DARK_APP_COLOR};
    align-self:flex-end;
    right:40;
    border-color:${DARK_APP_COLOR}

    `,
    OwnImageContainer: styled.Image`
    border-radius:10px;
    border-width:1px;
    align-self:flex-end;
    right:40;
    width:${WIDTH/2};
    height:${WIDTH/2};
    border-color:${DARK_APP_COLOR}
    `,
    OtherMessageContainer: styled.View`
    background-color:${BLACK_ALPHA};
    border-radius:10px;
    border-width:1px;
    left:40;
    width:${WIDTH/1.5}
    `,
    OtherImageContainer: styled.Image`
    background-color:${BLACK_ALPHA};
    border-color:${DARK_APP_COLOR};
    border-radius:10px;
    border-width:1px;
    left:40;
    width:${WIDTH/2};
    height:${WIDTH/2};
    `,
    MessageChat: styled.Text`
    font-size:16;
    padding-left:40;
    align-self:center;
    color:${WHITE};
    padding:10px;
    width:${WIDTH/1.5};
    text-align:left;
    `,
    OtherChatImage: styled.Image`
    height:30px;
    width:30px;
    border-radius:15px;
    `,
    OtherChatImageButton: styled.TouchableOpacity`
    height:30px;
    width:30px;
    border-radius:15px;
    position:absolute;
    left:5;
    justifyContent:center;
    `,
    NoMessageView: styled.View`
    flex:1;
    justify-content:center;
    `,
    YourChatImage: styled.Image`
    height:30px;
    width:30px;
    right:5;
    position:absolute;
    border-radius:15px;
    `,
    NoMessageView: styled.View`
    flex:1;
    justify-content:center;
    `,
    NomessageText: styled.Text`
    font-size:20;
    align-self:center;
    color:${DARK_APP_COLOR}
    `,
    BottomInputTextContainer: styled.View`
    justify-content:center;
    width:${WIDTH - 20};
    background-color:${BLACK_ALPHA};
    border-radius:15;
    border-width:1;
    align-self:center;
    bottom:5;
    `,
    BottomCameraButton: styled.TouchableOpacity`
    height:40;
    width:50;
    justify-content:center;
    position:absolute;
    align-items:center;
    left:0;
    top:0
    `,
    BottomSendButton: styled.TouchableOpacity`
    height:40;
    width:50;
    justify-content:center;
    align-items:center;
    position:absolute;
    right:0;
    top:0;
    `


}

export default MessageSpecificStyle;