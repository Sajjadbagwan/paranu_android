import styled from 'styled-components'
import {OFF_WHITE,WHITE,} from '../../constant/Color'

const BottomNavStyle = {

  WrapperView: styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background-color: ${WHITE};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top-width: 1px;
    border-color: ${OFF_WHITE};
  `,

  LinkWrapper: styled.View`
    flex: 1;
  `,

  IconWrapperView: styled.View`
    align-items: center;
    justify-content: center;
    align-content:center;
  `,

  CreateView: styled.View`
    position: relative;
    align-items: center;
    justify-content: center;
  `,

  DotView: styled.View`
    position: absolute;
    align-self:center;
  `
}

export default BottomNavStyle
