import BottomNav from './BottomNav'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "../../../actions";
import { Dimensions, Platform } from 'react-native';

let d = Dimensions.get('window');
const { height, width } = d;

class BottomNavContainer extends PureComponent {
  constructor () {
    super()
    this.checkPreviewState = this.checkPreviewState.bind(this)
    this.state = { badgeNumber : 2 }

  }

  componentDidMount() {

  }

  checkPreviewState () {

  }

  render () {

    return (
      <BottomNav
      opacityActually={this.props.opacityOfTabBar}
        checkPreviewState={this.checkPreviewState}
        index={this.state.badgeNumber}
        navigation={(navigate,index)=>{
          this.setState({badgeNumber:index})
          this.props.navigation.navigate(navigate)}}
          isIphoneXorAbove={ Platform.OS === 'ios' && ((height === 812 || width === 812)||(height === 896 || width === 896))
        }
      />
    )
  }
}

function mapStateToProps(state, props) {
  return {
      opacityOfTabBar:state.appState.opacity,
      indexOfBottomTab:state.appState.indexOfBottomTab
}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavContainer)
