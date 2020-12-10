import { get } from "../../utils/api";
import { pathOr } from "ramda"

export const getCompagnyNameByClientContactId = (id) =>
    get("query/ClientContact", {
        fields: "clientCorporation",
        where: `id=${id}`
    }).then(response => pathOr("", ["data", 0, "clientCorporation", "name"], response))