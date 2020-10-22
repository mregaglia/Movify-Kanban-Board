import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr } from "../../style/table_style"
import { paths, isNil } from 'ramda'
import {
    CALL_RECRUITMENT,
    LINKED_INMAIL,
    INTERVIEW_SCHEDULE,
    NO_SHOW,
    INTERVIEW_DONE,
    CONTRACT_PROPOSED
} from "../../utils/reporting"


const tableTextAcquisition = [
    "Contacted by InMail",
    "Contacted by phone",
    "Interview scheduled",
    "No show",
    "Interview done",
    "Contract proposed",
    "Hired"
]

const TalentAcquisition = ({ data }) => {
    return (
        <>
            {
                tableTextAcquisition.map((text) =>
                    <TableContentTbodyTr key={text}>
                        <TableContentTd key={text}>{text}</TableContentTd>
                    </TableContentTbodyTr>
                )
            }  
        </>
    )
}

TalentAcquisition.propTypes = {

};

export default connect(
    state => ({
        data: paths([["kpi", "dataEmployee", "0"], ["kpi", "dataEmployee", "1"], ["kpi", "dataEmployee", "2"], ["kpi", "dataEmployee", "3"]], state),
    }),
    {}
)(TalentAcquisition);