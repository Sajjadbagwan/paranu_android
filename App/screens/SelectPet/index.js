import React, { Component } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  Dimensions,
  SafeAreaView
} from "react-native";
import Grid from "react-native-grid-component";

import Header from "../../component/common/Header";
import SelectPetStyle from "./SelectPetStyle";
import Feather from "react-native-vector-icons/Feather";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions"; //Import your actions
import { DARK_APP_COLOR } from "../../component/constant/Color";
import ImageView from "../../component/common/ImageView";
import strings from "../../screens/SelectPet/SelectPetLocalization";
import * as RNLocalize from 'react-native-localize';
import ParanuLog from "../../Helper/ParanuLog";
//import strings from './SelectPetLocalization'

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

var allPets = [];
class SelectPet extends Component {
  constructor(props) {
    super(props);
    if (this.props.languageOfApp) {
      strings.setLanguage(this.props.languageOfApp)
    }
    this.state = {
      allPets: []
    };
  }

  componentDidMount() {
    ParanuLog.info('this is not working or yes')
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
    allPets = [];
    this.props.yourPetInfo.forEach((petD, index) => {
      pet = {};
      pet.image = petD.petImages;
      if (petD.interest) {
        pet.interest = petD.interest.interests;
      }

      pet.name = petD.name;
      pet.index = index;
      allPets.push(pet);
      this.setState({ allPets: allPets });

      //design  issue when pet list is odd
      if (index == this.props.yourPetInfo.length - 1) {
        pet = {};
        pet.image = petD.petImages;
        if (petD.interest) {
          pet.interest = petD.interest.interests;
        }
        pet.name = petD.name;
        pet.index = this.props.yourPetInfo.length;
        allPets.push(pet);
        this.setState({ allPets: allPets });
      }
    });
  }

  toggleCallFunc(i) {
    this.props.setIndexOfPet(i);
    AsyncStorage.setItem("PET_INDEX", i.toString());
    this.props.navigation.goBack();
  }

  _renderPlaceholder = i => <View style={styles.item} key={i} />;

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: DARK_APP_COLOR }}>
        <Header
          headerText={strings.selectYourPet}
          iconName={"arrowleft"}
          iconColor={"white"}
          onPressButton={() => this.props.navigation.goBack()}
          navBarBackgroundColor={DARK_APP_COLOR}
        />
        <SelectPetStyle.WrapperViewVertical>
          {this.state.allPets != null && (
            <Grid
              style={styles.list}
              data={this.state.allPets}
              renderItem={(data, i) => (
                <SelectPetStyle.MainInnerView>
                  {this.props.yourPetInfo.length != data.index ? (
                    <SelectPetStyle.PointFiveVerticalView
                      style={styles.BlackShadow}
                      onPress={() => this.toggleCallFunc(data.index)}
                      key={i}
                    >
                      <SelectPetStyle.CheckBoxView>
                        {this.props.indexOfPet == data.index && (
                          <Feather
                            name={"check-square"}
                            size={20}
                            color={DARK_APP_COLOR}
                          />
                        )}
                      </SelectPetStyle.CheckBoxView>
                      <SelectPetStyle.InnerImageContainerView>
                        <ImageView
                          customStyle={{
                            height: WIDTH / 4,
                            width: WIDTH / 4,
                            alignSelf: "center",
                            borderWidth: 1,
                            borderColor: DARK_APP_COLOR,
                            borderRadius: 10
                          }}
                          urlImageUri={data.image[0]}
                          imageType={"externel"}
                        />
                        <SelectPetStyle.InterestText>
                          {data.interest && data.interest.map(data => {
                            return (
                              <SelectPetStyle.InterestInnerText>
                                {data == 'Mate' ? strings.mate : data == 'Walk' ? strings.walk : data == 'Meet' ? strings.meet : data == 'Talk' ? strings.talk : strings.sit}{' '}
                              </SelectPetStyle.InterestInnerText>
                            );
                          })}
                        </SelectPetStyle.InterestText>
                      </SelectPetStyle.InnerImageContainerView>
                      <SelectPetStyle.PetNameView>
                        <SelectPetStyle.PetNameText>
                          {data.name}
                        </SelectPetStyle.PetNameText>
                      </SelectPetStyle.PetNameView>
                    </SelectPetStyle.PointFiveVerticalView>
                  ) : (
                      <SelectPetStyle.EmptyView />
                    )}
                </SelectPetStyle.MainInnerView>
              )}
              renderPlaceholder={this._renderPlaceholder}
              itemsPerRow={2}
            />
          )}
        </SelectPetStyle.WrapperViewVertical>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  list: {
    flex: 1
  },
  BackButtonImageStyle: { height: 25, width: 50 },
  BackButtonStyle: { alignSelf: "center", left: 10, position: "absolute" },
  BlackShadow: {
    shadowOffset: { width: 0.5, height: 1 },
    shadowColor: DARK_APP_COLOR,
    shadowOpacity: 0.35
  }
});
function mapStateToProps(state, props) {
  // console.log(state)
  return {
    yourPetInfo: state.pet.yourPetDetail,
    indexOfPet: state.pet.petIndex,
    languageOfApp: state.appState.languageOfApp,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPet);
