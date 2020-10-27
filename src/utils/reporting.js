import { BUSINESS_MANAGER } from '../reporting/components/EmployeeData'

export const PROSPECTION = "Prospection"
export const CALL = "Call"
export const CALL_RECRUITMENT = "Contacted by phone"
export const INTAKE = "Intake"
export const LINKED_INMAIL = "LinkedIn InMail"
export const NO_SHOW = "No show"
export const INTERVIEW_DONE = "Interview 1"
export const CONTRACT_PROPOSED = "Offer"

export const LABEL_DATES = "DATES"
export const LABEL_CALL = "Call"
export const LABEL_PROSPECTION_MEETING_SCHEDULE = "Prospection meeting scheduled"
export const LABEL_MEETING_DONE = "Prospection meeting done"
export const LABEL_NEW_VACANCY = "New vacancy"
export const LABEL_CV_SENT = "CV sent"
export const LABEL_INTAKE = "intake"
export const LABEL_PROJECT_START = "Project Start"

export const LABEL_CONTACTED_BY_INMAIL = "Contacted by InMail"
export const LABEL_CONTACTED_BY_PHONE = "Contacted by phone"
export const LABEL_INTERVIEW_SCHEDULE = "Interview Schedule"
export const LABEL_NO_SHOW = "No Show"
export const LABEL_INTERVIEW_DONE = "Interview done"
export const LABEL_CONTRACT_PROPOSED = "Contract proposed"
export const LABEL_HIRED = "Hired"


export const initalizeObjectBusinessManager = (occupation) => {
  if(occupation === BUSINESS_MANAGER) {
    return {
      CALL: { TITLE: LABEL_CALL,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      PROSPECTION_MEETING_SCHEDULE: { TITLE: LABEL_PROSPECTION_MEETING_SCHEDULE,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      PROSPECTION_MEETING_DONE: { TITLE: LABEL_MEETING_DONE,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      NEW_VACANCY: { TITLE: LABEL_NEW_VACANCY,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      CV_SENT: { TITLE: LABEL_CV_SENT,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      INTAKE: { TITLE: LABEL_INTAKE,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      PROJECT_START: { TITLE: LABEL_PROJECT_START,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    }
  } else {
    return {}
  }
}

export const initalizeObjectRecruitment = () => {
  return {
    CONTACTED_BY_INMAIL: { TITLE: LABEL_CONTACTED_BY_INMAIL,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    CONTACTED_BY_PHONE: { TITLE: LABEL_CONTACTED_BY_PHONE,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    INTERVIEW_SCHEDULE: { TITLE: LABEL_INTERVIEW_SCHEDULE,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    NO_SHOW: {TITLE: LABEL_NO_SHOW, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    INTERVIEW_DONE: {TITLE: LABEL_INTERVIEW_DONE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    CONTRACT_PROPOSED: {TITLE: LABEL_CONTRACT_PROPOSED, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    HIRED: { TITLE: LABEL_HIRED,FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 }
  }
}

export const initializeObjectDate = () => {
  return {
    DATES: { FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
  }
}

export const countDataBusinessManager = (objectDataBusinessManager, labelWeek, notes) => {
  countNoteForBusinessManager(labelWeek, notes, objectDataBusinessManager)
  return objectDataBusinessManager;
}

export const countDataSourcingOfficer = (objectDataRecruitment, labelWeek, notes) => {
  countNoteForRecruitment(labelWeek, notes, objectDataRecruitment)
  return objectDataRecruitment;
}

export const countNoteForRecruitment = (labelWeek, notes, objectDataEmployee) => {
  let data = notes.data;
  if (data.length === 0) return objectDataEmployee

  for (let i = 0; i < data.length; i++) {

    let action = data[i].action

    switch (action) {
      case CALL:
        if (data[i].candidates.total === 1) objectDataEmployee.CONTACTED_BY_PHONE[labelWeek]++;
        break;
      case LINKED_INMAIL:
        objectDataEmployee.CONTACTED_BY_INMAIL[labelWeek]++
        break;
      case NO_SHOW:
        objectDataEmployee.NO_SHOW[labelWeek]++
        break;
      case INTERVIEW_DONE:
        objectDataEmployee.INTERVIEW_DONE[labelWeek]++
        break;
      case CONTRACT_PROPOSED:
        objectDataEmployee.CONTRACT_PROPOSED[labelWeek]++;
        break;
      default:
        break;
    }
  }
}

export const countNoteForBusinessManager = (labelWeek, notes, objectDataEmployee) => {
  let data = notes.data;
  if (data.length === 0) return objectDataEmployee

  for (let i = 0; i < data.length; i++) {

    let action = data[i].action
    
    switch (action) {
      case PROSPECTION:
        objectDataEmployee.PROSPECTION_MEETING_DONE[labelWeek]++;
        break;
      case CALL:
        if (data[i].clientContacts.total) objectDataEmployee.CALL[labelWeek]++;
        break;
      default:
        break;
    }
  }
}

export const calculateConversionYTD = () => {

}