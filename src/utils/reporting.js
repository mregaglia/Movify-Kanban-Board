const PROSPECTION = "Prospection"

const CALL = "Call"
export const CALL_BUSINESS = "Call Business"
export const CALL_RECRUITMENT = "Call Recruitment"

export const countData = (date, notes, cvSent, projectStart) => {
    const countedActions = {
        START_WEEK_DATE: date,
        PROSPECTION: 0,
        CALL_BUSINESS: 0,
        CALL_RECRUITMENT: 0,
        CV_SENT: cvSent,
        PROJECT_START: projectStart
    }

    let data = notes.data;

    if (data.length === 0) return countedActions

    for (let i = 0; i < data.length; i++) {
        let action = data[i].action

        switch (action) {
            case PROSPECTION:
                countedActions.PROSPECTION++;
                break;
            case CALL:
                if (data[i].candidates.total === 1) countedActions.CALL_RECRUITMENT++;
                else if (data[i].clientContacts.total) countedActions.CALL_BUSINESS++;
                break;
            default:
                break;
        }
    }

    return countedActions;
}

