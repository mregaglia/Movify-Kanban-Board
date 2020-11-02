import { BUSINESS_MANAGER, SOURCING_OFFICER } from '../reporting/components/EmployeeData'
import { FIRST_WEEK } from '../reporting/kpi/kpi.sagas'

import GaugeLimitFile from '../reporting/gauge-limit.json'

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
export const LABEL_INTAKE = "Intake"
export const LABEL_PROJECT_START = "Project Start"

export const LABEL_CONTACTED_BY_INMAIL = "Contacted by InMail"
export const LABEL_CONTACTED_BY_PHONE = "Contacted by phone"
export const LABEL_INTERVIEW_SCHEDULE = "Interview scheduled"
export const LABEL_NO_SHOW = "No Show"
export const LABEL_INTERVIEW_DONE = "Interview done"
export const LABEL_CONTRACT_PROPOSED = "Contract proposed"
export const LABEL_HIRED = "Hired"

export const CONVERSION_YTD = "CONVERSION_YTD"
export const TOTAL_YTD = "TOTAL_YTD"


export const initalizeObjectBusinessManager = (occupation) => {
  if (occupation === BUSINESS_MANAGER) {
    return {
      CALL: { TITLE: LABEL_CALL, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      PROSPECTION_MEETING_SCHEDULE: { TITLE: LABEL_PROSPECTION_MEETING_SCHEDULE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      PROSPECTION_MEETING_DONE: { TITLE: LABEL_MEETING_DONE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      NEW_VACANCY: { TITLE: LABEL_NEW_VACANCY, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      CV_SENT: { TITLE: LABEL_CV_SENT, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      INTAKE: { TITLE: LABEL_INTAKE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
      PROJECT_START: { TITLE: LABEL_PROJECT_START, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    }
  } else {
    return {}
  }
}

export const initalizeObjectRecruitment = () => {
  return {
    CONTACTED_BY_INMAIL: { TITLE: LABEL_CONTACTED_BY_INMAIL, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    CONTACTED_BY_PHONE: { TITLE: LABEL_CONTACTED_BY_PHONE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    INTERVIEW_SCHEDULE: { TITLE: LABEL_INTERVIEW_SCHEDULE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    NO_SHOW: { TITLE: LABEL_NO_SHOW, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    INTERVIEW_DONE: { TITLE: LABEL_INTERVIEW_DONE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    CONTRACT_PROPOSED: { TITLE: LABEL_CONTRACT_PROPOSED, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    HIRED: { TITLE: LABEL_HIRED, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 }
  }
}

export const initializeObjectConversionYTDBusinessManager = () => {
  return {
    CALL: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    PROSPECTION_MEETING_SCHEDULE: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    PROSPECTION_MEETING_DONE: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    NEW_VACANCY: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    CV_SENT: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    INTAKE: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    PROJECT_START: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
  }
}

export const initializeObjectConversionYTDRecruitment = () => {
  return {
    CONTACTED_BY_INMAIL: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    CONTACTED_BY_PHONE: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    INTERVIEW_SCHEDULE: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    NO_SHOW: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    INTERVIEW_DONE: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    CONTRACT_PROPOSED: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 },
    HIRED: { CONVERSION_YTD: 0, TOTAL_YTD: 0, AVERAGE: 0 }
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

export const countDataRecruitment = (objectDataRecruitment, labelWeek, notes) => {
  countNoteForRecruitment(labelWeek, notes, objectDataRecruitment)
  return objectDataRecruitment;
}

export const countNoteForRecruitment = (labelWeek, notes, objectDataRecruitment) => {
  let data = notes;
  if (data.length === 0) return objectDataRecruitment
  for (let i = 0; i < data.length; i++) {

    let action = data[i].action

    switch (action) {
      case CALL:
        if (data[i].candidates.total === 1) objectDataRecruitment.CONTACTED_BY_PHONE[labelWeek]++;
        break;
      case LINKED_INMAIL:
        objectDataRecruitment.CONTACTED_BY_INMAIL[labelWeek]++
        break;
      case NO_SHOW:
        objectDataRecruitment.NO_SHOW[labelWeek]++
        break;
      case INTERVIEW_DONE:

        objectDataRecruitment.INTERVIEW_DONE[labelWeek]++
        break;
      case CONTRACT_PROPOSED:
        objectDataRecruitment.CONTRACT_PROPOSED[labelWeek]++;
        break;
      default:
        break;
    }
  }
}

export const countNoteForBusinessManager = (labelWeek, notes, objectDataBusinessManager) => {
  let data = notes;
  if (data.length === 0) return objectDataBusinessManager

  for (let i = 0; i < data.length; i++) {

    let action = data[i].action

    switch (action) {
      case PROSPECTION:
        objectDataBusinessManager.PROSPECTION_MEETING_DONE[labelWeek]++;
        break;
      case CALL:
        if (data[i].clientContacts.total) objectDataBusinessManager.CALL[labelWeek]++;
        break;
      default:
        break;
    }
  }
}

export const calculateConversionYTDBusinessManager = (objectDataBusinessManager, objectConversionYTDBusinessManager) => {

  let prospectionMeetingScheduleConversionYTD = Math.round((objectDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[FIRST_WEEK] / objectDataBusinessManager.CALL[FIRST_WEEK])) * 100
  objectConversionYTDBusinessManager.PROSPECTION_MEETING_SCHEDULE[CONVERSION_YTD] = (isNaN(prospectionMeetingScheduleConversionYTD) || (prospectionMeetingScheduleConversionYTD === Infinity)) ? 0 : prospectionMeetingScheduleConversionYTD;

  let prospectionMeetingDoneConversionYTD = Math.round((objectDataBusinessManager.PROSPECTION_MEETING_DONE[FIRST_WEEK] / objectDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[FIRST_WEEK])) * 100
  objectConversionYTDBusinessManager.PROSPECTION_MEETING_DONE[CONVERSION_YTD] = (isNaN(prospectionMeetingDoneConversionYTD) || (prospectionMeetingDoneConversionYTD === Infinity)) ? 0 : prospectionMeetingDoneConversionYTD;

  let newVacancyConversionYTD = Math.round(objectDataBusinessManager.NEW_VACANCY[FIRST_WEEK] / objectDataBusinessManager.PROSPECTION_MEETING_DONE[FIRST_WEEK]) * 100
  objectConversionYTDBusinessManager.NEW_VACANCY[CONVERSION_YTD] = (isNaN(newVacancyConversionYTD) || (newVacancyConversionYTD === Infinity)) ? 0 : newVacancyConversionYTD;

  let cvSentConversionYTD = Math.round(objectDataBusinessManager.CV_SENT[FIRST_WEEK] / objectDataBusinessManager.NEW_VACANCY[FIRST_WEEK]) * 100
  objectConversionYTDBusinessManager.CV_SENT[CONVERSION_YTD] = (isNaN(cvSentConversionYTD) || (cvSentConversionYTD === Infinity)) ? 0 : cvSentConversionYTD;

  let intakeConversionYTD = Math.round(objectDataBusinessManager.INTAKE[FIRST_WEEK] / objectDataBusinessManager.NEW_VACANCY[FIRST_WEEK]) * 100
  objectConversionYTDBusinessManager.INTAKE[CONVERSION_YTD] = (isNaN(intakeConversionYTD) || (intakeConversionYTD === Infinity)) ? 0 : intakeConversionYTD;

  let projectStart = Math.round((objectDataBusinessManager.PROJECT_START[FIRST_WEEK] / objectDataBusinessManager.INTAKE[FIRST_WEEK])) * 100
  objectConversionYTDBusinessManager.PROJECT_START[CONVERSION_YTD] = (isNaN(projectStart) || (projectStart === Infinity)) ? 0 : projectStart;

  return objectConversionYTDBusinessManager;
}

export const calculateConversionYTDRecruitment = (objectDataRecruitment, objectConversionYTDRecruitment) => {

  let interviewScheduleConversionYTD = Math.round(objectDataRecruitment.INTERVIEW_SCHEDULE[FIRST_WEEK] / (objectDataRecruitment.CONTACTED_BY_INMAIL[FIRST_WEEK] + objectDataRecruitment.CONTACTED_BY_PHONE[FIRST_WEEK])) * 100
  objectConversionYTDRecruitment.INTERVIEW_SCHEDULE[CONVERSION_YTD] = (isNaN(interviewScheduleConversionYTD) || (interviewScheduleConversionYTD === Infinity)) ? 0 : interviewScheduleConversionYTD;

  let noShowConversionYTD = Math.round(objectDataRecruitment.NO_SHOW[FIRST_WEEK] / objectDataRecruitment.INTERVIEW_SCHEDULE[FIRST_WEEK]) * 100
  objectConversionYTDRecruitment.NO_SHOW[CONVERSION_YTD] = (isNaN(noShowConversionYTD) || (noShowConversionYTD === Infinity)) ? 0 : noShowConversionYTD;

  let interviewDoneConversionYTD = Math.round(objectDataRecruitment.INTERVIEW_DONE[FIRST_WEEK] / objectDataRecruitment.INTERVIEW_SCHEDULE[FIRST_WEEK]) * 100
  objectConversionYTDRecruitment.INTERVIEW_DONE[CONVERSION_YTD] = (isNaN(interviewDoneConversionYTD) || (interviewDoneConversionYTD === Infinity)) ? 0 : interviewDoneConversionYTD;

  let contactProposedConversionYTD = Math.round(objectDataRecruitment.CONTRACT_PROPOSED[FIRST_WEEK] / objectDataRecruitment.INTERVIEW_DONE[FIRST_WEEK]) * 100
  objectConversionYTDRecruitment.CONTRACT_PROPOSED[CONVERSION_YTD] = (isNaN(contactProposedConversionYTD) || (contactProposedConversionYTD === Infinity)) ? 0 : contactProposedConversionYTD;

  let hiredConversionYTD = Math.round(objectDataRecruitment.HIRED[FIRST_WEEK] / objectDataRecruitment.CONTRACT_PROPOSED[FIRST_WEEK]) * 100
  objectConversionYTDRecruitment.HIRED[CONVERSION_YTD] = (isNaN(hiredConversionYTD) || (hiredConversionYTD === Infinity)) ? 0 : hiredConversionYTD;

  return objectConversionYTDRecruitment;
}

export const calculateTotalYTDRecruitment = (notesOfyear, objectYTDRecruitment) => {

  if (notesOfyear.length === 0) return objectYTDRecruitment

  for (let i = 0; i < notesOfyear.length; i++) {

    let action = notesOfyear[i].action

    switch (action) {
      case CALL:
        if (notesOfyear[i].candidates.total === 1) objectYTDRecruitment.CONTACTED_BY_PHONE[TOTAL_YTD]++;
        break;
      case LINKED_INMAIL:
        objectYTDRecruitment.CONTACTED_BY_INMAIL[TOTAL_YTD]++
        break;
      case NO_SHOW:
        objectYTDRecruitment.NO_SHOW[TOTAL_YTD]++
        break;
      case INTERVIEW_DONE:
        objectYTDRecruitment.INTERVIEW_DONE[TOTAL_YTD]++
        break;
      case CONTRACT_PROPOSED:
        objectYTDRecruitment.CONTRACT_PROPOSED[TOTAL_YTD]++;
        break;
      default:
        break;
    }
  }


  return objectYTDRecruitment
}

export const calculateTotalYTDBusinessManager = (notesOfyear, objectYTDBusinessManager) => {

  if (notesOfyear.length === 0) return objectYTDBusinessManager

  for (let i = 0; i < notesOfyear.length; i++) {

    let action = notesOfyear[i].action

    switch (action) {
      case PROSPECTION:
        objectYTDBusinessManager.PROSPECTION_MEETING_DONE[TOTAL_YTD]++;
        break;
      case CALL:
        if (notesOfyear[i].clientContacts.total) objectYTDBusinessManager.CALL[TOTAL_YTD]++;
        break;
      default:
        break;
    }
  }
  return objectYTDBusinessManager
}

export const calculateAverageYTDBusinessManager = (objectConversionYTDBusinessManager, weekNumberOfTheYear) => {
  Object.keys(objectConversionYTDBusinessManager).map((key, i) => {
    objectConversionYTDBusinessManager[key].AVERAGE = Math.floor(objectConversionYTDBusinessManager[key].TOTAL_YTD / weekNumberOfTheYear)
  })
  return objectConversionYTDBusinessManager
}

export const calculateAverageYTDRecruitment = (objectConversionYTDRecruitment, weekNumberOfTheYear) => {
  Object.keys(objectConversionYTDRecruitment).map((key, i) => {
    objectConversionYTDRecruitment[key].AVERAGE = Math.floor(objectConversionYTDRecruitment[key].TOTAL_YTD / weekNumberOfTheYear)
  })
  return objectConversionYTDRecruitment
}

export const getGaugeLimitFromFile = (occupation) => {
  if (occupation === BUSINESS_MANAGER) {
    return GaugeLimitFile.BUSINESS_MANAGER
  } else if (occupation === SOURCING_OFFICER) {
    return GaugeLimitFile.SOURCING_OFFICER
  }
}