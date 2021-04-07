import { get, post } from "../../utils/api";
import { prop, pathOr, propOr } from "ramda"

export const getNoteFromEmployee = (idEmployee, dateStart, dateEnd, startValue) =>
    post(
        "search/Note",
        {
            query: `commentingPerson:${idEmployee} AND dateAdded:[${dateStart} TO ${dateEnd}]`
        },
        {
            fields: "action, candidates, clientContacts, dateAdded",
            sort: "-dateAdded",
            count: '50',
            start: `${startValue}`
        }
    );

export const getJobOrdersForYTD = (idEmployee, startDateOfTheYear, todayDate, start) =>
    post(
        "search/JobOrder",
        {
            query: `owner.id:${idEmployee} AND isDeleted:false AND dateAdded:[${startDateOfTheYear} TO ${todayDate}]`
        },
        {
            fields: "id",
            count: '50',
            start: `${start}`
        }
    );

export const getSubmissionStatusChangedProjectStart = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='Project' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    }).then(response => prop("count", response))

export const getJobOrders = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobOrder", {
        fields: "id, clientCorporation, title, clientContact",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`,
        count: "50"
    })

export const getAllJobOrdersOpen = (idEmployee) =>
    get("query/JobOrder", {
        fields: "id",
        where: `owner.id=${idEmployee} AND isDeleted=false AND isOpen=true`,
        count: "50"
    }).then(response => prop("data", response))

export const getJobSubmissionsByJobOrderId = (idJobOrder) =>
    get("query/JobSubmission", {
        fields: "id",
        where: `jobOrder.id=${idJobOrder} AND isDeleted=false`
    }).then(response => prop("data", response))

export const getProspectionMeetingSchedule = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/UserEditHistory", {
        fields: "targetEntity",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='Prospection scheduled' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    }).then(response => prop("count", response))

export const getSubmissionStatusChangedCvSent = (idJobSubmission, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id, dateAdded",
        where: `targetEntity.id=${idJobSubmission} AND fieldChanges.columnName='status' AND fieldChanges.newValue='WF Response' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`,
        orderBy: '+dateAdded',
        count: "1"
    }).then(response => propOr(0, "count", response))

export const getSubmissionStatusChangedCvSentById = (idJobSubmission) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id, dateAdded",
        where: `targetEntity.id=${idJobSubmission} AND fieldChanges.columnName='status' AND fieldChanges.newValue='WF Response'`
    })

export const countCVSentForWeek = (response, dateStartTimestamp, dateEndTimestamp) => {
    let dateAdded = pathOr(0, ['data', 0, 'dateAdded'], response)
    return (dateAdded >= dateStartTimestamp && dateAdded <= dateEndTimestamp) ? 1 : 0
} 
