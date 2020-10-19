import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr } from "../style/table_style"
import TalentAcquisition from './TalentAcquisition'

const tableTextBusinessManager = [
    "Business Development ",
    "Call",
    "Prospection meeting scheduled",
    "Prospection meeting done",
    "New vacancy",
    "CV sent",
    "Intake",
    "Project start"
]

const BusinessManager = () => {

    return (
        <>
            <TableContentTbodyTr>
                <TableContentTdTitle>Business Development</TableContentTdTitle>
            </TableContentTbodyTr>
            {
                tableTextBusinessManager.map((text) =>
                    <TableContentTbodyTr>
                        <TableContentTd key={text}>{text}</TableContentTd>
                    </TableContentTbodyTr>

                )
            }
            <TableContentTbodyTr>
                <TableContentTdTitle>Recruitment</TableContentTdTitle>
            </TableContentTbodyTr>
            <TalentAcquisition />
        </>
    )
}

BusinessManager.propTypes = {

};

export default connect(
    state => ({

    }),
    {}
)(BusinessManager);
