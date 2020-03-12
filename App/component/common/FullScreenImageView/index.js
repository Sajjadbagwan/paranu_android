import { Image, TouchableOpacity, Dimensions } from "react-native";
import { BLACK_ALPHA } from "../../constant/Color";
import React, { Component } from "react";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const FullScreenImageView = ({ imageUri, closePressed,completeUri }) => (
  <TouchableOpacity
    style={{
      height: HEIGHT,
      width: WIDTH,
      alignSelf: "center",
      position: "absolute",
      backgroundColor: BLACK_ALPHA,
      justifyContent: "center"
    }}
    activeOpacity={1}
    onPress={closePressed}
  >
    <TouchableOpacity
    style={{height: HEIGHT - HEIGHT/2, width: WIDTH,justifyContent:'center'}}
     activeOpacity={1}>
     {completeUri? <Image
        source={{
          uri: imageUri
        }}
        style={{ height: HEIGHT/2, width: WIDTH }}
      />:<Image
        source={{
          uri: "https://s3.us-east-2.amazonaws.com/paranu-public/" + imageUri
        }}
        style={{ height: HEIGHT/2, width: WIDTH }}
      />}
    </TouchableOpacity>
  </TouchableOpacity>
);

export default FullScreenImageView;
