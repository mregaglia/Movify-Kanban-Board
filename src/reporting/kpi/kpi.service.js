import { get, post } from "../../utils/api";
import { prop } from "ramda"

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

export const getSubmissionStatusChangedProjectStart = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='Project' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    }).then(response => prop("count", response))

export const getJobOrders = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobOrder", {
        fields: "id",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`,
        count: "50"
    })

export const getAllJobOrders = (idEmployee) =>
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

export const getSubmissionStatusChangedCvSent = (idJobSubmission, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id",
        where: `targetEntity.id=${idJobSubmission} AND fieldChanges.columnName='status' AND fieldChanges.newValue='WF Response' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    }).then(response => prop("count", response))

export const getProspectionMeetingSchedule = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/UserEditHistory", {
        fields: "targetEntity",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='Prospection schedule' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    }).then(response => prop("count", response))