import React, { Component } from 'react'
import ImageView from '../../../component/common/ImageView'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Text, Image, Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width



const Header = ({ headerText, iconName, onPressButton, iconColor, navBarBackgroundColor, onPressRightButton, textRightButton, profileImageUri, rightIconName, rightImageSource, imageType }) => (
    <View style={{ flexDirection: 'row', backgroundColor: navBarBackgroundColor, justifyContent: 'center', width: WIDTH, height: HEIGHT / 15 ,marginBottom:0}}>
        <Text style={styles.NavigationTextStyle}>
            {headerText}
        </Text>
        {iconName ? <TouchableOpacity style={styles.BackButton} onPress={() => onPressButton()}>
            <AntDesign name={iconName} size={30} color={iconColor} />
        </TouchableOpacity> : profileImageUri &&
            <TouchableOpacity style={styles.ProfileImageStyle} onPress={() => onPressButton()}>
            <ImageView
                 urlImageUri={profileImageUri}
                customStyle={styles.ProfileImageStyle} imageType={imageType} />
            </TouchableOpacity>}
        <TouchableOpacity style={styles.RightButton} onPress={() => onPressRightButton()}>
            {textRightButton ? <Text style={styles.RightButtonText}>
                {textRightButton}
            </Text> : rightIconName ? <AntDesign name={rightIconName} size={20} color={iconColor} />:
            rightImageSource && <ImageView
                 urlImageUri={rightImageSource}
                customStyle={{height:30,width:30,resizeMode:"contain"}} imageType={"internalOwn"} />}
        </TouchableOpacity>
    </View>
)
export default Header;

const styles = StyleSheet.create({
    ProfileImageStyle: { height: 30, width: 30, left: 10, position: 'absolute', alignSelf: 'center', borderRadius: 15 },
    NavigationTextStyle: { color: 'white', fontSize: 20, fontWeight: '300', alignSelf: 'center' },
    BackButton: { alignSelf: 'center', left: 10, position: 'absolute' },
    RightButton: { alignSelf: 'center', right: 10, position: 'absolute' },
    RightButtonText: { color: 'white', fontSize: 16, fontWeight: '300', alignSelf: 'center' }
});
