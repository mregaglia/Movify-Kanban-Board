import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr } from "../style/table_style"

const tableTextAcquisition = [
    "Recruitment",
    "Contacted by InMail",
    "Contacted by phone",
    "Interview scheduled",
    "No show",
    "Interview done",
    "Contract proposed",
    "Hired"
]

const TalentAcquisition = () => {
    return (
        <>
            <TableContentTbodyTr>
                <TableContentTdTitle>Recruitment</TableContentTdTitle>
            </TableContentTbodyTr>
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

    }),
    {}
)(TalentAcquisition);