import { prop, path } from "ramda";
import { get } from "../utils/api";

export const getUserId = () => {
    return get("/settings/userId")
        .then(response => prop("userId", response))
}

export const getUserOccupation = (userId) => {
    return get("/entity/CorporateUser/" + userId, { fields: "occupation" })
        .then(response => path(["data", "occupation"], response))
}