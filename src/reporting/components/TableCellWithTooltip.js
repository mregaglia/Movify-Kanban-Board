import React from "react"
import ReactTooltip from "react-tooltip"
import { string, number, oneOf } from "prop-types"
import { v4 as uuid } from "uuid"
import styled from "styled-components"
import ExpandViewDetailCandidates from "./ExpandViewDetailCandidates"
import ExpandViewDetailClient from "./ExpandViewDetailClient"
import { ClickableTableCell } from "../../style/table_style"

export const CLIENT = "CLIENT"
export const CANDIDATE = "CANDIDATE"
export const BOLD = 700
export const REGULAR = 400

const Tooltip = styled(ReactTooltip)`
  max-height: 50vh;
  overflow: scroll;
  pointer-events: auto !important;
  &:hover {
    visibility: visible !important;
    opacity: 1 !important;
  }
`

const TableCellWithTooltip = ({ week, title, text, type = CLIENT, fontWeight = BOLD }) => {
  const id = uuid()
  return (
    <ClickableTableCell data-for={id} data-event="click" data-tip fontWeight={fontWeight}>
      {text}
      <Tooltip id={id} globalEventOff="click" place="right" clickable isCapture>
        {type === CLIENT ? (
          <ExpandViewDetailClient week={week} title={title} />
        ) : (
          <ExpandViewDetailCandidates week={week} title={title} />
        )}
      </Tooltip>
    </ClickableTableCell>
  )
}

TableCellWithTooltip.propTypes = {
  week: string,
  title: string,
  text: number,
  type: oneOf([CLIENT, CANDIDATE]),
  fontWeight: oneOf([BOLD, REGULAR]),
}

export default TableCellWithTooltip
