import { nth } from "ramda";
import React from "react"
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { Table, TableTheadTr, TableContentTh, TableContentTd, TableContentTbodyTr } from "../style/table_style"

const tableText = [
    "Business Development ",
    "Call",
    "Prospection meeting scheduled",
    "Prospection meeting done",
    "New vacancy",
    "CV sent",
    "Intake",
    "Project start"
]
const tableWeek = [
    "",
    "S1",
    "S2",
    "S3",
    "S4"
]

const BusinessManager = () => {
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
                            <TableContentTbodyTr>
                                <TableContentTd key={text}>{text}</TableContentTd>
                            </TableContentTbodyTr>
                        )
                    }

                </tbody>
            </Table>
        </div >
    )
}

BusinessManager.propTypes = {

};

export default connect(

)(BusinessManager);
