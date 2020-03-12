import React, { Component } from "react";
import { Text, Dimensions, View, ScrollView } from "react-native";

import likedislikestyle from "./likedislikestyle";
import ImageView from "../../common/ImageView";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const Likedislike = ({
  myPetImageUri,
  otherPetImageUri,
  sendmessagePress,
  continueSwipePress,
  lan
}) => (
  <likedislikestyle.Maincontainer>
    <ScrollView>
      <View>
        <View>
          <likedislikestyle.Imagelogo
            source={require("../../../assets/images/paranuImageWork.png")}
          />
        </View>
        <MaterialIcons
           name="close"
           size={30}
           color="#ff0000"
           style={{ position: "absolute", right: -7,top:10 ,flex:1}}
           onPress={continueSwipePress}
         />
        <likedislikestyle.Secondcontainer>
          <likedislikestyle.Circle1>
            <ImageView
              urlImageUri={myPetImageUri}
              customStyle={{ height: 125, width: 125, borderRadius: 60 }}
            />
          </likedislikestyle.Circle1>
          <likedislikestyle.Circle2>
            <ImageView
              urlImageUri={otherPetImageUri}
              customStyle={{ height: 125, width: 125, borderRadius: 60 }}
            />
          </likedislikestyle.Circle2>
        </likedislikestyle.Secondcontainer>

        <likedislikestyle.Matchview>
          <likedislikestyle.Match>{lan.itsamatchnawww}</likedislikestyle.Match>
        </likedislikestyle.Matchview>

        <View>
          <likedislikestyle.LikeDislikeContainer1 onPress={sendmessagePress}>
            <likedislikestyle.ButtonTextStyle1>
              {lan.sendmessage}
            </likedislikestyle.ButtonTextStyle1>
          </likedislikestyle.LikeDislikeContainer1>

          <likedislikestyle.LikeDislikeContainer2 onPress={continueSwipePress}>
            <likedislikestyle.ButtonTextStyle2>
              {lan.continueswipping}
            </likedislikestyle.ButtonTextStyle2>
          </likedislikestyle.LikeDislikeContainer2>
        </View>
      </View>
    </ScrollView>
  </likedislikestyle.Maincontainer>
);

export default Likedislike;
