import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media, mixin } from '../styles'

const Layer = styled.div`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  position: fixed;
  z-index: 2000;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #fff;

  ${media.Desktop} {
    ${mixin.centeredFixed()};
    width: 500px;
    height: 600px;
    border: 2px solid #000;
  }
`

const buttonHeight = '40px'

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: ${buttonHeight};
`

const EmbedArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - ${buttonHeight});
`

function DaumAddressSearchLayer({ layerId, isVisible, onClose }) {
  return (
    <Layer isVisible={isVisible}>
      <CloseButton onClick={onClose} type="button">
        닫기
      </CloseButton>
      <EmbedArea id={layerId} />
    </Layer>
  )
}

DaumAddressSearchLayer.propTypes = {
  layerId: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DaumAddressSearchLayer
