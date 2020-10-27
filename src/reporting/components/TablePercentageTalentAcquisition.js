import React from "react";
import { connect } from "react-redux";
import { TableContentTd, TableContentTdTitle, TableContentTbodyTr } from "../../style/table_style"
import { pathOr } from 'ramda'
import { object } from "prop-types"

const TablePercentageTalentAcquisition = ({ dataConversionYTDRecruitment }) => {
    return (
        <>
            <TableContentTbodyTr>
                <TableContentTdTitle></TableContentTdTitle>
            </TableContentTbodyTr>
            {
                console.log(dataConversionYTDRecruitment)
            }
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
        dataConversionYTDRecruitment: pathOr({}, ["kpi", "dataEmployee", "objectConversionYTDRecruitment"], state)
    }),
    {}
)(TablePercentageTalentAcquisition);
