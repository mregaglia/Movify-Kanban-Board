import React from 'react'
import ReactTooltip from 'react-tooltip'
import { number, oneOf, string } from 'prop-types'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { ClickableTableCell } from '../../style/table_style'

import ExpandViewDetailCandidates from './ExpandViewDetailCandidates'
import ExpandViewDetailClient from './ExpandViewDetailClient'

export const CLIENT = 'CLIENT'
export const CANDIDATE = 'CANDIDATE'
export const BOLD = 700
export const REGULAR = 400

const Tooltip = styled(ReactTooltip)`
  max-height: 40vh;
  overflow: auto;
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
