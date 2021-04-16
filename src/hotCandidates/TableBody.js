import React from "react"
import styled from "styled-components"
import { array, func } from "prop-types"
import { tableStyles } from "./styles"

const TableDataCell = styled.td`
  ${tableStyles}
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  row-gap: 0.5rem;
`

const ListItem = styled.li`
`

const TableBody = ({ rows, getTableBodyProps, prepareRow }) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row)
        const { key: rowKey, ...rowProps } = row.getRowProps()
        return (
          <tr key={rowKey} {...rowProps}>
            {row.cells.map((cell) => {
              const { key, ...cellProps } = cell.getCellProps()
              return (
                <TableDataCell key={key} {...cellProps}>
                  {cell.render((single) => {
                    if (Array.isArray(single.cell.value)) {
                      return (
                        <List>
                          {single.cell.value.map(({ title }) => (
                            <ListItem key={title}>{title}</ListItem>
                          ))}
                        </List>
                      )
                    } else {
                      return single.cell.value
                    }
                  })}
                </TableDataCell>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

TableBody.propTypes = {
  rows: array,
  getTableBodyProps: func,
  prepareRow: func,
}

export default TableBody
