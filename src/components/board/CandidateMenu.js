import React from 'react'
import { ContextMenu, MenuItem } from 'react-contextmenu'
import { func, number, oneOfType, string } from 'prop-types'
import styled from 'styled-components'

import { Trash } from '../svgs'

const Container = styled.div(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.colors.darkWhite,
  padding: 8,
  borderRadius: theme.dimensions.borderRadius,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
}))

const StyledMenuItem = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const Text = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.regular,
  textAlign: 'justify',
  margin: 8,
}))

const CandidateMenu = ({ id, onDelete }) => (
  <ContextMenu id={`${id}`}>
    <Container>
      <MenuItem onClick={onDelete}>
        <StyledMenuItem>
          <Trash />
          <Text>Delete submission</Text>
        </StyledMenuItem>
      </MenuItem>
    </Container>
  </ContextMenu>
)

CandidateMenu.propTypes = {
  id: oneOfType([number, string]),
  onDelete: func,
}

export default CandidateMenu
