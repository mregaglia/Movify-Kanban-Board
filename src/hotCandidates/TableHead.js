import React from "react"
import styled from "styled-components"
import { array } from "prop-types"
import { tableStyles } from "./styles"

const TableHeadCell = styled.th`
  ${tableStyles}
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
