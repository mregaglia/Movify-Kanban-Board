import React from 'react'
import { bool, number, string } from 'prop-types'
import styled from 'styled-components'

import bullhornLogo from '../../assets/bullhorn.png'
import { getBullhornUrl, getBullhornUrlClientContact } from '../../utils/bullhorn'

const Img = styled.img({
  height: 12,
  width: 12,
  display: 'inline-block',
  padding: 4,
})

const SquareContainer = styled.div(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.colors.bullhorn,
  height: 20,
  width: 20,
  borderRadius: theme.dimensions.borderRadius,
  marginRight: 4,
  marginLeft: 4,
}))

const LinkContainer = styled.a({
  color: 'transparent',
  textDecoration: 'none',
})

const BullhornLink = ({ candidateId, isClient, className }) => {
  const bullhornUrl = isClient ? getBullhornUrlClientContact({ id: candidateId }) : getBullhornUrl({ id: candidateId })

  return (
    <LinkContainer href={bullhornUrl} target="_blank" rel="noopener noreferrer" className={className}>
      <SquareContainer>
        <Img alt="bh" src={bullhornLogo} />
      </SquareContainer>
    </LinkContainer>
  )
}

BullhornLink.propTypes = {
  candidateId: number,
  isClient: bool,
  className: string,
}

export default BullhornLink
