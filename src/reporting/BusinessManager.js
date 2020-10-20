import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr } from "../style/table_style"
import TalentAcquisition from './TalentAcquisition'

const tableTextBusinessManager = [
    { key: 2, label: "Call" },
    { key: 3, label: "Prospection meeting scheduled" },
    { key: 4, label: "Prospection meeting done" },
    { key: 5, label: "New vacancy" },
    { key: 6, label: "CV sent" },
    { key: 7, label: "Intake" },
    { key: 8, label: "Project start" }
]

const BusinessManager = () => {

    return (
        <>
            <TableContentTbodyTr>
                <TableContentTdTitle>Business Development</TableContentTdTitle>
            </TableContentTbodyTr>
            {
                tableTextBusinessManager.map((text) =>
                    <TableContentTbodyTr key={text.key}>
                        <TableContentTd >{text.label}</TableContentTd>
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
