import styled from 'styled-components'
import { Dimensions, Platform } from 'react-native'
import { WHITE, APP_COLOR, BLACK, DARK_APP_COLOR, BLACK_ALPHA, PLACE_HOLDER_COLOR } from '../../constant/Color'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width
const NewHeight = Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?HEIGHT-75 : HEIGHT-50
const newInnerviewHeight=Platform.OS === 'ios' && ((HEIGHT === 812 || WIDTH === 812)||(HEIGHT === 896 || WIDTH === 896))?HEIGHT-180 : HEIGHT-100



const likedislikestyle = {
WrapperViewVertical: styled.View`
background-color: ${WHITE};
height:${NewHeight}
`,


Imagelogo: styled.Image`
margin-bottom:50;
justify-content: center;
align-items: center;
width:270;
height:70;

`,

Maincontainer: styled.View`
position:absolute;
background-color: ${BLACK_ALPHA}; 
height:${HEIGHT};
width:${WIDTH};
margin-bottom:60;
justify-content: center;
align-items: center;
`,

Secondcontainer: styled.View`
justify-content:center;
flexDirection:row;
margin-bottom:20;
justify-content: center;
align-items: center;
`,

ButtonTextStyle1: styled.Text`
color:#000000;
font-size: 20;
align-self:center;
font-weight: bold;
left:10;
`,

ButtonTextStyle2: styled.Text`
color:#fff;
font-size: 20;
align-self:center;
font-weight: bold;
left:10;
`,

Matchview: styled.View` 
justify-content: center;
align-items: center;
`,

Match: styled.Text`
color:${DARK_APP_COLOR}; 
font-size:27;
font-family:cochin;
justify-content: center;
align-items: center;
font-weight:bold;
`,

LikeDislikeContainer1:styled.TouchableOpacity`
padding-Horizontal: 77;
height: 50;
border-radius: 10;
align-self: center;
align-Items: center;
background-color:${WHITE};
margin-top: 20;
justify-content: center;
border-radius:10;
`,

LikeDislikeContainer2:styled.TouchableOpacity`
padding-Horizontal: 60;
height: 50;
border-radius: 10;
align-self: center;
align-Items: center;
background-color:${BLACK_ALPHA};
margin-top: 20;
justify-content: center;
border-radius:10;
`,    
Circle1:styled.View`
border-width:1;
border-color:rgba(0,0,0,0.2);
align-items:center;
justify-content:center;
width:130;
height:130;
background-color:#fff;
border-radius:70;
margin-right:40;
`, 
Circle2:styled.View`
border-width:1;
border-color:rgba(0,0,0,0.2);
align-items:center;
justify-content:center;
width:130;
height:130;
background-color:#fff;
border-radius:70;
`, 

}
export default likedislikestyle