const PROSPECTION = "Prospection"

export const CALL = "Call"
export const CALL_BUSINESS = "Call Business"
export const CALL_RECRUITMENT = "Call Recruitment"
export const INTAKE = "Intake"
export const NEW_VACANCY = "NEW VACANCY"
export const PROSPECTION_MEETING_SCHEDULE = "PROSPECTION_MEETING_SCHEDULE"


export const countData = (date, notes, cvSent, projectStart, newVacancy, prospectionMeetingSchedule) => {
    const countedActions = {
        START_WEEK_DATE: date,
        PROSPECTION: 0,
        CALL_BUSINESS: 0,
        CALL_RECRUITMENT: 0,
        INTAKE: 0,
        CV_SENT: cvSent,
        PROJECT_START: projectStart,
        NEW_VACANCY: newVacancy,
        PROSPECTION_MEETING_SCHEDULE: prospectionMeetingSchedule
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
            case INTAKE:
                countedActions.INTAKE++;
                break;
            default:
                break;
        }
    }

    return countedActions;
}

