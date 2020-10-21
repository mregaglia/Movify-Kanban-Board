import { get, post } from "../../utils/api";

export const getNoteFromEmployee = (idEmployee, dateStart, dateEnd) =>
    post(
        "search/Note",
        {
            query: `commentingPerson:${idEmployee} AND dateAdded:[${dateStart} TO ${dateEnd}]`
        },
        {
            fields:"action, candidates, clientContacts",
            sort: "-dateAdded"
        }
    );

export const getJobOrderFromEmployee = (idEmployee, dateStart, dateEnd) =>
    get("query/JobOrder", {
        fields: "id",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateAdded>${dateStart} AND dateAdded<=${dateEnd}`,
        count: "50"
    });