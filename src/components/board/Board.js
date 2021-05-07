import React from "react"
import { propOr } from "ramda"
import { array, number, object, string, func } from "prop-types"
import styled, { css } from "styled-components"
import Column from "./Column"
import { hotCandidatesStatusKeys } from "../../hotCandidates"
import getMapValue from "../../utils/getMapValue"

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
}) => {
  return (
    <Container className={className}>
      {statuses.map((status) => {
        return (
        <Column
          board={board}
          key={status}
          jobSubmissions={propOr([], status, jobSubmissions)}
          statusData={statusesData?.[getMapValue(hotCandidatesStatusKeys, status)]}
          onOpenAddCompanyModal={onOpenAddCompanyModal}
          candidateId={candidateId}
          bmId={bmId}
          clientCorporationId={clientCorporationId}
          jobOrderId={jobOrderId}
          status={status}
        />
      )})}
    </Container>
  )
}

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
