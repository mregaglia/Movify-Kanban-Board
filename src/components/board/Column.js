import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useLocation } from 'react-router-dom'
import { array, func, number, string } from 'prop-types'
import styled, { css } from 'styled-components'

import { createColumnId, STATUS_IDENTIFIED, STATUS_NO_GO } from '../../utils/kanban'
import { statusLabels } from '../../utils/statusLabels'
import AddButton from '../AddButton'

import Candidates from './Candidates'
import HotCandidateCompanies from './HotCandidateCompanies'
import HotCandidateCompaniesIdentified from './HotCandidateCompaniesIdentified'

const getBackgroundColor = (isNoGo, snapshot, theme) => {
  if (snapshot?.isDraggingOver) return theme.colors.transparentRed
  if (snapshot?.draggingFromThisWith) return theme.colors.transparentGrey
  if (isNoGo) return theme.colors.lightGrey
  return theme.colors.darkWhite
}

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.25rem;
`

const Content = styled.div(({ isNoGo, snapshot, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: 250,
  overflowY: 'auto',
  flexGrow: 1,
  padding: 8,
  backgroundColor: getBackgroundColor(isNoGo, snapshot, theme),
  borderRadius: theme.dimensions.borderRadius,
}))

const Title = styled.div(({ theme }) => ({
  fontFamily: theme.fonts.fontFamily,
  fontSize: theme.textDimensions.medium,
  textAlign: 'center',
  paddingTop: 4,
  paddingBottom: 4,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}))

const ContentContainer = styled.div`
  position: relative;
`

const StyledAddButton = styled(AddButton)`
  ${({ theme: { dimensions, colors } }) => css`
    position: absolute;
    right: 0;
    top: 0;
    background-color: ${colors.mediumGrey};
    border-top-right-radius: ${dimensions.borderRadius}px;
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  `}
`

const getStatusLabel = (status) => statusLabels.get(status) ?? status

const Column = ({
  board,
  jobSubmissions,
  status,
  statusData,
  onOpenAddCompanyModal,
  candidateId,
  clientCorporationId,
  jobOrderId,
  bmId,
}) => {
  const { pathname } = useLocation()

  const droppableId =
    pathname === '/hot-candidates'
      ? `${status}@${candidateId}`
      : createColumnId(bmId, clientCorporationId, jobOrderId, status)

  const renderContent = () => {
    if (pathname === '/hot-candidates' && status !== STATUS_IDENTIFIED) {
      return <HotCandidateCompanies companies={statusData} />
    }
    if (status === STATUS_IDENTIFIED) {
      return <HotCandidateCompaniesIdentified identified={statusData} candidateId={candidateId} />
    }
    return <Candidates board={board} jobSubmissions={jobSubmissions} />
  }

  return (
    <Container>
      <Title>{getStatusLabel(status)}</Title>
      <ContentContainer>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <Content snapshot={snapshot} isNoGo={status === STATUS_NO_GO}>
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ minHeight: 65, height: '100%' }}>
                {renderContent()}
                {provided.placeholder}
              </div>
            </Content>
          )}
        </Droppable>
        {status === STATUS_IDENTIFIED ? <StyledAddButton title="Add company" onClick={onOpenAddCompanyModal} /> : null}
      </ContentContainer>
    </Container>
  )
}
Column.propTypes = {
  bmId: number,
  clientCorporationId: number,
  jobOrderId: number,
  status: string,
  board: string,
  jobSubmissions: array,
  statusData: array,
  onOpenAddCompanyModal: func,
  candidateId: number,
}
export default Column
