import { get } from "../utils/api";

export const getNoteFromEmployee = (idEmployee, dateStart, dateEnd) =>
    get("search/Note",
        {
            query: `commentingPerson:${idEmployee} AND isDeleted:false AND dateAdded:[${dateStart} TO ${dateEnd}]`,
            fields: "*",
            sort: "-dateAdded"
        });