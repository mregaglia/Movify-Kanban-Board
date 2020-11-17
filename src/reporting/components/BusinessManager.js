import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdLabel } from "../../style/table_style"
import { path, pathOr } from 'ramda'
import { object, bool } from "prop-types"
import Loader from 'react-loader-spinner'



const BusinessManager = ({ datas, isCvSentWeekLoading }) => {

    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle>Business Development</TableContentTdTitle>
            </TableContentTbodyTrNoLine>
            {
                console.log("cvSentLoading",isCvSentWeekLoading)
            }
            {
                Object.keys(datas).map((key, i) => {
                    if(datas[key].TITLE === "CV sent") {
                        if(isCvSentWeekLoading) {
                            return (
                                <TableContentTbodyTr key={i}>
                                    <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" /></TableContentTd>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" /></TableContentTd>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" /></TableContentTd>
                                    <TableContentTd><Loader type="ThreeDots" color="#00BFFF" height={20} width={20} color="#6BD7DA" /></TableContentTd>
                                </TableContentTbodyTr>
                            )
                        }else {
                            return (
                                <TableContentTbodyTr key={i}>
                                    <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                    <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                    <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                    <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                    <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                                </TableContentTbodyTr>
                            )
                        }
                        
                    }else{
                        return (
                            <TableContentTbodyTr key={i}>
                                <TableContentTdLabel>{datas[key].TITLE}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </TableContentTbodyTr>
                        )
                    }
                    
                  })
            }
        </>
    )
}

BusinessManager.propTypes = {
    datas: object,
    isCvSentWeekLoading: bool
};

export default connect(
    state => ({
        datas: pathOr({}, ["kpi", "dataEmployee", "datasBusinessManager"], state),
        isCvSentWeekLoading: path(["kpi", "isCvSentWeekLoading"], state)
    }),
    {}
)(BusinessManager);
