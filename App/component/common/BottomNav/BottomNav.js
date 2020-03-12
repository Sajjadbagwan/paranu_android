import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { DARK_APP_COLOR, APP_COLOR, GOLDEN, BLUE, BLACK, BLACK_ALPHA, SILVER } from '../../constant/Color'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import BottomNavStyle from './BottomNavStyle'

const BottomNav = ({ navigation,checkPreviewState, index, isIphoneXorAbove ,opacityActually}) => (
  <BottomNavStyle.WrapperView style={{ height: isIphoneXorAbove ? 70 : 50,opacity:opacityActually }}>
    <BottomNavStyle.LinkWrapper style={{ marginBottom: isIphoneXorAbove ? 15 : 0 }}>
      <TouchableOpacity
        onPress={() => {
          if(opacityActually==1){
            navigation("TabStackOne",0)
          }
            
        }}
      >
        <BottomNavStyle.IconWrapperView>
          <AntDesign
            color={
              index === 0
                ? DARK_APP_COLOR
                : SILVER
            }
            name="heart"
            size={20}
          />
        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
    <BottomNavStyle.LinkWrapper style={{ marginBottom: isIphoneXorAbove ? 15 : 0 }}>
      <TouchableOpacity
        onPress={() => {
          if(opacityActually==1){
          navigation("TabStackTwo",1)
          }
        }}
      >
        <BottomNavStyle.IconWrapperView>
          <BottomNavStyle.CreateView>
            <FontAwesome
              color={
                index === 1
                  ? DARK_APP_COLOR
                  : SILVER
              }
              name="user"
              size={20}
            />
          </BottomNavStyle.CreateView>
        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
    <BottomNavStyle.LinkWrapper style={{ marginBottom: isIphoneXorAbove ? 15 : 0 }}>
      <TouchableOpacity
        onPress={() => {
          if(opacityActually==1){
          navigation("TabStackThree",2)
          }
        }}
      >
        <BottomNavStyle.IconWrapperView>
         {index === 2?<Image source={require('../../../assets/images/appIconColor.png')} style={{height:30,width:30,borderRadius:15}}/>:
         <Image source={require('../../../assets/images/appIconWhite.png')} style={{height:30,width:30,borderRadius:15}}/>}
              
                
            

        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
    <BottomNavStyle.LinkWrapper style={{ marginBottom: isIphoneXorAbove ? 15 : 0 }}>
      <TouchableOpacity
        onPress={() => {
          if(opacityActually==1){
          navigation("TabStackFour",3)
          }
        }}
      >
        <BottomNavStyle.IconWrapperView>
          <AntDesign
            color={
              index === 3
                ? DARK_APP_COLOR
                : SILVER
            }
            name="message1"
            size={20}
          />

        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>
    <BottomNavStyle.LinkWrapper style={{ marginBottom: isIphoneXorAbove ? 15 : 0 }}>
      <TouchableOpacity
        onPress={() => {
          if(opacityActually==1){
          navigation("TabStackFive",4)
          }
        }}
      >
        <BottomNavStyle.IconWrapperView>
          <Ionicons
            color={
              index === 4
                ? DARK_APP_COLOR
                : SILVER
            }
            name="ios-settings"
            size={20}
          />

        </BottomNavStyle.IconWrapperView>
      </TouchableOpacity>
    </BottomNavStyle.LinkWrapper>

  </BottomNavStyle.WrapperView>
)

export default BottomNav
