import React, { Component } from "react";
import { connect } from 'react-redux';
import * as RNLocalize from 'react-native-localize';

import TermConditionsStyle from "./TermConditionsStyle";
import Header from "../../component/common/Header";
import { DARK_APP_COLOR, WHITE } from "../../component/constant/Color";
import strings from './TermConditionsLocalization'

 class TermCondition extends Component {

  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
  }
  componentDidMount(){
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

  render() {
    return (
      <TermConditionsStyle.WrapperViewVertical>
        <Header
          headerText={strings.termAndConditions}
          iconName={"arrowleft"}
          iconColor={WHITE}
          navBarBackgroundColor={DARK_APP_COLOR}
          onPressButton={() => this.props.navigation.goBack()}
        />
        <TermConditionsStyle.WrapperInnerView bounces={false}>
          <TermConditionsStyle.DescriptionText>
          {strings.paragraph1}
          {"\n"}{"\n"}

          {strings.paragraph2Line1}
          </TermConditionsStyle.DescriptionText>
          <TermConditionsStyle.ImageWithTitle
            source={require("../../assets/images/paranuImageWork.png")}
          />
          <TermConditionsStyle.DescriptionText>
          {strings.paragraph2Line2} 
           {"\n"}{"\n"}
           {strings.paragraph2Line3}
           {"\n"}
            {"\n"}
            {strings.paragraph2Line4} 
           {"\n"}{"\n"}
           {strings.paragraph2Line5}
           {"\n"}
            {"\n"}
            {strings.paragraph2Line6}
            {"\n"}
             {"\n"}{strings.paragraph2Line7} 
             {"\n"}
             {"\n"}{strings.paragraph2Line8} 
          </TermConditionsStyle.DescriptionText>
        </TermConditionsStyle.WrapperInnerView>
      </TermConditionsStyle.WrapperViewVertical>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    languageOfApp: state.appState.languageOfApp,
    
  };
}
export default connect(mapStateToProps)(TermCondition)
