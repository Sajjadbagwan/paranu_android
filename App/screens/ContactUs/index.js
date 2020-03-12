import React, { Component } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';

import {connect} from 'react-redux'
import ContactUsStyle from './ContactUsStyle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Header from '../../component/common/Header'
import { DARK_APP_COLOR } from '../../component/constant/Color'
import strings from "./ContactsLocalization";
import * as RNLocalize from 'react-native-localize';

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height


class ContactUs extends Component {
    constructor(props) {
        super(props)
        if(this.props.languageOfApp){
            strings.setLanguage(this.props.languageOfApp)
          }
        this.state={
            listData:[{
                "name": strings.reportProblem,
                "path": "ReportProblem",
            },
            {
                "name": strings.inquiry,
                "path": "Inquiry",
            }]
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
            <ContactUsStyle.SafeAreaView>
                <ContactUsStyle.WrapperViewVertical>
                     <Header
                     headerText={strings.contactUs}
                     iconName={"arrowleft"}
                     iconColor={"white"}
                     navBarBackgroundColor={DARK_APP_COLOR}
                     onPressButton={()=>this.props.navigation.goBack()}
                     />
                    <ContactUsStyle.TableView bounces={false}
                        data={this.state.listData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <ContactUsStyle.EmptyView>
                                <ContactUsStyle.CellContainerView style={styles.GreyShadow1} onPress={() => this.props.navigation.navigate(item.path)}>
                                    <ContactUsStyle.PointFiveContainerView>
                                        <ContactUsStyle.CellTextStyle>
                                            {item.name}
                                        </ContactUsStyle.CellTextStyle>
                                    </ContactUsStyle.PointFiveContainerView>
                                    <ContactUsStyle.PointTowContainerView>
                                        {item.name != "Distance" && <ContactUsStyle.CellImageContainerView>
                                            <Ionicons name='md-arrow-dropright' size={40} color='grey' />
                                        </ContactUsStyle.CellImageContainerView>}
                                    </ContactUsStyle.PointTowContainerView>
                                </ContactUsStyle.CellContainerView>
                            </ContactUsStyle.EmptyView>
                        }
                    />
                </ContactUsStyle.WrapperViewVertical>
            </ContactUsStyle.SafeAreaView>
        );
    }
}
function mapStateToProps(state, props) {
    return {
    languageOfApp: state.appState.languageOfApp,
    };
}
export default connect(mapStateToProps)(ContactUs);

const styles = StyleSheet.create({
    GreyShadow1: { shadowOffset: { width: 0, height: 1 }, shadowColor: 'grey', shadowOpacity: 0.5 },
});