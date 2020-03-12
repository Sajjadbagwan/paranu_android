import React, { Component } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Image, Dimensions, StyleSheet, Text, Platform } from "react-native";
import { connect } from 'react-redux';
import * as RNLocalize from 'react-native-localize';

import IntroductionStyle from "./IntroductionStyle";
import {
  DARK_APP_COLOR,
  SILVER,
  GOLDEN,
  WHITE
} from "../../component/constant/Color";
import strings from "../../screens/Introduction/IntroductionLocalization";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

class Introduction extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      entries: [
        {
          image: require("../../assets/images/dog1.jpeg"),
          firstText: "Paranu ",
          text:
            strings.text1
        },
        {
          image: require("../../assets/images/cat1.jpeg"),
          firstText: strings.are ,
          text:
            strings.text2
        },
        {
          image: require("../../assets/images/gilahri1.jpeg"),
          firstText: strings.swipe ,
          text:
            strings.text3
        },
        {
          image: require("../../assets/images/girgit1.jpeg"),
          firstText: strings.welcome ,
          text:
            strings.text4
        }
      ],
      activeSlide: 0
    };
  }
  componentDidMount() {
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    countryInfo=RNLocalize.getLocales();
                switch (countryInfo[0].languageCode){
      case "sv":
      strings.setLanguage("sv")
      break;
      case "it":
      strings.setLanguage("it")
      break;
      case "fr":
      strings.setLanguage("fr")
      break;
      case "es":
      strings.setLanguage("es")
      break;
      case "de":
      strings.setLanguage("ddr")
      break;
      case "ru":
      strings.setLanguage("ru")
      break;
      case "pt":
      strings.setLanguage("es");
      break;
      case "tt":
      strings.setLanguage("ru");
      break;
      default :
      strings.setLanguage("en")
      break;
    }
  }

  _renderItem({ item, index }) {
    return <IntroductionStyle.WrapperViewVertical />;
  }

  render() {
    return (
      <IntroductionStyle.WrapperViewVertical>
        <IntroductionStyle.SafeAreaView>
          <IntroductionStyle.WrapperViewVertical>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.entries}
              renderItem={({ item }) => (
                <Image source={item.image} style={styles.BackgroundLogoStyle} />
              )}
              style={{ position: "absolute" }}
              sliderWidth={WIDTH}
              itemWidth={WIDTH}
              sliderHeight={HEIGHT}
              itemHeight={HEIGHT}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <IntroductionStyle.BottomView>
              <Image
                source={require("../../assets/images/waveImg.png")}
                style={styles.BottomWaveImageStyle}
              />
              <IntroductionStyle.BottomText>
                <IntroductionStyle.FirstTextColor>
                  {this.state.entries[this.state.activeSlide].firstText}
                </IntroductionStyle.FirstTextColor>
                {this.state.entries[this.state.activeSlide].text}
              </IntroductionStyle.BottomText>
              <IntroductionStyle.PageControllerView>
                <IntroductionStyle.BackButtonView>
                  <IntroductionStyle.NextButtonText2 onPress={() =>{
                     if (this.state.activeSlide >= 1) {
                      this._carousel.snapToPrev();
                      this.setState({
                        activeSlide: this.state.activeSlide - 1
                      });
                    }
                  }
                  }>
                    {this.state.activeSlide >= 1 ? strings.back : ""}
                  </IntroductionStyle.NextButtonText2>
                </IntroductionStyle.BackButtonView>
                <Pagination
                  dotsLength={this.state.entries.length}
                  activeDotIndex={this.state.activeSlide}
                  containerStyle={{ height: WIDTH, alignSelf: "center",position:'absolute',marginLeft:(WIDTH/2)-50,width:100 }}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: DARK_APP_COLOR,
                    marginHorizontal: 2,
                    backgroundColor: DARK_APP_COLOR,
                    alignSelf: "center"
                  }}
                  inactiveDotStyle={{
                    backgroundColor: WHITE
                  }}
                  inactiveDotOpacity={1}
                  inactiveDotScale={1}
                />
                <IntroductionStyle.NextButtonView>
                  <IntroductionStyle.NextButtonText
                  onPress={() => {
                    if (
                      this.state.entries.length - 1 >
                      this.state.activeSlide
                    ) {
                      this._carousel.snapToNext();
                      this.setState({
                        activeSlide: this.state.activeSlide + 1
                      });
                    } else {
                      this.props.navigation.navigate("LoginType");
                    }
                  }}
                  >

                    {this.state.entries.length - 1 > this.state.activeSlide
                      ? strings.next
                      : strings.letsStart}


                  </IntroductionStyle.NextButtonText>
                </IntroductionStyle.NextButtonView>
              </IntroductionStyle.PageControllerView>
            </IntroductionStyle.BottomView>
          </IntroductionStyle.WrapperViewVertical>
        </IntroductionStyle.SafeAreaView>
      </IntroductionStyle.WrapperViewVertical>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    languageOfApp: state.appState.languageOfApp,

  };
}

export default connect(
  mapStateToProps)(Introduction);

const styles = StyleSheet.create({
  BackgroundLogoStyle: {
    position: "absolute",
    height: HEIGHT / 1.2,
    width: WIDTH,
    backgroundColor: "rgba(249,158,158,0.85)"
  },
  BottomWaveImageStyle: {
    position: "absolute",
    // height: WIDTH / 2,
    width: WIDTH,
    bottom: 0,
    height: Platform.OS === 'ios' ? WIDTH/1.9 : WIDTH/1.7,
  }
});
