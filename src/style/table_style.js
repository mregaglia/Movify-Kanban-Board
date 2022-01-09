import styled from 'styled-components'

export const Table = styled.table({
  borderCollapse: 'collapse',
  margin: '25px 25px 25px 25px',
  fontSize: '1.2em',
  minWidth: '300px',
  borderRadius: '5px 5px 5px 5px',
  overflow: 'hidden',
})

export const TableTheadTr = styled.tr(({ theme }) => ({
  backgroundColor: theme.bmColors[1],
  color: '#ffffff',
  textAlign: 'left',
  fontWeight: 'bold',
}))

export const TableContentTh = styled.th(() => ({
  padding: '12px 15px',
  whiteSpace: 'nowrap',
}))

export const TableContentTd = styled.td`
  padding: 12px 15px;
  text-align: center;
  ${({ clickable }) => clickable && 'cursor: pointer;'}
`

export const TableContentTdBold = styled.td(() => ({
  padding: '12px 15px',
  textAlign: 'center',
  fontWeight: 'bold',
}))

export const ClickableTableCell = styled.td`
  padding: 12px 15px;
  text-align: center;
  cursor: pointer;
  font-weight: ${({ fontWeight }) => fontWeight};
`

export const TableContentTdLabel = styled.td(() => ({
  padding: '12px 15px',
  whiteSpace: 'nowrap',
}))

export const TableContentTdLabelBold = styled.td(() => ({
  padding: '12px 15px',
  whiteSpace: 'nowrap',
  fontWeight: 'bold',
}))

export const TableContentTdTitle = styled.td(({ isBM }) => ({
  padding: isBM ? '40px 7px 12px 10px' : '13px 7px',
  fontWeight: 'bold',
  fontSize: '1.3em',
}))

export const TableContentTdTitleForBMEmpty = styled.td(() => ({
  padding: '67px 7px 12px 0px',
  fontWeight: 'bold',
  fontSize: '1.3em',
}))

export const TableContentTdTitleEmpty = styled.td(() => ({
  padding: '27px',
}))

export const TableContentTbodyTr = styled.tr(() => ({
  borderBottom: '1px solid #dddddd',
}))

export const TableContentTbodyTrNoLine = styled.tr(() => ({
  borderBottom: '0px',
}))
