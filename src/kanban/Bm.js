import React from 'react'
import { connect } from 'react-redux'
import { array, func, object, oneOf, string } from 'prop-types'
import { pathOr } from 'ramda'
import styled, { css } from 'styled-components'
import { v4 as uuid } from 'uuid'

import { ColorColumnText, Column, Row } from '../components'
import { Add } from '../components/svgs'
import { ADD, DELETE } from '../hotCandidates/utils'
import { formatBmName } from '../utils/kanban'

import ClientCorporation from './ClientCorporation'

export const HOT_CANDIDATES = 'HOT_CANDIDATES'
export const BUSINESS = 'BUSINESS'

export const KANBAN_TYPES = [HOT_CANDIDATES, BUSINESS]

const AddButton = styled.button`
  ${({ color }) => css`
    background-color: ${color};
    border: none;
    padding: 0;
    margin: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.75rem;
    grid-column: 2;
    grid-row: 1;
    margin-left: calc(4px + 1rem);
    align-self: end;
    font-size: 0;
    &:hover {
      cursor: pointer;
    }
  `}
`

const StyledRow = styled(Row)`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 4.125rem 1fr;
  justify-content: start;
  margin-bottom: 6px;
`

const StyledColorColumnText = styled(ColorColumnText)`
  grid-row: 1;
`

const StyledColumn = styled(Column)`
  grid-row: 1;
  grid-column: 2;
`

const Bm = ({ bm, color, title, data, kanbanType = BUSINESS, onOpenModal }) => {
  const dataToRender =
    kanbanType === BUSINESS
      ? bm?.clientCorporations?.map((ccId) => ({
          ccId,
          color,
          bmId: bm?.id,
        }))
      : data

  const handleClickAddButton = () => {
    onOpenModal(title, ADD)
  }

  const handleClickDeleteButton = (candidateIdToDelete) => {
    onOpenModal(title, DELETE, candidateIdToDelete)
  }

  return (
    <StyledRow>
      <StyledColorColumnText color={color} title={title}>
        {title || formatBmName(bm || {})}
      </StyledColorColumnText>
      <StyledColumn>
        {dataToRender?.map((single, index) => (
          <ClientCorporation
            key={uuid()}
            bmId={single?.bmId}
            ccId={single?.ccId}
            color={color}
            kanbanType={kanbanType}
            data={kanbanType === HOT_CANDIDATES ? single : null}
            index={index}
            onOpenDeleteModal={handleClickDeleteButton}
          />
        ))}
      </StyledColumn>
      {kanbanType === HOT_CANDIDATES ? (
        <AddButton color={color} onClick={handleClickAddButton}>
          <Add color="white" />
        </AddButton>
      ) : null}
    </StyledRow>
  )
}

Bm.propTypes = {
  bm: object,
  color: string,
  title: string,
  data: array,
  kanbanType: oneOf(['HOT_CANDIDATES', 'BUSINESS']),
  onOpenModal: func,
}

export default connect((state, { bmId }) => ({
  bm: pathOr({}, ['kanban', 'bms', bmId], state),
}))(Bm)
