import React, { Component } from "react";
import { connect } from 'react-redux';

import ParanuGuideStyle from "./ParanuGuideStyle";
import Header from "../../component/common/Header";
import { DARK_APP_COLOR } from "../../component/constant/Color";
import strings from './ParanuGuideLocalization';
import * as RNLocalize from 'react-native-localize';
class PranuGuide extends Component {

  constructor(props) {
    super(props);
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp)
    }
  }
  componentDidMount() {
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp)
    }
    countryInfo = RNLocalize.getLocales();
    switch (countryInfo[0].languageCode) {
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
      default:
        strings.setLanguage("en")
        break;
    }
  }

  render() {
    return (
      <ParanuGuideStyle.WrapperViewVertical>
        <Header
          headerText={strings.guide}
          iconName={"arrowleft"}
          iconColor={"white"}
          navBarBackgroundColor={DARK_APP_COLOR}
          onPressButton={() => this.props.navigation.goBack()}
        />
        <ParanuGuideStyle.WrapperInnerView bounces={false}>
          <ParanuGuideStyle.ImageWithTitle
            source={require("../../assets/images/paranuImageWork.png")}
          />
          <ParanuGuideStyle.TitleOverViewText>
            {strings.paranuOverView}
          </ParanuGuideStyle.TitleOverViewText>
          <ParanuGuideStyle.QuestionTitleText>
            {strings.whatIsParanu}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.paranuInfoParagraph1Line1}
            {"\n"}
            {strings.paranuInfoParagraph1Line2}
          </ParanuGuideStyle.DescriptionText>
          <ParanuGuideStyle.QuestionTitleText>
            {strings.question1}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer1Line1}
            {"\n"}
            {strings.answer1Line11}
          </ParanuGuideStyle.DescriptionText>
          <ParanuGuideStyle.QuestionTitleText>
            {strings.question2}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer2}
          </ParanuGuideStyle.DescriptionText>

          <ParanuGuideStyle.QuestionTitleText>
            {strings.question3}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer3}
          </ParanuGuideStyle.DescriptionText>

          <ParanuGuideStyle.QuestionTitleText>
            {strings.question4}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer4}
          </ParanuGuideStyle.DescriptionText>

          <ParanuGuideStyle.QuestionTitleText>
            {strings.question5}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer5}
          </ParanuGuideStyle.DescriptionText>

          <ParanuGuideStyle.QuestionTitleText>
            {strings.question6}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer6}
          </ParanuGuideStyle.DescriptionText>
          <ParanuGuideStyle.QuestionTitleText>
            {strings.question7}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer7}
          </ParanuGuideStyle.DescriptionText>
          {/* <ParanuGuideStyle.QuestionTitleText>
            {strings.question8}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer8}
          </ParanuGuideStyle.DescriptionText> */}
          <ParanuGuideStyle.QuestionTitleText>
            {strings.question9}
          </ParanuGuideStyle.QuestionTitleText>
          <ParanuGuideStyle.DescriptionText>
            {strings.answer10}
          </ParanuGuideStyle.DescriptionText>




        </ParanuGuideStyle.WrapperInnerView>
      </ParanuGuideStyle.WrapperViewVertical>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    languageOfApp: state.appState.languageOfApp
  };
}
export default connect(mapStateToProps)(PranuGuide);
