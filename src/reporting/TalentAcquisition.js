import React from 'react'
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr } from "../style/table_style"

const tableTextAcquisition = [
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