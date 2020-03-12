import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import {DARK_APP_COLOR,OFF_WHITE, WHITE, BLACK} from '../../component/constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const ContactUsStyle = {
    WrapperViewVertical: styled.View`
    background-color:${OFF_WHITE};
    flex: 1;
    `,
    SafeAreaView: styled.SafeAreaView`
    flex: 1; 
    backgroundColor: ${DARK_APP_COLOR};
    `,
    NavigationBarViewContainer: styled.View`
    width: ${WIDTH};
    background-color: ${DARK_APP_COLOR};
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
    background-color: ${WHITE};
    border-radius: 7;
    flex-direction:row;
    margin-top: 5;
    `,
    CellTextStyle: styled.Text`
    color: ${BLACK};
    font-size: 18;
    font-weight: 300;
    align-self:flex-start;
    margin-left: 10;
    `,
    CellImageContainerView: styled.View`
    margin-right: 10;
    align-self:flex-end;
    `,
    TableView: styled.FlatList`
    padding-top:10px;
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

}

export default ContactUsStyle