import React from "react";
import { View, TouchableOpacity, Text, TextInput, Dimensions, Platform, StyleSheet, Button, Keyboard, Alert } from 'react-native'

import { BLACK_ALPHA, WHITE, BLACK, APP_COLOR, DARK_APP_COLOR } from "../../constant/Color";


const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

const PromoCodes = ({ textInputCallBack, promoText, submitWithPromCode, cancell, lan }) =>
        (<View
                style={{
                        height: HEIGHT,
                        width: WIDTH,
                        justifyContent: 'center',
                        position: 'absolute',
                        backgroundColor: BLACK_ALPHA
                }}>
                <Text
                        style={{
                                fontSize: 25,
                                marginVertical: 15,
                                color: WHITE,
                                alignSelf: 'center',
                        }}>
                        {lan.havepromocode}
   </Text>
                <TextInput
                        style={{
                                height: 50,
                                width: WIDTH,
                                fontSize: 25,
                                justifyContent: 'center',
                                borderColor: WHITE,
                                backgroundColor: WHITE,
                                borderRadius: 15,
                                borderWidth: 1,
                                textAlign: 'center'
                        }}
                        onChangeText={(text) => textInputCallBack(text)}
                        value={promoText}
                        maxLength={7}
                />
                <View style={{flexDirection: "row",justifyContent: "center"}}>
                
                <TouchableOpacity onPress={submitWithPromCode}
                        style={{ height: 60, alignSelf: 'center', marginVertical: 20, borderRadius: 15, backgroundColor: DARK_APP_COLOR, padding: 15 }}
                >
                        <Text style={{ alignSelf: 'center', fontSize: 25, textAlign: 'center', color: WHITE }}>
                                {lan.submit}
           </Text>
                </TouchableOpacity>
                
                <View style={{marginLeft: 20}}>
                <TouchableOpacity onPress={cancell}
                        style={{ height: 60, alignSelf: 'center', marginVertical: 20, borderRadius: 15, backgroundColor: DARK_APP_COLOR, padding: 15 }}
                >
                        <Text style={{ alignSelf: 'center', fontSize: 25, textAlign: 'center', color: WHITE }}>
                                {lan.cancel}
           </Text>
                </TouchableOpacity>
                
                </View>
                </View>
        </View>)

export default PromoCodes;
