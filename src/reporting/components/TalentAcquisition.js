import React from 'react'
import { useSelector } from "react-redux";
import { TableContentTd, TableContentTbodyTr, TableContentTdTitle, TableContentTbodyTrNoLine, TableContentTdLabel, TableContentTdBoldClickable, TableContentTdLabelBold, TableContentTdBold } from "../../style/table_style"
import { v4 as uuid } from 'uuid'
import { LABEL_INTERVIEW_DONE, LABEL_INTERVIEW_SCHEDULED, LABEL_CONTACTED_BY_INMAIL, LABEL_PEOPLE_MANAGEMENT_ACTIVITIES, HIRED } from '../../utils/reporting'
import {
    BUSINESS_MANAGER,
    SOURCING_OFFICER
} from '../../auth/user.sagas'
import {
    LINKED_INMAIL,
    INTERVIEW_SCHEDULED,
    INTERVIEW_DONE
} from '../expandView/expandView.sagas'
import {
    FIRST_WEEK, SECOND_WEEK, FOURTH_WEEK, THIRD_WEEK
} from '../kpi/kpi.sagas'
import ReactTooltip from 'react-tooltip'
import ExpandViewDetailCandidates from './ExpandViewDetailCandidates'

const tableWeek = [FIRST_WEEK, SECOND_WEEK, THIRD_WEEK, FOURTH_WEEK]

const TalentAcquisition = () => {
    const {
        datas,
        occupation,
    } = useSelector(({ kpi, employees }) => ({
        datas: kpi?.dataEmployee?.datasRecruitment ?? {},
        occupation: employees?.employeeSelected?.occupation ?? ''
    }))

    return (
        <>
            <TableContentTbodyTrNoLine>
                <TableContentTdTitle isBM={occupation.includes(BUSINESS_MANAGER)}>Recruitment</TableContentTdTitle>
            </TableContentTbodyTrNoLine>

            {
                Object.keys(datas).map((key, i) => {
                    const title = datas[key].TITLE
                    if (title === LABEL_CONTACTED_BY_INMAIL && occupation.includes(SOURCING_OFFICER)) {
                        return (

                            <TableContentTbodyTr key={uuid()}>
                                <TableContentTdLabelBold >{title}</TableContentTdLabelBold>
                                {
                                    tableWeek.map((week) => {
                                        if (datas[key][week] === 0) {
                                            return (<TableContentTdBold id={key + week}>0</TableContentTdBold>)
                                        } else {
                                            return (
                                                <TableContentTdBoldClickable key={uuid()} data-for={i + '' + key + '' + week} data-event="click" data-tip>{datas[key][week]}
                                                    <ReactTooltip id={i + '' + key + '' + week} globalEventOff='click' place="right" clickable isCapture>
                                                        <ExpandViewDetailCandidates week={week} title={LINKED_INMAIL} />
                                                    </ReactTooltip>
                                                </TableContentTdBoldClickable>
                                            )
                                        }
                                    }


                                    )
                                }

                            </TableContentTbodyTr>
                        )
                    } else if ((title === LABEL_INTERVIEW_DONE && !occupation.includes(SOURCING_OFFICER))) {
                        return (
                            <TableContentTbodyTr key={uuid()}>
                                <TableContentTdLabelBold >{title}</TableContentTdLabelBold>
                                {
                                    tableWeek.map((week) => {
                                        if (datas[key][week] === 0) {
                                            return (<TableContentTdBold id={key + week}>0</TableContentTdBold>)
                                        } else {
                                            return (
                                                <TableContentTdBoldClickable key={uuid()} data-for={i + '' + key + '' + week} data-event="click" data-tip>{datas[key][week]}
                                                    <ReactTooltip id={i + '' + key + '' + week} globalEventOff='click' place="right" clickable isCapture>
                                                        <ExpandViewDetailCandidates week={week} title={INTERVIEW_DONE} />
                                                    </ReactTooltip>
                                                </TableContentTdBoldClickable>
                                            )
                                        }
                                    }
                                    )
                                }

                            </TableContentTbodyTr>
                        )
                    } else if ((title === LABEL_INTERVIEW_SCHEDULED && !occupation.includes(BUSINESS_MANAGER))) {
                        return (
                            <TableContentTbodyTr key={uuid()}>
                                <TableContentTdLabelBold >{title}</TableContentTdLabelBold>
                                {
                                    tableWeek.map((week) => {
                                        if (datas[key][week] === 0) {
                                            return (<TableContentTdBold id={key + week}>0</TableContentTdBold>)
                                        } else {
                                            return (
                                                <TableContentTdBoldClickable key={uuid()} data-for={i + '' + key + '' + week} data-event="click" data-tip>{datas[key][week]}
                                                    <ReactTooltip id={i + '' + key + '' + week} globalEventOff="click" place="right" clickable isCapture >
                                                        <ExpandViewDetailCandidates week={week} title={INTERVIEW_SCHEDULED} />
                                                    </ReactTooltip>
                                                </TableContentTdBoldClickable>
                                            )
                                        }
                                    }
                                    )

                                }
                            </TableContentTbodyTr>
                        )
                    } else if ((title === LABEL_PEOPLE_MANAGEMENT_ACTIVITIES && occupation === BUSINESS_MANAGER) || (title === HIRED && occupation !== BUSINESS_MANAGER)) {
                        return (
                            <tr>
                                <TableContentTdLabel>{title}</TableContentTdLabel>
                                <TableContentTd>{datas[key].FIRST_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].SECOND_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].THIRD_WEEK}</TableContentTd>
                                <TableContentTd>{datas[key].FOURTH_WEEK}</TableContentTd>
                            </tr>
                        )
                    } else {
                        return (
                            <TableContentTbodyTr key={uuid()}>
                                <TableContentTdLabel>{title}</TableContentTdLabel>
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

export default TalentAcquisition
