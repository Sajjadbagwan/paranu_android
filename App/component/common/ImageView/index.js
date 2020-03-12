import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo"; 
const ImageView = ({
  urlImageUri,
  imageType,
  customStyle,
  deleteImage,
  ondeletePress,
  imageLoad,
  loadingCallBack
}) => {
  return (
    <View>

      {imageType == "internal" ? (
        <Image
          source={require("../../../assets/images/cat1.jpeg")}
          style={customStyle}
        />
      ) : imageType == "internalOwn" ? (
        <Image source={urlImageUri} style={customStyle} />
      ) : imageType == "externalFb" ? (
        <Image
          defaultSource={require("../../../assets/images/Profile.png")}
          source={{ uri: urlImageUri }}
          style={customStyle}
        />
      ) : (
        <Image
          onLoadEnd={e => {
            if (imageLoad) {
              loadingCallBack();
            }
          }}
          source={{
            uri:
              "https://s3.us-east-2.amazonaws.com/paranu-public/" + urlImageUri
          }}
          style={customStyle}
        />
      )}
      {deleteImage == true && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: -10,
            top: -5,
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            width: 20
          }}
          onPress={ondeletePress}
        >
          <Entypo name={"circle-with-cross"} color={"red"} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default ImageView;
