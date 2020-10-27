import styled from "styled-components";

export const Table = styled.table({
    borderCollapse: "collapse",
    margin: "25px 0",
    fontSize: "1.2em",
    minWidth: "400px",
    borderRadius: "5px 5px 5px 5px",
    overflow: "hidden"
})

export const TableTheadTr = styled.tr(({ theme }) => ({
    backgroundColor: theme.bmColors[1],
    color: "#ffffff",
    textAlign: "left",
    fontWeight: "bold"
}))

export const TableContentTh = styled.th(({ theme }) => ({
    padding: "12px 15px"
}))

export const TableContentTd = styled.td(({ theme }) => ({
    padding: "12px 15px",
    textAlign: "center"
}))

export const TableContentTdLabel = styled.td(({ theme }) => ({
    padding: "12px 15px"
}))

export const TableContentTdTitle = styled.td(({ theme }) => ({
    padding: "13px 7px",
    fontWeight: "bold",
    fontSize: "1.3em"
}))

export const TableContentTdTitleEmpty = styled.td(({ theme }) => ({
    padding: "24px"
}))

export const TableContentTbodyTr = styled.tr(({ theme }) => ({
    borderBottom: "1px solid #dddddd"
}))

export const TableContentTbodyTrNoLine = styled.tr(({ theme }) => ({
    borderBottom: "0px"
}))