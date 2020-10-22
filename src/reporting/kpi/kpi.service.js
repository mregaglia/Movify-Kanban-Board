import { get, post } from "../../utils/api";

export const getNoteFromEmployee = (idEmployee, dateStart, dateEnd) =>
    post(
        "search/Note",
        {
            query: `commentingPerson:${idEmployee} AND dateAdded:[${dateStart} TO ${dateEnd}]`
        },
        {
            fields: "action, candidates, clientContacts",
            sort: "-dateAdded"
        }
    );

export const getSubmissionStatusChangedCvSent = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='WF Response' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    });

export const getSubmissionStatusChangedProjectStart = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobSubmissionEditHistory", {
        fields: "id",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='Project' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    });

export const getJobOrders = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobOrder", {
        fields: "id",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`,
        count: "50"
    });


export const getProspectionMeetingSchedule = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/UserEditHistory", {
        fields: "targetEntity",
        where: `modifyingPerson.id=${idEmployee} AND fieldChanges.columnName='status' AND fieldChanges.newValue='Prospection schedule' AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`
    });


export const getAppointment = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/Appointment", {
        fields: "id",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateBegin>${dateStartTimestamp} AND dateBegin<=${dateEndTimestamp}`,
        sort: "-dateBegin",
        count: "50"
    });
