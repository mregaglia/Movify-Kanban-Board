export const PROSPECTION = "Prospection"
export const CALL = "Call"
export const CALL_BUSINESS = "Call Business"
export const CALL_RECRUITMENT = "Call Recruitment"
export const INTAKE = "Intake"
export const NEW_VACANCY = "NEW VACANCY"
export const PROSPECTION_MEETING_SCHEDULE = "PROSPECTION_MEETING_SCHEDULE"
export const START_WEEK_DATE = "START_WEEK_DATE"
export const LINKED_INMAIL = "LinkedIn InMail"
export const INTERVIEW_SCHEDULE = "INTERVIEW_SCHEDULE"
export const NO_SHOW = "No show"
export const INTERVIEW_DONE = "Interview 1"
export const CONTRACT_PROPOSED = "Offer"


export const countData = (date, notes, cvSent, projectStart, newVacancy, prospectionMeetingSchedule, appointments) => {
  const countedActions = {
    START_WEEK_DATE: [date, getDateLabel(date)],
    PROSPECTION: 0,
    CALL_BUSINESS: 0,
    CALL_RECRUITMENT: 0,
    INTAKE: 0,
    CV_SENT: cvSent,
    PROJECT_START: projectStart,
    NEW_VACANCY: newVacancy,
    PROSPECTION_MEETING_SCHEDULE: prospectionMeetingSchedule,
    LINKED_INMAIL: 0,
    INTERVIEW_SCHEDULE: appointments,
    NO_SHOW: 0,
    INTERVIEW_DONE: 0,

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
      case LINKED_INMAIL:
        countedActions.LINKED_INMAIL++
        break;
      case NO_SHOW:
        countedActions.NO_SHOW++
        break;
      case INTERVIEW_DONE:
        countedActions.INTERVIEW_DONE++
        break;
      case CONTRACT_PROPOSED:
        countedActions.CONTRACT_PROPOSED++;
        break;
      default:
        break;
    }
  }

  return countedActions;
}


export const getDateLabel = (date) => {

  let day = date.toString().substring(6, 8).replace('0', '')
  let month = date.toString().substring(4, 6);

  switch (month) {
    case "01":
      return day + " january"
    case "02":
      return day + " february"
    case "03":
      return day + " march"
    case "04":
      return day + " april"
    case "05":
      return day + " may"
    case "06":
      return day + " june"
    case "07":
      return day + " july"
    case "08":
      return day + " august"
    case "09":
      return day + " september"
    case "10":
      return day + " october"
    case "11":
      return day + " november"
    case "12":
      return day + " december"
    default:
      return ""
  }
}
