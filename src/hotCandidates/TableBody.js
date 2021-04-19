import React from "react"
import styled, { css } from "styled-components"
import { array, func } from "prop-types"
import { tableStyles } from "./styles"

const TableDataCell = styled.td`
  ${({ theme: { dimensions } }) => css`
    ${tableStyles}
    position: relative;
    z-index: 10;
    padding: 1rem 0;
    &::before {
      content: '';
      position: absolute;
      background-color: white;
      width: 100%;
      height: 100%;
      border-radius: ${dimensions.borderRadius}px;
      top: 0;
      left: 0;
      z-index: -1;
    }
  `}
`

const List = styled.ul`
  margin: 0;
  padding 0 0.5rem;
  list-style: none;
  display: grid;
  row-gap: 0.8rem;
`

const textStyles = css`
  ${({ theme: { textDimensions, fonts } }) => css`
    font-family: ${fonts.fontFamily};
    font-size: ${textDimensions.regular}px;
  `}
`

const ListItem = styled.li`
  ${textStyles}
`

const Paragraph = styled.p`
  ${textStyles}
  margin: 0;
  padding 0 0.5rem;
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
                      return <Paragraph>{single.cell.value}</Paragraph>
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
