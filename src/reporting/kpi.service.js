import { get, post, put, del } from "../utils/api";

export const getNoteFromEmployee = (idEmployee, dateStart, dateEnd) =>
    post(
        "search/Note",
        {
            query: `commentingPerson:${idEmployee} AND dateAdded:[${dateStart} TO ${dateEnd}]`
        },
        {
            fields:
                "*",
            sort: "-dateAdded"
        }
    );