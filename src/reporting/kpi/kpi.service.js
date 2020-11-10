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

export const getJobOrders = (idEmployee, dateStartTimestamp, dateEndTimestamp) =>
    get("query/JobOrder", {
        fields: "id",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateAdded>${dateStartTimestamp} AND dateAdded<=${dateEndTimestamp}`,
        count: "50"
    })