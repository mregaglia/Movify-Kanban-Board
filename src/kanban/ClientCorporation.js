import React from "react"
import { connect } from "react-redux"
import { pathOr } from "ramda"
import { number, object, string, oneOf, func } from "prop-types"
import { ColorRowText, Column, Row } from "../components"
import JobOrder from "./JobOrder"
import { BUSINESS, HOT_CANDIDATES } from "./Bm"
import HotCandidate from "../components/HotCandidate"

const ClientCorporation = ({
  bmId,
  clientCorporation,
  color,
  kanbanType,
  data,
  index,
  onOpenDeleteModal,
}) => {
  const shouldRenderHeader =
    (kanbanType === HOT_CANDIDATES && index === 0) || kanbanType === BUSINESS
  return (
    <div>
      {shouldRenderHeader && (
        <ColorRowText color={color}>
          {clientCorporation?.name ?? ""}
        </ColorRowText>
      )}
      <Row style={{ paddingLeft: 4, paddingTop: 10, paddingBottom: 10 }}>
        <Column>
          {kanbanType === HOT_CANDIDATES
            ? <HotCandidate hotCandidate={data} onOpenDeleteModal={onOpenDeleteModal} />
            : clientCorporation?.bmIds[
                bmId
              ]?.filteredJobOrders?.map((jobOrder) => (
                <JobOrder
                  key={jobOrder?.id}
                  joId={jobOrder?.id}
                  color={color}
                />
              ))}
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
  kanbanType: oneOf(["HOT_CANDIDATES", "BUSINESS"]),
  data: object,
  index: number,
  onOpenDeleteModal: func,
}

export default connect((state, { ccId }) => ({
  clientCorporation: pathOr({}, ["kanban", "clientCorporations", ccId], state),
}))(ClientCorporation)
