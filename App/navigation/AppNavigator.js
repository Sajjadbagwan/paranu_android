import { Animated, Easing } from "react-native";
import { createStackNavigator, createSwitchNavigator,createBottomTabNavigator } from "react-navigation";

import BottomNavContainer from '../component/common/BottomNav'

import Splash from "../screens/Splash";
import LoginType from '../screens/LoginType'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Interest from '../screens/Interest'
import PetInfoInitial from '../screens/PetInfoInitial'
import PetULookingFor from '../screens/PetULookingFor'
import Setting from '../screens/Setting'
import ChangePassword from '../screens/ChangePassword'
import ContactUs from '../screens/ContactUs'
import PaymentType from '../screens/PaymentType'
import ReportProblem from '../screens/ReportProblem'
import Inquiry from '../screens/Inquiry'
import Introduction from '../screens/Introduction'
import Matching from '../screens/Matching'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Message from '../screens/Message'
import EditProfile from '../screens/EditProfile'
import MessageSpecific from '../screens/MessageSpecific'
import SelectPet from '../screens/SelectPet'
import ProfileOther from '../screens/ProfileOther'
import ParanuGuide from '../screens/ParanuGuide'
import TermConditions from '../screens/TermConditions'
import ForgotPassword from '../screens/ForgotPassword'
import ParanuInstructions from '../screens/ParanuInstructions'

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.linear
  }
});

const TabStackOne = createStackNavigator(
  {
    Matching: {screen: Matching},
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
      opacity: 1
    }
  })
  const TabStackTwo = createStackNavigator(
    {
      Profile: {screen: Profile},
    },
    {
      headerMode: 'none',
      cardStyle: {
        backgroundColor: 'white',
        opacity: 1
      }
    })

const TabStackThree = createStackNavigator(
  {
    Home: {screen: Home},
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'white',
      opacity: 1
    }
  })
  const TabStackFour = createStackNavigator(
    {
      Message: {screen: Message},
    },
    {
      headerMode: 'none',
      cardStyle: {
        backgroundColor: 'white',
        opacity: 1
      }
    })
    const TabStackFive = createStackNavigator(
      {
        Setting: {screen: Setting},
      },
      {
        headerMode: 'none',
        cardStyle: {
          backgroundColor: 'white',
          opacity: 1
        }
      })

//Tab Navigation
const TabNavigator = createBottomTabNavigator({
  TabStackThree: {screen: TabStackThree},
  TabStackOne: {screen: TabStackOne},
  TabStackTwo: {screen: TabStackTwo},
  TabStackFour:{screen:TabStackFour},
  TabStackFive:{screen:TabStackFive}

}, {
  tabBarComponent: BottomNavContainer,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  moveCalled:true,
  animationEnabled: false
})

// login stack
const LoginStack = createStackNavigator(
  {
    Splash: { screen: Splash, navigationOptions: { header: null,gesturesEnabled: false  }  },
    SignIn: { screen: SignIn, navigationOptions: { header: null ,gesturesEnabled: false }  },
    PetInfoInitial:{screen:PetInfoInitial, navigationOptions: { header: null ,gesturesEnabled: false } },
    Introduction:{screen:Introduction, navigationOptions: { header: null ,gesturesEnabled: false } },
    ContactUs:{screen:ContactUs, navigationOptions: { header: null,gesturesEnabled: false  } },
    PaymentType: {screen: PaymentType, navigationOptions: { header: null,gesturesEnabled: false  } },
    Setting: { screen: Setting, navigationOptions: { header: null ,gesturesEnabled: false } },
    PetULookingFor:{screen:PetULookingFor, navigationOptions: { header: null,gesturesEnabled: false  } },
     LoginType: { screen: LoginType, navigationOptions: { header: null ,gesturesEnabled: false }  },
     SignIn: { screen: SignIn , navigationOptions: { header: null ,gesturesEnabled: false } },
     SignUp: { screen: SignUp, navigationOptions: { header: null,gesturesEnabled: false  } },
     Interest: { screen: Interest, navigationOptions: { header: null ,gesturesEnabled: false } },
     ChangePassword:{screen:ChangePassword, navigationOptions: { header: null ,gesturesEnabled: false } },
     ReportProblem:{screen:ReportProblem, navigationOptions: { header: null,gesturesEnabled: false  } },
     Inquiry:{screen:Inquiry, navigationOptions: { header: null,gesturesEnabled: false  } },
     TabNavigator:{screen:TabNavigator, navigationOptions: { header: null,gesturesEnabled: false  } },
     EditProfile:{screen:EditProfile, navigationOptions: { header: null,gesturesEnabled: false  } },
     MessageSpecific:{screen:MessageSpecific, navigationOptions: { header: null ,gesturesEnabled: false } },
     SelectPet:{screen:SelectPet, navigationOptions: { header: null,gesturesEnabled: false  } },
     ProfileOther:{screen:ProfileOther, navigationOptions: { header: null,gesturesEnabled: false  } },
     ParanuGuide:{screen:ParanuGuide, navigationOptions: { header: null ,gesturesEnabled: false } },
     TermConditions:{screen:TermConditions, navigationOptions: { header: null,gesturesEnabled: false } },
     ForgotPassword:{screen:ForgotPassword, navigationOptions: { header: null,gesturesEnabled: false  } },
    ParanuInstructions:{screen:ParanuInstructions,navigationOptions: { header: null,gesturesEnabled: false  }}
  });

export default (SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: LoginStack,
    App: LoginStack,
    Auth: LoginType
  },
  {
    initialRouteName: "AuthLoading",
    transitionConfig: noTransitionConfig,
    moveCalled:true,
  }
));
