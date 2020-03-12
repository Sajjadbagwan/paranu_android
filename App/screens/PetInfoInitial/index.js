import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  View,
  Alert,
  AsyncStorage
} from "react-native";
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from "react-native-picker-select";
import Header from "../../component/common/Header";
import { APP_COLOR,BLACK_ALPHA, WHITE, PLACE_HOLDER_COLOR } from "../../component/constant/Color";
import PetInfoInitialStyle from "./PetInfoInitialStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import axios from "axios";
import ImagePicker from "react-native-image-crop-picker";
import ActivityLoading from "../../component/common/ActivityLoading";
import strings from "../../screens/PetInfoInitial/PetInfoInitialLocalization";
import * as RNLocalize from 'react-native-localize';

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

class PetInfoInitial extends Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};
    this.inputRefs1 = {};
    this.inputRefs2 = {};
    this.inputRefs3 = {};
    this.inputRefs4 = {};

    if(this.props.languageOfApp){
      strings.setLanguage(this.props.languageOfApp)
    }

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
      petAgeType: [
        { label: strings.months, value: "Months" },
        { label: strings.years, value: "Years" }
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
      petName: "",
      birth: "",
      birthDate:"",
      petCategory: "",
      type: "",
      date:"",
      size: "",
      sex: "",
      brief_info: "",
      petImageUri: "",
      loading: false,
      yearOrMonth: "",
      signOutButton: false,
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
    if(this.props.navigation.getParam('recentPath', 'no_id') === 'home'){
      this.setState({ signOutButton: true});
    }

  }

  ImagePickerClick() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.8
    }).then(image => {
      this.setState({ petImageUri: image.path });
    });
  }

  petInfoWithData(params) {
    if (
      this.state.petName.trim() == "" ||
      this.state.date.trim() == "" ||
      this.state.petCategory == "" ||
      this.state.type == "" ||
      this.state.sex == "" ||
      this.state.size == ""
    ) {
      Alert.alert(strings.alert1);
    } else if (this.state.petImageUri == "") {
      Alert.alert(strings.alert2);
    } else {
      var photo = {
        uri: this.state.petImageUri,
        type: "image/jpeg",
        name: "photo.jpg"
      };
      var form = new FormData();
      form.append("petImages", photo);
      form.append("name", this.state.petName);
      form.append("birth", this.state.birth + " "+this.state.yearOrMonth);
      form.append("birthDate", this.state.date);
      form.append("petCategory", this.state.petCategory);
      form.append("type", this.state.type);
      form.append("size", this.state.size);
      form.append("briefInformation", this.state.brief_info);
      form.append("sex", this.state.sex);

      this.petYourInfo(form,params)
    }
  }

  yourPetInfoapiCall(url, data) {
    var token = this.props.userToken;
    return axios
      .create({
        /*baseURL: "http://18.221.104.111/api",*/
        baseURL: "https://api.para.nu/api",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .post(url, data);
  }

  petYourInfo(initialData,params) {
    this.setState({ loading: true });

    this.yourPetInfoapiCall("pet/", initialData)
      .then(response => {
        var recentPathToSend=""
        if(params.recentPath=="profile"){
            recentPathToSend="profileAdd"
        }
        else{
          recentPathToSend=params.recentPath
        }
        this.props.navigation.push("PetULookingFor",{
          petId: response.data._id,
          recentPath:recentPathToSend
        })

      })
      .catch(error => {
        //console.log(error);
        this.setState({ loading: false });
        Alert.alert(strings.alert3);
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <PetInfoInitialStyle.WrapperViewVertical behavior="padding" enabled>
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
          <PetInfoInitialStyle.ScrollView>
            {params.recentPath == "home" ? (
              <Header />
            ) : (
              <Header
                iconName={"arrowleft"}
                iconColor={"white"}
                onPressButton={() => this.props.navigation.goBack()}
              />
            )}
            <Image
              source={require("../../assets/images/paranuImageWork.png")}
              style={{ alignSelf: "center" ,width: 270 , height: 70}}
            />
            <PetInfoInitialStyle.ImagePickerContainer>
              <PetInfoInitialStyle.ImagePickerButton
                onPress={() => {
                  this.ImagePickerClick();
                }}
              >
                {this.state.petImageUri != "" && (
                  <Image
                    source={{ uri: this.state.petImageUri }}
                    style={{
                      height: WIDTH / 2.7,
                      width: WIDTH / 2.7,
                      borderRadius: WIDTH / 5.4
                    }}
                  />
                )}
              </PetInfoInitialStyle.ImagePickerButton>
              <PetInfoInitialStyle.ImagePickerPlusButton
                onPress={() => {
                  this.ImagePickerClick();
                }}
              >
                <AntDesign
                  name="pluscircleo"
                  size={WIDTH / 9.5}
                  color={APP_COLOR}
                  style={{ alignSelf: "center" }}
                />
              </PetInfoInitialStyle.ImagePickerPlusButton>
            </PetInfoInitialStyle.ImagePickerContainer>
            <PetInfoInitialStyle.Textinformation>
              {strings.informationAboutYourPet}
            </PetInfoInitialStyle.Textinformation>
            <PetInfoInitialStyle.InputDetailContainer>
              <PetInfoInitialStyle.TitleEditText>
                {strings.petName}
              </PetInfoInitialStyle.TitleEditText>
              <PetInfoInitialStyle.InPutTextViewStyle>
                <TextInput
                  style={{
                    height: 50,
                    paddingLeft: 5,
                    fontSize: 16,
                    color: "white"
                  }}
                  onChangeText={petName => this.setState({ petName })}
                  value={this.state.petName}
                  placeholder={"Browni"}
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                />
              </PetInfoInitialStyle.InPutTextViewStyle>
              <PetInfoInitialStyle.TitleEditText>
                {strings.BirthDate}

              </PetInfoInitialStyle.TitleEditText>


              <DatePicker
                      style={{width: '100%',color: "#ffffff",fontSize: 16,height: 50,marginTop: 10,borderRadius:10,borderColor:"#ffffff"}}
                      date={this.state.date}
                      mode="date"
                      format="YYYY-MM-DD"
                      placeholder={strings.DatePlace}
                      maxDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          right: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                            borderColor:"#ffffff",
                            borderRadius:10,
                            paddingLeft: 10,
                            alignItems: "flex-start",
                            color:"#ffffff"
                        },


                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {this.setState({date: date});}}
                    />



              <PetInfoInitialStyle.TitleEditText>
                {strings.petCategory}
              </PetInfoInitialStyle.TitleEditText>
              <PetInfoInitialStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selectYourPetCategory,
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
                <PetInfoInitialStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetInfoInitialStyle.DownArrowImage>
              </PetInfoInitialStyle.InPutTextViewStyle>
              <PetInfoInitialStyle.TitleEditText>
                {strings.type}
              </PetInfoInitialStyle.TitleEditText>
              <PetInfoInitialStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selecttypeofyourpet,
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
                <PetInfoInitialStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetInfoInitialStyle.DownArrowImage>
              </PetInfoInitialStyle.InPutTextViewStyle>
              <PetInfoInitialStyle.TitleEditText>
                {strings.size}
              </PetInfoInitialStyle.TitleEditText>
              <PetInfoInitialStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selectSizeOfYourPet,
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
                <PetInfoInitialStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetInfoInitialStyle.DownArrowImage>
              </PetInfoInitialStyle.InPutTextViewStyle>
              <PetInfoInitialStyle.TitleEditText>
                {strings.sex}
              </PetInfoInitialStyle.TitleEditText>
              <PetInfoInitialStyle.InPutTextViewStyle>
                <RNPickerSelect
                  placeholder={{
                    label: strings.selectSexOfYourPet,
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
                <PetInfoInitialStyle.DownArrowImage>
                  <AntDesign name="caretdown" size={18} color={"white"} />
                </PetInfoInitialStyle.DownArrowImage>
              </PetInfoInitialStyle.InPutTextViewStyle>
              <PetInfoInitialStyle.TitleEditText>
                {strings.briefInformation}
              </PetInfoInitialStyle.TitleEditText>
              <PetInfoInitialStyle.BerifeInPutTextViewStyle>
                <TextInput
                  style={{
                    height: 100,
                    paddingHorizontal: 10,
                    fontSize: 16,
                    color: "white"
                  }}
                  onChangeText={brief_info => this.setState({ brief_info })}
                  value={this.state.brief_info}
                  placeholder={strings.tellUsSomethingAboutYourPet}
                  placeholderTextColor={PLACE_HOLDER_COLOR}
                  multiline={true}
                  numberOfLines={4}
                  blurOnSubmit={true}
                  maxLength={100}
                />
              </PetInfoInitialStyle.BerifeInPutTextViewStyle>
              <PetInfoInitialStyle.OptionalText>
                {strings.maximum100Characters}
              </PetInfoInitialStyle.OptionalText>
              <PetInfoInitialStyle.BottomNextButton
                onPress={() => this.petInfoWithData(params)}
              >
                <PetInfoInitialStyle.BottomNextButtonText>
                  {strings.next}
                </PetInfoInitialStyle.BottomNextButtonText>
              </PetInfoInitialStyle.BottomNextButton>
            </PetInfoInitialStyle.InputDetailContainer>

            {this.state.signOutButton && <PetInfoInitialStyle.BottomNextButton
                style={{width: WIDTH-100, alignSelf: 'center'}}
                onPress={() => {
                  AsyncStorage.clear();
                  this.props.navigation.navigate("SignIn")
                }}
              >
                <PetInfoInitialStyle.BottomNextButtonText style={{ fontWeight: 'bold'}}>
                  SIGN OUT
                </PetInfoInitialStyle.BottomNextButtonText>
              </PetInfoInitialStyle.BottomNextButton>}
          </PetInfoInitialStyle.ScrollView>
        </SafeAreaView>
        {this.state.loading&&<ActivityLoading/>}
      </PetInfoInitialStyle.WrapperViewVertical>
    );
  }
}

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
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,


  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetInfoInitial);
// for the drop down gray line we need to make change in the libraray
// go to the nod_modules/react-native-picker-select/src/index.js
// line number 537 change the borderTopColor: to 'transparent'
// means borderTopColor: 'transparent'
