import React from "react"
import { propOr } from "ramda"
import { array, number, object, string, func } from "prop-types"
import styled, { css } from "styled-components"
import { createColumnId } from "../../utils/kanban"
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
          status={status}
          jobSubmissions={propOr([], status, jobSubmissions)}
          statusData={statusesData?.[getMapValue(hotCandidatesStatusKeys, status)]}
          onOpenAddCompanyModal={onOpenAddCompanyModal}
          candidateId={candidateId}
          columnId={createColumnId(
            bmId,
            clientCorporationId,
            jobOrderId,
            status
          )}
        />
      )})}
    </Container>
  )
}

Board.propTypes = {
  bmId: number,
  board: string,
  className: string,
  clientCorporationId: number,
  jobOrderId: number,
  jobSubmissions: object,
  statuses: array,
  statusesData: object,
  onOpenAddCompanyModal: func,
  candidateId: number,
}

export default Board
