import React,{Component} from 'react'
import {SafeAreaView,AsyncStorage,TouchableOpacity,Text,Dimensions,Image} from 'react-native';
import { connect } from 'react-redux';
import * as RNLocalize from 'react-native-localize';

import strings from './ParanuInstructionsLocalization'
import { DARK_APP_COLOR, BLACK_ALPHA_FIVE, BLACK_TRANSPARENT, BLACK_ALPHA } from '../../component/constant/Color';

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width

// const imageUri = ""
// const imageUri1 = ""


class ParanuInstructions extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imageUri: "",
            loading: false,
            imageUri1: "",
          };

        if(this.props.languageOfApp){
            strings.setLanguage(this.props.languageOfApp)
          }



    }
    componentDidMount() {
      if(this.props.languageOfApp){
        strings.setLanguage(this.props.languageOfApp)
      }

      countryInfo=RNLocalize.getLocales();
                switch (countryInfo[0].languageCode){
      case "sv":
      this.setState({imageUri :require("../../assets/images/Swedish-02.png")})
      break;
      case "it":
      this.setState({imageUri :require("../../assets/images/Italian-07.png")})
      break;
      case "fr":
      this.setState({imageUri :require("../../assets/images/French-06.png")})
      break;
      case "es":
      this.setState({imageUri :require("../../assets/images/Spanish-05.png")})
      break;
      case "de":
      this.setState({imageUri :require("../../assets/images/German-04.png")})
      break;
      case "ru":
      this.setState({imageUri :require("../../assets/images/Russian-03.png")})
      break;
      case "pt":
      this.setState({imageUri :require("../../assets/images/Spanish-05.png")})
      break;
      case "tt":
      this.setState({imageUri :require("../../assets/images/Russian-03.png")})
      break;
      default :
      this.setState({imageUri :require("../../assets/images/English-01.png")})
      break;
    }
    }



    render(){
        var { params } = this.props.navigation.state;
        return(
            <SafeAreaView style={{flex:1,backgroundColor:BLACK_ALPHA,justifyContent:'center'}}>
                <Image
                style={{
                   height:HEIGHT>800?HEIGHT-20:HEIGHT,
                   width:WIDTH,
                   resizeMode: 'contain'
                }}
                source={ this.state.imageUri }

                />
                <TouchableOpacity
                style={{position:'absolute',
                top:HEIGHT/10,
                left:20,
                justifyContent:'center'}}
                onPress={()=>{if(params.recent=="Setting"){
                    this.props.navigation.pop();
                }
                else{
                    AsyncStorage.setItem("FIRSTTIME","false")
                    this.props.navigation.push("TabNavigator")
                }

                }}>

                <Image style={{height:50,width:50}}
          source={require('../../assets/images/cropedx.gif')}
        />

                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
function mapStateToProps(state, props) {
    return {
      languageOfApp: state.appState.languageOfApp,

    };
  }
export default connect (mapStateToProps) (ParanuInstructions)
