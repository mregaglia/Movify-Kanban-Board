import { get, post} from "../../utils/api";

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

    export const getJobOfferFromEmployee = (idEmployee, dateStart, dateEnd) =>
    get("query/JobOrder", {
        fields: "*",
        where: `owner.id=${idEmployee} AND isDeleted=false AND dateAdded>${dateStart} AND dateAdded<=${dateEnd}`,
        count: "50"
    });