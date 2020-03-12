import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
  View
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { connect } from 'react-redux';

import Header from "../../component/common/Header";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;
import PetULookingForStyle from "./PetULookingForStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { PLACE_HOLDER_COLOR } from "../../component/constant/Color";
import strings from "../../screens/PetULookingFor/PetULookingForLocalization";
import * as RNLocalize from 'react-native-localize';

//import strings from './PetULookingForLocalization'
class PetULookingFor extends Component {
  constructor(props) {
    super(props);
    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }
    this.inputRefs = {};
    this.inputRefs1 = {};
    this.inputRefs2 = {};
    this.inputRefs3 = {};

    this.state = {
      petCategoryList: [
        { label: strings.bird, value: "Bird" },
        { label: strings.cat, value: "Cat" },
        { label: strings.cattle, value: "Cattle" },
        { label: strings.dog, value: "Dog" },
        { label:strings.fish, value: "Fish" },
        { label:strings.horse, value: "Horse" },
        { label:strings.miniPig, value: "Mini pig" },
        { label:strings.rabbit, value: "Rabbit" },
        { label:strings.rodent, value: "Rodent" },
        { label:strings.reptile, value: "Reptile" },
        { label:strings.other, value: "Other" }
      ],
      petTypeList: [
        { label:strings.crossBreed, value: "Crossbreed" },
        { label:strings.pureBreed, value: "Purebred" },
        { label:strings.dontKnow, value: "Don't Know" }
      ],
      petSizeList: [
        { label:strings.small, value: "Small" },
        { label:strings.medium, value: "Medium" },
        { label: strings.big, value: "Big" },
        { label:strings.dosntMetter, value: "Doesn't matter" }
      ],
      petSexList: [
        { label: strings.male, value: "Male" },
        { label:strings.female, value: "Female" },
        { label:strings.dosntMetter, value: "Doesn't matter" }
      ],
      petCategory: "",
      type: "",
      size: "",
      sex: ""
    };
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
  
  callNextButton(params) {
    if (
      this.state.petCategory == "" || this.state.petCategory == "Select category of pet" ||
      this.state.type == "" || this.state.type == "Select category of pet" ||
      this.state.size == "" || this.state.size == "Select category of pet" ||
      this.state.sex == "" || this.state.sex == "Select category of pet"
    ) {
      Alert.alert(strings.alert1);
    } else {
      var people = {
        petCategory: this.state.petCategory,
        type: this.state.type,
        size: this.state.size,
        sex: this.state.sex
      };
        this.props.navigation.navigate("Interest", {
          dataToSend: people,
          petId: params.petId,
          recentPath:params.recentPath
        }); 
      }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <PetULookingForStyle.WrapperViewVertical>
        <Image
          source={require("../../assets/images/CatBackground.jpeg")}
          style={{
            position: "absolute",
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: "rgba(249,158,158,0.85)"
          }}
        />
        <View
          style={{
            position: "absolute",
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: "rgba(248,110,118,0.7)"
          }}
        />
        <SafeAreaView>
          <PetULookingForStyle.ScrollView bounces={false}>
            {params.recentPath=="profile"?<Header
              iconName={"arrowleft"}
              iconColor={"white"}
              onPressButton={() => this.props.navigation.goBack()}
            />:null}
            <Image
              source={require("../../assets/images/paranuImageWork.png")}
              style={{ alignSelf: "center", width: 270 , height: 70, marginTop: 20}}
            />
            <PetULookingForStyle.Textinformation>
              {strings.whatAreYouLookingFor}
            </PetULookingForStyle.Textinformation>
            <PetULookingForStyle.InputDetailContainer>
              <PetULookingForStyle.TitleEditText>
                {strings.petCategory}
              </PetULookingForStyle.TitleEditText>
              <PetULookingForStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selectcategoryofpet,
                    value: null,
                    color: "#000000"
                  }}
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                  hideIcon={true}
                  items={this.state.petCategoryList}
                  onValueChange={value => {
                    this.setState({
                      petCategory: value
                    });
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.petCategory}
                  ref={el => {
                    this.inputRefs.picker = el;
                  }}
                />
                <PetULookingForStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetULookingForStyle.DownArrowImage>
              </PetULookingForStyle.InPutTextViewStyle>
              <PetULookingForStyle.TitleEditText>
                {strings.type}
              </PetULookingForStyle.TitleEditText>
              <PetULookingForStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selecttypeofpet,
                    value: null,
                    color: "#000000"
                  }}
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                  hideIcon={true}
                  items={this.state.petTypeList}
                  onValueChange={value => {
                    this.setState({
                      type: value
                    });
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.petType}
                  ref={el => {
                    this.inputRefs1.picker = el;
                  }}
                />
                <PetULookingForStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetULookingForStyle.DownArrowImage>
              </PetULookingForStyle.InPutTextViewStyle>
              <PetULookingForStyle.TitleEditText>
                {strings.size}
              </PetULookingForStyle.TitleEditText>
              <PetULookingForStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selectsizeofpet,
                    value: null,
                    color: "#000000"
                  }}
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                  hideIcon={true}
                  items={this.state.petSizeList}
                  onValueChange={value => {
                    this.setState({
                      size: value
                    });
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.size}
                  ref={el => {
                    this.inputRefs2.picker = el;
                  }}
                />
                <PetULookingForStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetULookingForStyle.DownArrowImage>
              </PetULookingForStyle.InPutTextViewStyle>
              <PetULookingForStyle.TitleEditText>
                {strings.sex}
              </PetULookingForStyle.TitleEditText>
              <PetULookingForStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selectsexofpet,
                    value: null,
                    color: "#000000"
                  }}
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                  hideIcon={true}
                  items={this.state.petSexList}
                  onValueChange={value => {
                    this.setState({
                      sex: value
                    });
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.sex}
                  ref={el => {
                    this.inputRefs3.picker = el;
                  }}
                />
                <PetULookingForStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetULookingForStyle.DownArrowImage>
              </PetULookingForStyle.InPutTextViewStyle>
              <PetULookingForStyle.BottomNextButton
                onPress={() => this.callNextButton(params)}
              >
                <PetULookingForStyle.BottomNextButtonText>
                  {strings.next}
                </PetULookingForStyle.BottomNextButtonText>
              </PetULookingForStyle.BottomNextButton>
            </PetULookingForStyle.InputDetailContainer>
          </PetULookingForStyle.ScrollView>
        </SafeAreaView>
      </PetULookingForStyle.WrapperViewVertical>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "white",
    height: 50,
    paddingLeft: 10
  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderRadius: 4,
    color: "white"
  }
});
function mapStateToProps(state, props) {
  return {
    languageOfApp: state.appState.languageOfApp,

  };
}

export default connect(mapStateToProps) (PetULookingFor);
