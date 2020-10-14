import React from 'react'

import { connect } from "react-redux";
import {Table, TableTheadTr, TableContentTh, TableContentTd, TableContentTbodyTr} from "../style/table_style"

const tableText = [
    "Recruitment",
    "Contacted by InMail",
    "Contacted by phone",
    "Interview scheduled",
    "No show",
    "Interview done",
    "Contract proposed",
    "Hired"
]

const tableWeek = [
    "",
    "S1",
    "S2",
    "S3",
    "S4"
]

const TalentAcquisition = () => {
    return (
        <div>
            <Table>
                <thead>
                    <TableTheadTr>
                        {
                            tableWeek.map((week) =>
                                <TableContentTh key={week}>{week}</TableContentTh>
                            )
                        }
                    </TableTheadTr>
                </thead>
                <tbody>

                    {
                        tableText.map((text) =>
                            <TableContentTbodyTr key={text}>
                                <TableContentTd key={text}>{text}</TableContentTd>
                            </TableContentTbodyTr>
                        )
                    }

                </tbody>
            </Table>
            
        </div >
        
    )
}

TalentAcquisition.propTypes = {

};

export default connect(
    state => ({

    }),
    {  }
)(TalentAcquisition);