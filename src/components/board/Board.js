import React from 'react'
import { array, func, number, object, string } from 'prop-types'
import { propOr } from 'ramda'
import styled, { css } from 'styled-components'

import { JOB_SUBMISSION_STATUSES_MAP } from '../../hotCandidates'
import getMapValue from '../../utils/getMapValue'

import Column from './Column'

const Container = styled.div`
  ${({ theme: { colors, dimensions } }) => css`
    display: grid;
    padding: 0.5rem;
    border-radius: ${dimensions.borderRadius}px;
    background-color: ${colors.lightGrey};
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    width: 100%;
    column-gap: 0.5rem;
    box-sizing: border-box;
  `}
`

const Board = ({
  bmId,
  board,
  clientCorporationId,
  jobOrderId,
  jobSubmissions,
  statuses,
  className,
  statusesData,
  onOpenAddCompanyModal,
  candidateId,
}) => (
  <Container className={className}>
    {statuses.map((status) => (
      <Column
        board={board}
        key={status}
        jobSubmissions={propOr([], status, jobSubmissions)}
        statusData={statusesData?.[getMapValue(JOB_SUBMISSION_STATUSES_MAP, status)]}
        onOpenAddCompanyModal={onOpenAddCompanyModal}
        candidateId={candidateId}
        bmId={bmId}
        clientCorporationId={clientCorporationId}
        jobOrderId={jobOrderId}
        status={status}
      />
    ))}
  </Container>
)

Board.propTypes = {
  bmId: number,
  clientCorporationId: number,
  jobOrderId: number,
  board: string,
  className: string,
  jobSubmissions: object,
  statuses: array,
  statusesData: object,
  onOpenAddCompanyModal: func,
  candidateId: number,
}

export default Board
