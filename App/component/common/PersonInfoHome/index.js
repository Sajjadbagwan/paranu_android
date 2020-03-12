import React, { Component } from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";

import { BLACK_ALPHA, DARK_APP_COLOR, WHITE, BLACK_ALPHA_FIVE } from "../../constant/Color";
import ImageView from "../ImageView";
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const PersonInfoHome = ({
  imageUri,
  petName,
  userName,
  onOwnerProfileClick,
  terminateClick,
  lan
}) => (
  <TouchableOpacity
    style={{
      position: "absolute",
      height: HEIGHT,
      width: WIDTH,
      alignSelf: "center",
      backgroundColor: BLACK_ALPHA_FIVE,
      justifyContent: "center"
    }}
    onPress={terminateClick}
    activeOpacity={1}
  >
    <TouchableOpacity
      style={{
        height: WIDTH,
        width: WIDTH - 20,
        borderColor: DARK_APP_COLOR,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: WHITE
      }}
      activeOpacity={1}
    >
      <ImageView
        urlImageUri={imageUri}
        customStyle={{
          height: WIDTH / 4,
          width: WIDTH / 4,
          borderRadius: WIDTH / 8,
          alignSelf: "center",
          margin: 5
        }}
        imageType={"external"}
      />
      <View style={{ height: WIDTH / 2 }}>
        <Text
          style={{ color: DARK_APP_COLOR, fontSize: 20, alignSelf: "center" }}
        >
          {petName}
        </Text>
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
            position: "absolute",
            bottom: 60
          }}
        >
          {userName}
        </Text>
      </View>
      <View style={{ height: WIDTH / 4 }}>
        <TouchableOpacity
          style={{
            height: WIDTH / 6,
            backgroundColor: DARK_APP_COLOR,
            width: WIDTH - 50,
            borderRadius: 10,
            borderColor: DARK_APP_COLOR,
            borderWidth: 1,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={onOwnerProfileClick}
        >
          <Text style={{ color: WHITE, fontSize: 20 }}>{lan.ownerprofile}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </TouchableOpacity>
);
export default PersonInfoHome;
