import React, { Component } from 'react'
import { View, ActivityIndicator, Dimensions,Text } from 'react-native'
import { BLACK_ALPHA, APP_COLOR, DARK_APP_COLOR, WHITE } from '../../constant/Color';

const HEIGHT = Dimensions.get("screen").height
const WIDTH = Dimensions.get("screen").width

const ActivityLoading = ({textLoading }) => (
    <View style={{ alignContent: 'center', justifyContent: 'center', position: 'absolute', backgroundColor: BLACK_ALPHA, height: HEIGHT, width: WIDTH }}>
        <Text style={{alignSelf:'center',color:WHITE,fontSize:20,padding:15}}>{textLoading}</Text>
        <ActivityIndicator size="large" color={DARK_APP_COLOR} />
    </View>
)
export default ActivityLoading;


