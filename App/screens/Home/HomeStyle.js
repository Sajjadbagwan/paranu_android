import styled from 'styled-components'
import { Dimensions, Platform, PixelRatio } from 'react-native'
import { WHITE, APP_COLOR, BLACK, DARK_APP_COLOR, WHITE_Caream, BLUE_APP_COLOR } from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const HomeStyle = {
    WrapperViewVertical: styled.View`
    flex: 1;
    background-color: ${WHITE};
    padding-top:0;
    position:relative;

    `,
    ImageContainerView: styled.View`
    height:${HEIGHT/2.3};
    width:100%;
    margin-bottom:0;
    `,
    BottomContainer: styled.View`
    position:relative;
    background-color:red;
    `,
    ContentTextView: styled.View`

    margin-top:10;
    position:relative;
    z-index:-1;
    `,

    TitlesContainerView: styled.View`
    min-height:${WIDTH/15};
    align-items: center;
    flex-direction:row;
    `,
    RightTextContainerView: styled.View`
    min-height:${WIDTH/15};
    width: ${WIDTH/2.3}
    `,
    RightTitlesTextStyle: styled.Text`
    color: ${DARK_APP_COLOR};
    align-self: flex-end;
    margin-right:8;
    font-size: ${WIDTH/22};
    /* font-size: ${ 36 / PixelRatio.get()}; */
    `,
    LeftTitlesTextStyle: styled.Text`
    margin-right:20;
    font-size: ${WIDTH/22};
    /*font-size: 12;*/
    color: ${BLACK};
    width:${WIDTH/2.5}
    `,
    BottomContainerView: styled.View`
    position: absolute;
    bottom: ${Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?60 : 55};
    align-self: center;
    align-items: center;
    flex-direction: row;
    height:${HEIGHT/10};
    bottom:${HEIGHT/10};
    `,
    BottomContainerViewCounter: styled.View`
    position: absolute;
    bottom: ${Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?60 : 55};
    align-self: flex-end; 
    flex-direction: row;
    height:${HEIGHT/10};
    bottom:${HEIGHT/10};
    `,
    LikeAndDislikeButton:styled.TouchableOpacity`
    align-self:center;
    justify-content: center;
    align-items: center;
    margin-left: 15;
    margin-right: 15;
    height:${HEIGHT/12};
    width:${HEIGHT/12};
    border-radius: ${HEIGHT/24};
    `,
    HorizontalView: styled.View`
    flex:1;
    align-items:center;
    flex-direction:row;
    background-color:${WHITE};
    `,
    MessageText: styled.Text`
    font-size:20;
    text-align:center;
    flex:1;
    color:${DARK_APP_COLOR};
    `,
    CrousalView:styled.View`
    height:${HEIGHT/2.3};
    width:100%;
    align-self: center;

    `,
    SearchView:styled.SafeAreaView`
    position:absolute;
    height:${HEIGHT};
    width:${WIDTH};
    background-color:${WHITE_Caream};

    `,
    SearchTopInputContainer:styled.View`
    height:${WIDTH/4};
    width:${WIDTH};
    padding-left:10px;
    background-color:${WHITE};
    justify-content:center;
    `,
    SearchInputInnerContainer:styled.View`
    height:${WIDTH/8};
    width:${WIDTH-100};
    background-color:${WHITE_Caream};
    border-radius:10px;
    border-width:1px;
    border-color:${WHITE_Caream};
    justify-content:center;

    `,
    CancelButton:styled.TouchableOpacity`
    position:absolute;
    right:10;
    justify-content:center;
    `,
    CancelText:styled.Text`
    color:${BLUE_APP_COLOR};
    align-self:center;
    font-size:20;
    `,
    SearchFlatlist:styled.FlatList`
    padding:10px;
    `,
    SearchIndicator:styled.View`
    height:50px;
    width:${WIDTH};
    justify-content:center;
    align-items:center;
    position:absolute;
    top:${WIDTH/4};
    align-self:center;
    `,
    SearchPersonView:styled.TouchableOpacity`
    height:40px;
    width:${WIDTH};
    padding-horizontal:10px;
    justify-content:center;
    `,

    AddButtonButtonView:styled.View`
    height:30px;
        width:${WIDTH};
        align-items: center;
        margin-bottom:10px;

        `,
        AddPetButton:styled.TouchableOpacity`
          position:absolute;
          z-index:0;
          align-items: center;
          margin-top: 15;
          height:30px;
          justify-content:center;
          border-radius:15px;
          border-width:1;
          border-color:${DARK_APP_COLOR};
          background-color:${DARK_APP_COLOR};
        `,
         Textinformation: styled.Text`
            color:${WHITE};
            font-size:15px;
            font-weight:bold;
            align-self:center;
            text-align:center;
            padding-left:10px;
            padding-right:10px;
            `,


    SearchPersonText:styled.Text`
    color:${DARK_APP_COLOR};
    font-size:20;
    `



}

export default HomeStyle
