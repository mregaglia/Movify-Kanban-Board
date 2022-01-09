import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { func, number, object, oneOf, string } from 'prop-types'
import { pathOr } from 'ramda'

import { ColorRowText, Column, Row } from '../components'
import HotCandidate from '../components/HotCandidate'

import { BUSINESS, HOT_CANDIDATES } from './Bm'
import JobOrder from './JobOrder'

const ClientCorporation = ({
  bmId,
  clientCorporation,
  color,
  kanbanType,
  data,
  onOpenDeleteModal,
  onOpenAddCompanyModal,
  index,
}) => {
  const shouldRenderHeader = kanbanType === BUSINESS

  return (
    <div>
      {shouldRenderHeader && <ColorRowText color={color}>{clientCorporation?.name ?? ''}</ColorRowText>}
      <Row>
        <Column>
          {kanbanType === HOT_CANDIDATES ? (
            <Droppable droppableId={`NO_STATUS@${data.id}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <HotCandidate
                    hotCandidate={data}
                    onOpenDeleteModal={onOpenDeleteModal}
                    onOpenAddCompanyModal={onOpenAddCompanyModal}
                    index={index}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : (
            clientCorporation?.bmIds[bmId]?.filteredJobOrders?.map((jobOrder) => (
              <JobOrder key={jobOrder?.id} joId={jobOrder?.id} color={color} />
            ))
          )}
        </Column>
      </Row>
    </div>
  )
}

ClientCorporation.propTypes = {
  bmId: number,
  ccId: number,
  clientCorporation: object,
  color: string,
  kanbanType: oneOf(['HOT_CANDIDATES', 'BUSINESS']),
  data: object,
  index: number,
  onOpenDeleteModal: func,
  onOpenAddCompanyModal: func,
}

export default connect((state, { ccId }) => ({
  clientCorporation: pathOr({}, ['kanban', 'clientCorporations', ccId], state),
}))(ClientCorporation)
