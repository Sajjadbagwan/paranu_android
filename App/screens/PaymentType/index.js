import React, { Component } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Image, Dimensions, StyleSheet, Text, Alert, View ,Keyboard} from 'react-native';
import PaymentTypeStyle from './PaymentTypeStyle';
import { DARK_APP_COLOR, SILVER, GOLDEN, WHITE } from '../../component/constant/Color'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../component/common/Header'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import Route from '../../network/route'
import { url, stripePublicApiKey, urlForStripePay } from '../../component/constant/Url'
import Stripe from 'react-native-stripe-api'
import ActivityLoading from '../../component/common/ActivityLoading'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import PromoCodes from '../../component/common/PromoCode';
import * as RNLocalize from 'react-native-localize';
import strings from './PaymentTypeLocalization'



const route = new Route(url)
const routeForStripePay = new Route(urlForStripePay)
const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width
var planList = ''



class PaymentType extends Component {

    _onChange = (FormData) => (this.setState({ cardNumber: FormData.values.number, expiry: FormData.values.expiry, cvc: FormData.values.cvc }));
    _onFocus = (field) => console.log("focusing", field);

    constructor(props) {
        super(props)
        if(this.props.languageOfApp){
            strings.setLanguage(this.props.languageOfApp)
          }
        this.getAllPlansList()
        this.state = {

            entries: [
                { title: strings.standard, topViewColor: DARK_APP_COLOR, addProLimitText: `1-3 ${strings.profiles}`, values: [{ price: "99", index: 0,title: strings.standard }, { price: "69", index: 1 ,title: strings.standard}, { price: "49", index: 2 ,title: strings.standard}] }
                , { title: strings.silver, topViewColor: SILVER, addProLimitText: `4-10 ${strings.profiles}`, values: [{ price: "199", index: 3 ,title: strings.silver}, { price: "159", index: 4,title: strings.silver }, { price: "99", index: 5,title: strings.silver }] }
                , { title: strings.gold, topViewColor: GOLDEN, addProLimitText: strings.unlimitedProfiles, values: [{ price: "499", index: 6,title: strings.gold }] }],
             activeSlide: 0,
            plansList: '',
            loading: true,
            cardNumber: '',
            cvc: '',
            expiry: '',
            cardPopUp: false,
            id: '',
            Subscribed_month:"",
            Subscribed_plan:'',
            promotion_code:'',
            promo_code_Pop_up:false,
            promoCodePlaceHolder: strings.yes

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

    payment(id) {
        if (this.state.cardNumber.replace(/\s/g, '').length < 16) {
            Alert.alert(strings.alert1)
        } else if (this.state.expiry == '') {
   alert2:"please enter your card expiry date",
            Alert.alert(strings.alert2)
        } else if (this.state.cvc.length < 3) {
            Alert.alert(strings.alert3)
        } else {
            this.setState({ loading: true })

            const client = new Stripe(stripePublicApiKey);

            // Create a Stripe token with new card infos
            client.createToken({
                number: this.state.cardNumber.replace(/\s/g, ''),
                exp_month: this.state.expiry.substring(0, this.state.expiry.length - 3),
                exp_year: this.state.expiry.substring(3),
                cvc: this.state.cvc,
            }).then((x) => {
                if (x.error) {
                    this.setState({ loading: false })
                    Alert.alert(JSON.stringify(x.error.code))
                } else {
                    var token = this.props.userToken
                    var data={}
                    if(this.state.promoCodePlaceHolder === strings.yes){
                     data = { stripeEmail: this.props.userDetail.email, stripeToken: x.id, plan_id: id  }
                    }
                    else{
                         data = { stripeEmail: this.props.userDetail.email, stripeToken: x.id, plan_id: id, promo_code: this.state.promoCodePlaceHolder  }
                    }
                    routeForStripePay.updateData("payment/charge", data, token).then(async (response) => {
                        if (response.error) {
                            this.setState({ loading: false })
                            Alert.alert(JSON.stringify(response.error.message))
                        }
                        else {

                            Alert.alert(strings.alert4 +" "+ this.state.Subscribed_month+" "+this.state.Subscribed_plan+ strings.successPlan)
                            this.setState({ cardNumber: '', expiry: '', cvc: '', cardPopUp: false, loading: false })

                        }
                    })
                }

            }).catch((e) => {
                this.setState({ loading: false })
                Alert.alert(JSON.stringify("error" + e))
            })
        }
    }

    checkPromoCode(){
        this.setState({loading:true})
        param={code:this.state.promotion_code}
        route.sendMessage("promo/verificationPromoCode", param, this.props.userToken)
        .then(async (response) => {
            this.setState({loading:false})
            if(JSON.stringify(response) === "true"){

                this.setState({ promoCodePlaceHolder: this.state.promotion_code, promo_code_Pop_up: false,promotion_code:'' })
                Alert.alert(strings.codeisvalidd)
            }
            else{
               Alert.alert(strings.codeisnotnalidd)
            }

        })
    }

    getAllPlansList() {
        var token = this.props.userToken

        route.getAuthenticated("product_config", token)
            .then(async (response) => {
                if (response.error) {
                    this.setState({ loading: false })
                    Alert.alert(strings.failed)
                }
                else {
                    this.setState({ loading: false })
                    planList = response.plans
                    this.setState({ plansList: response.plans })
                }
            })
    }

    render() {
        return (
            <PaymentTypeStyle.WrapperViewVertical>
                <Image source={require('../../assets/images/CatBackground.jpeg')} style={styles.BackgroundLogoStyle} />
                <View style={{position:'absolute', height: HEIGHT, width: WIDTH, backgroundColor: 'rgba(248,110,118,0.7)'}}></View>
                {this.state.plansList != '' && <PaymentTypeStyle.SafeAreaView>
                    <Header
                        iconName={"arrowleft"}
                        iconColor={"white"}
                        onPressButton={() => this.props.navigation.goBack()}
                    />
                    <PaymentTypeStyle.WrapperViewHorizontal>
                        <Image source={require("../../assets/images/paranuImageWork.png")} style={styles.LogoWithTitle}  />
                    </PaymentTypeStyle.WrapperViewHorizontal>
                    <PaymentTypeStyle.PaymentViewTopTitle>
                        {strings.payment}
                </PaymentTypeStyle.PaymentViewTopTitle>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={({ item }) =>
                            <PaymentTypeStyle.CarouselContainerView>
                                <PaymentTypeStyle.CarouselTopContainerView style={{ backgroundColor: item.topViewColor }}>
                                    <PaymentTypeStyle.CardTypeTitle>
                                        {item.title}
                                    </PaymentTypeStyle.CardTypeTitle>
                                </PaymentTypeStyle.CarouselTopContainerView>
                                <PaymentTypeStyle.CarouselBottomContainerView>
                                    <PaymentTypeStyle.PointEightView>
                                        <PaymentTypeStyle.ProfileLimitText>
                                            {item.addProLimitText}
                                        </PaymentTypeStyle.ProfileLimitText>
                                        <PaymentTypeStyle.FlatListView
                                            data={item.values}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item }) =>
                                                <PaymentTypeStyle.ChossePkgView style={styles.GreyShadow} onPress={() => { this.setState({ cardPopUp: true, id: planList[item.index].plan_id })

                                                if(item.index == 0 || item.index == 3 || item.index == 6 ){
                                                    this.setState({Subscribed_month:"1 " + strings.month , Subscribed_plan:item.title})
                                                }
                                                else if(item.index == 1 || item.index == 4){
                                                    this.setState({Subscribed_month:"6 " + strings.months , Subscribed_plan:item.title})
                                                }
                                                else{
                                                    this.setState({Subscribed_month:"12 " + strings.months , Subscribed_plan:item.title})
                                                } }}>
                                                    <PaymentTypeStyle.StarContainerView>
                                                        <Entypo name="star" size={WIDTH / 14} color={DARK_APP_COLOR} marginLeft={30} />
                                                    </PaymentTypeStyle.StarContainerView>
                                                    <Text style={{ color: 'black', marginLeft: 10, fontSize: WIDTH / 22 }}>
                                                        {planList[item.index].life}
                                                        {item.index == 0 || item.index == 3 || item.index == 6 ? strings.month +" (sek " + item.price + "Kr)" :
                                                            item.index == 1 || item.index == 4 ? strings.months +" (sek " + item.price + "/"+strings.month+")" :
                                                                strings.months +" (sek " + item.price + "/"+strings.month+")"}

                                                    </Text>
                                                </PaymentTypeStyle.ChossePkgView>
                                            }
                                        />
                                    </PaymentTypeStyle.PointEightView>
                                    <PaymentTypeStyle.PointTwoView>
                                        <PaymentTypeStyle.PaymentCancelText>
                                            {strings.youCanCancelAnyTime}
                                </PaymentTypeStyle.PaymentCancelText>
                                        <PaymentTypeStyle.DiscountContainerView>
                                            <PaymentTypeStyle.DiscountText>
                                                {strings.doYouHaveDiscountCode}
                                    </PaymentTypeStyle.DiscountText>
                                            <PaymentTypeStyle.CodeContainerView onPress={() => this.setState({promo_code_Pop_up: true})}>
                                                <PaymentTypeStyle.CodeText>
                                                    {this.state.promoCodePlaceHolder}
                                        </PaymentTypeStyle.CodeText>
                                            </PaymentTypeStyle.CodeContainerView>
                                        </PaymentTypeStyle.DiscountContainerView>
                                    </PaymentTypeStyle.PointTwoView>
                                </PaymentTypeStyle.CarouselBottomContainerView>
                            </PaymentTypeStyle.CarouselContainerView>

                        }
                        sliderWidth={WIDTH}
                        itemWidth={WIDTH / 1.2}
                        sliderHeight={HEIGHT / 2}
                        itemHeight={HEIGHT / 2}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    />

                    <Pagination
                        dotsLength={this.state.entries.length}
                        activeDotIndex={this.state.activeSlide}
                        containerStyle={{ width: 40, height: HEIGHT / 20, bottom: 10, alignSelf: 'center' }}
                        dotStyle={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginHorizontal: 2,
                            backgroundColor: WHITE
                        }}
                        inactiveDotStyle={{
                            backgroundColor: SILVER
                        }}
                        inactiveDotOpacity={1}
                        inactiveDotScale={1}
                    />

                    {this.state.cardPopUp &&
                        <PaymentTypeStyle.DistanceMainView activeOpacity={0.8} onPress={()=>{Keyboard.dismiss()}}>
                            <PaymentTypeStyle.DistanceInnerContainer>
                                <PaymentTypeStyle.CloseButton onPress={() => this.setState({ cardPopUp: false, cardNumber: '', expiry: '', cvc: '' })}>
                                    <AntDesign name="close" size={WIDTH / 14} color={DARK_APP_COLOR} />
                                </PaymentTypeStyle.CloseButton>

                                <CreditCardInput onChange={this._onChange}
                                    placeholders={{ number: "0000 0000 0000 0000", expiry: "MM/YY", cvc: "CVC" }}
                                    allowScroll={true}
                                    autoFocus={true}
                                    onChange={this._onChange}
                                    onFocus={this._onFocus}
                                />

                                <PaymentTypeStyle.SubmitButton onPress={() => {this.payment(this.state.id)}}>
                                    <PaymentTypeStyle.SubmitButtonText> {strings.submit} </PaymentTypeStyle.SubmitButtonText>
                                </PaymentTypeStyle.SubmitButton>
                            </PaymentTypeStyle.DistanceInnerContainer>
                        </PaymentTypeStyle.DistanceMainView>}

                </PaymentTypeStyle.SafeAreaView>}
                {this.state.promo_code_Pop_up && <PromoCodes
                lan = {strings}
                submitWithPromCode={() => this.checkPromoCode()}
                cancell={() => this.setState({promo_code_Pop_up: false})}
                textInputCallBack={(text) => this.setState({promotion_code: text})}
                promoText={this.state.promotion_code}/>}
                {this.state.loading && <ActivityLoading />}
            </PaymentTypeStyle.WrapperViewVertical>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        userDetail: state.user.userDetail,
        userToken: state.user.userToken,
        languageOfApp: state.appState.languageOfApp,

    };
    function mapStateToProps(state, props) {
      //console.log(state);
  return {
    userDetail: state.user.userDetail,
    showIndicator: state.user.loading,
    userToken: state.user.userToken,
    languageOfApp: state.appState.languageOfApp,

  };
}
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentType);

const styles = StyleSheet.create({
    BackgroundLogoStyle: { position: "absolute", height: HEIGHT, width: WIDTH, backgroundColor: "rgba(249,158,158,0.85)" },
    // LogoWithTitle: { alignSelf: 'center', width: WIDTH / 1.3, height: HEIGHT / 10 },
    LogoWithTitle: { alignSelf: 'center', width: 270 , height: 70 },
    GreyShadow: { shadowOffset: { width: 1, height: 1 }, shadowColor: 'grey', shadowOpacity: 1,elevation: 3 },
});
