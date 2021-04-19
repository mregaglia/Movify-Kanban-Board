import React from "react"
import styled, { css } from "styled-components"
import { array } from "prop-types"
import { tableStyles } from "./styles"

const TableHeadCell = styled.th`
  ${({ theme: { fonts, textDimensions } }) => css`
    ${tableStyles}
    font-family: ${fonts.fontFamily};
    font-size: ${textDimensions.medium}px;
    font-weight: normal;
  `}
`

const TableHead = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => {
        const {
          key: headerGroupKey,
          ...headerGroupProps
        } = headerGroup.getHeaderGroupProps()
        return (
          <tr key={headerGroupKey} {...headerGroupProps}>
            {headerGroup.headers.map((column) => {
              const { key, ...headerProps } = column.getHeaderProps()
              return (
                <TableHeadCell key={key} {...headerProps}>
                  {column.render("Header")}
                </TableHeadCell>
              )
            })}
          </tr>
        )
      })}
    </thead>
  )
}

TableHead.propTypes = {
  headerGroups: array,
}

export default TableHead
