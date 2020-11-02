import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTbodyTrNoLine, TableContentTdTitleEmpty } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"

const TablePercentageTalentAcquisition = ({ dataConversionYTDRecruitment }) => {
    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitleEmpty></TableContentTdTitleEmpty>
            </TableContentTbodyTrNoLine>
            {
                Object.keys(dataConversionYTDRecruitment).map((key, i) => {
                    return (
                        <TableContentTbodyTr key={i}>
                            <TableContentTd>{dataConversionYTDRecruitment[key].CONVERSION_YTD}</TableContentTd>
                            <TableContentTd>{dataConversionYTDRecruitment[key].TOTAL_YTD}</TableContentTd>
                            <TableContentTd>{dataConversionYTDRecruitment[key].AVERAGE}</TableContentTd>
                        </TableContentTbodyTr>
                    )
                  })
            }
        </>
    )
}

TablePercentageTalentAcquisition.propTypes = {
    dataConversionYTDRecruitment: object,
};

export default connect(
    state => ({
        dataConversionYTDRecruitment: pathOr({}, ["kpi", "dataYTDEmployee", "objectConversionYTDRecruitment"], state)
    }),
    {}
)(TablePercentageTalentAcquisition);
