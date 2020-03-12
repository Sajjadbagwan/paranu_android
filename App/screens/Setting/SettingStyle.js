import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import {DARK_APP_COLOR, BLACK_ALPHA, WHITE} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const SettingStyle = {
    WrapperViewVertical: styled.View`
    
    background-color: white;
    border-radius: 5;
    flex: ${Platform.OS === 'ios' && ((HEIGHT === 568 || WIDTH === 320))?0.91 : 1};
    `,
    SafeAreaView: styled.SafeAreaView`
    flex: 1; 
    backgroundColor: ${DARK_APP_COLOR};
    `,
    NavigationBarViewContainer: styled.View`
    width: ${WIDTH};
    background-color: ${DARK_APP_COLOR};
    border-radius: 5;
    justify-content: center;
    height: ${HEIGHT/15};
    `,
    NavigationTextStyle: styled.Text`
    color: white;
    font-size: 22;
    font-weight: 300;
    align-self: center;
    `,
    PointFiveContainerView: styled.View`
    flex: 0.8; 
    justify-content: center;
    `,
    PointTowContainerView: styled.View`
    flex: 0.2; 
    justify-content: center;
    `,
    CellContainerView: styled.TouchableOpacity`
    height: 60;
    align-self: center;
    width: ${WIDTH};
    background-color: white;
    border-radius: 7;
    flex-direction:row;
    margin-top: 5;
    `,
    CellTextStyle: styled.Text`
    color: black;
    font-size: 18;
    font-weight: 300;
    margin-left: 10;
    `,
    CellImageContainerView: styled.View`
    margin-right: 10;
    align-self:flex-end;
    `,
    ScrollView: styled.ScrollView`
    margin-bottom: 50;
    background-color: ${WHITE};
    flex:1;
    `,
    TableView: styled.FlatList`

    `,
    LogOutContainerView: styled.TouchableOpacity`
    flex-direction: row;
    width: ${WIDTH/1.2};
    height: 50;
    margin-top: 10;
    border-radius: 10;
    align-self: center;
    align-items: center;
    background-color: ${DARK_APP_COLOR};
    justify-content: center;
    `,
    LogOutButtonTextStyle: styled.Text`
    color: white;
    font-size: 20;
    align-self: center;
    font-weight: bold;
    left: 10;
    `,
    EmptyView: styled.View`
    `,
    BottomContainer: styled.TouchableOpacity`
    width: ${WIDTH/1.2};
    height: 40;
    margin-top: 10;
    align-self: center;
    justify-content: center;
    `,
    UpgradeButtonTextStyle: styled.Text`
    color: ${DARK_APP_COLOR};
    font-size: 18;
    font-weight: 500;
    align-self: center;
    font-style: italic;
    `,
    DistanceMainView:styled.TouchableOpacity`
    position:absolute;
    height:${HEIGHT};
    width:${WIDTH};
    align-self:center;
    justify-content:center;
    background-color:${BLACK_ALPHA};

    `,
    DistanceInnerContainer:styled.TouchableOpacity`
    height:220;
    width:${WIDTH-40};
    background-color:${WHITE};
    border-color:${DARK_APP_COLOR};
    border-width:1px;
    border-radius:10px;
    align-self:center;
    justify-content:center;
    padding:10px;
    `,
    DistanceAddText:styled.Text`
    color:${DARK_APP_COLOR};
    font-size:20;
    text-align:center;
    `,
    DistanceInnerTopText:styled.Text`
    font-size:20;
    align-self:center;
    `,
    DistanceInputContainerView:styled.View`
    height:40;
    width:90;
    justify-content:center;
    align-self:center;
    align-items:center;
    flex-direction:row;
    border-color:${BLACK_ALPHA};
    border-width:1;
    border-radius:5;
    `,
    KmTextView:styled.Text`
    font-size:12;
    `,

    DistanceAddButton:styled.TouchableOpacity`
    height:50px;
    width:110px;
    border-color:${DARK_APP_COLOR};
    border-radius:10px;
    border-width:1px;
    justify-content:center;
    align-self:center;
    margin-top:5px;
    `,
    AddButtonText:styled.Text`
    color:${DARK_APP_COLOR};
    font-size:20;
    align-self:center;
    `,
    versionContainer: styled.View`
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-top: 30;
    `,

}

export default SettingStyle