import React, { Component } from 'react'
import {  Alert,Image, Dimensions, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width
import PetsStyle from './PetsStyle'
import Header from '../Header'
import Feather from 'react-native-vector-icons/Feather'
import { DARK_APP_COLOR } from '../../constant/Color';
import Grid from 'react-native-grid-component';


const pets = ({ onItemPress, items,onBackPress,index, lan }) => (
    <View style={{ position: 'absolute', alignSelf: 'center', width: WIDTH, height: HEIGHT, paddingTop: Platform.OS === 'ios' ? 20 : 0 } }>

        <Header
            headerText={lan.selectyourpet}
            iconName={"arrowleft"}
            iconColor={"white"}
            onPressButton={() => onBackPress()}
            navBarBackgroundColor={DARK_APP_COLOR} />
        <PetsStyle.WrapperViewVertical>
            {items.length > 0 &&
                <Grid
                    style={styles.list}
                    data={items}
                    renderItem={(data, i) => (
                        <PetsStyle.PointFiveVerticalView style={styles.BlackShadow} onPress={() => onItemPress(data.index)} key={i}>
                          
                            <PetsStyle.CheckBoxView>
                                {index==data.index&& <Feather name={"check-square"} size={20} color={DARK_APP_COLOR} />}
                            </PetsStyle.CheckBoxView>
                            <PetsStyle.InnerImageContainerView>
                                <Image  source={{uri:"https://s3.us-east-2.amazonaws.com/paranu-public/"+data.petImage[0]}}
                                 style={{ flex: 1, height: undefined, width: undefined }}></Image>
                                 {/* <PetsStyle.InterestText>
                                 {data.interests!="nothing"&&data.interests.map(interest => {
                            return (
                              <PetsStyle.InterestInnerText>
                                {interest}{" "}
                              </PetsStyle.InterestInnerText>
                            );
                          })}
                          </PetsStyle.InterestText> */}
                            </PetsStyle.InnerImageContainerView>
                            <PetsStyle.PetNameView>
                                <PetsStyle.PetNameText>
                                    {data.name}
                                </PetsStyle.PetNameText>
                            </PetsStyle.PetNameView>
                        </PetsStyle.PointFiveVerticalView>
                    )}
                    renderPlaceholder={this._renderPlaceholder}
                    itemsPerRow={2}
                />}
        </PetsStyle.WrapperViewVertical>
    </View>
)
export default pets;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        height: 160,
        margin: 1
    },
    list: {
        flex: 1,
    },
    BackButtonImageStyle: { height: 25, width: 50 },
    BackButtonStyle: { alignSelf: 'center', left: 10, position: 'absolute' },
    BlackShadow: { shadowOffset: { width: 0.5, height: 1 }, shadowColor: DARK_APP_COLOR, shadowOpacity: 0.35 },
});