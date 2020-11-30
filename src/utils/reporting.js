import {
  BUSINESS_MANAGER,
  SOURCING_OFFICER,
  TALENT_ACQUISITION
} from '../auth/user.sagas'

import GaugeLimitFile from '../reporting/gauge-limit.json'

export const PROSPECTION = "Prospection"
export const CALL = "Call"
export const CALL_RECRUITMENT = "Contacted by phone"
export const INTAKE = "Intake"
export const LINKED_INMAIL = "LinkedIn InMail"
export const NO_SHOW = "No show"
export const INTERVIEW_DONE_1 = "Interview 1"
export const INTERVIEW_DONE_2 = "Interview 2"
export const INTERVIEW_DONE_3 = "Interview 3"
export const CONTRACT_PROPOSED = "Offer"
export const INTERVIEW_SCHEDULED = "Interview Scheduled"
export const PROSPECTION_SCHEDULED = "Prospection scheduled"
export const PROJECT_START = "Kick Off Meeting"
export const HIRED = "Hired"

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

export const initializeObjectCvSent = () => {
  return {
    TITLE: LABEL_CV_SENT,
    FIRST_WEEK: 0,
    SECOND_WEEK: 0,
    THIRD_WEEK: 0,
    FOURTH_WEEK: 0
  }
}

export const initialiserObjectNewVacancyYTD = () => {
  return {
    CONVERSION_YTD: {
      NEW_VACANCY: 0,
    },
    TOTAL_YTD: {
      NEW_VACANCY: 0
    },
    AVERAGE: {
      NEW_VACANCY: 0
    }
  }
}

export const initialiserObjectCVSentYTD = () => {
  return {
    CONVERSION_YTD: {
      CV_SENT: 0,
    },
    TOTAL_YTD: {
      CV_SENT: 0
    },
    AVERAGE: {
      CV_SENT: 0
    }
  }
}

export const initalizeObjectRecruitment = () => {
  return {
    CONTACTED_BY_INMAIL: { TITLE: LABEL_CONTACTED_BY_INMAIL, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    CONTACTED_BY_PHONE: { TITLE: LABEL_CONTACTED_BY_PHONE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    INTERVIEW_SCHEDULED: { TITLE: LABEL_INTERVIEW_SCHEDULE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    NO_SHOW: { TITLE: LABEL_NO_SHOW, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    INTERVIEW_DONE: { TITLE: LABEL_INTERVIEW_DONE, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    CONTRACT_PROPOSED: { TITLE: LABEL_CONTRACT_PROPOSED, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
    HIRED: { TITLE: LABEL_HIRED, FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 }
  }
}

export const initializeObjectConversionYTDBusinessManager = () => {
  return {
    CONVERSION_YTD: {
      CALL: "-",
      PROSPECTION_MEETING_SCHEDULE: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0
    },
    TOTAL_YTD: {
      CALL: 0,
      PROSPECTION_MEETING_SCHEDULE: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0
    },
    AVERAGE: {
      CALL: 0,
      PROSPECTION_MEETING_SCHEDULE: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0
    }
  }
}

export const initializeObjectConversionYTDRecruitment = () => {
  return {
    TOTAL_YTD: {
      CONTACTED_BY_INMAIL: 0,
      CONTACTED_BY_PHONE: 0,
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0
    },
    AVERAGE: {
      CONTACTED_BY_INMAIL: 0,
      CONTACTED_BY_PHONE: 0,
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0
    },
    CONVERSION_YTD: {
      CONTACTED_BY_INMAIL: "-",
      CONTACTED_BY_PHONE: "-",
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0
    }
  }
}

export const initializeObjectDataRecruitmentAndIds = () => {
  return {
    OBJECT_DATA_RECRUITMENT: {},
    SOURCING_IDS: []
  }
}

export const initializeObjectDate = () => {
  return {
    DATES: { FIRST_WEEK: 0, SECOND_WEEK: 0, THIRD_WEEK: 0, FOURTH_WEEK: 0 },
  }
}

export const countNoteForRecruitment = (labelWeek, notes, objectDataRecruitment) => {
  let data = notes;
  if (data.length === 0) return objectDataRecruitment
  for (let i = 0; i < data.length; i++) {

    let action = data[i].action

    switch (action) {
      case NO_SHOW:
        objectDataRecruitment.NO_SHOW[labelWeek]++
        break;
      case INTERVIEW_DONE_1 || INTERVIEW_DONE_2 || INTERVIEW_DONE_3:
        objectDataRecruitment.INTERVIEW_DONE[labelWeek]++
        break;
      case CONTRACT_PROPOSED:
        objectDataRecruitment.CONTRACT_PROPOSED[labelWeek]++;
        break;
      case CALL:
        if (data[i].candidates.total === 1) objectDataRecruitment.CONTACTED_BY_PHONE[labelWeek]++;
        break;
      case LINKED_INMAIL:
        objectDataRecruitment.CONTACTED_BY_INMAIL[labelWeek]++
        break;
      case INTERVIEW_SCHEDULED:
        if (data[i].candidates.total === 1) objectDataRecruitment.INTERVIEW_SCHEDULED[labelWeek]++
        break;
      case HIRED:
        objectDataRecruitment.HIRED[labelWeek]++
        break;
      default:
        break;
    }
  }

  return objectDataRecruitment
}

export const countNoteForRecruitmentAndIdsSourcing = (labelWeek, notes, objectDataRecruitment, objectDataRecruitmentAndSourcingIds) => {
  let data = notes;
  if (data.length === 0) return objectDataRecruitment

  for (let i = 0; i < data.length; i++) {

    let action = data[i].action

    switch (action) {
      case NO_SHOW:
        objectDataRecruitment.NO_SHOW[labelWeek]++
        break;
      case INTERVIEW_DONE_1 || INTERVIEW_DONE_2 || INTERVIEW_DONE_3:
        objectDataRecruitment.INTERVIEW_DONE[labelWeek]++
        break;
      case CONTRACT_PROPOSED:
        objectDataRecruitment.CONTRACT_PROPOSED[labelWeek]++;
        break;
      case CALL:
        if (data[i].candidates.total === 1) {
          objectDataRecruitment.CONTACTED_BY_PHONE[labelWeek]++;
          objectDataRecruitmentAndSourcingIds.SOURCING_IDS = [...objectDataRecruitmentAndSourcingIds.SOURCING_IDS, data[i].candidates.data[0].id]
        }
        break;
      case LINKED_INMAIL:
        objectDataRecruitment.CONTACTED_BY_INMAIL[labelWeek]++
        objectDataRecruitmentAndSourcingIds.SOURCING_IDS = [...objectDataRecruitmentAndSourcingIds.SOURCING_IDS, data[i].candidates.data[0].id]
        break;
      case INTERVIEW_SCHEDULED:
        if (data[i].candidates.total === 1) objectDataRecruitment.INTERVIEW_SCHEDULED[labelWeek]++
        break;
      case HIRED:
        objectDataRecruitment.HIRED[labelWeek]++
        break;
      default:
        break;
    }
  }
  objectDataRecruitmentAndSourcingIds.OBJECT_DATA_RECRUITMENT = objectDataRecruitment
  return objectDataRecruitmentAndSourcingIds
}

export const countNoteForBusinessManager = (labelWeek, notes, objectDataBusinessManager) => {

  let data = notes
  let prospections = []
  if (data.length === 0) return objectDataBusinessManager
  for (let i = 0; i < data.length; i++) {

    let action = data[i].action

    switch (action) {
      case CALL:
        if (data[i].clientContacts.total) objectDataBusinessManager.CALL[labelWeek]++;
        break;
      case INTAKE:
        if (data[i].clientContacts.total) objectDataBusinessManager.INTAKE[labelWeek]++;
        break;
      case PROSPECTION:
        objectDataBusinessManager.PROSPECTION_MEETING_DONE[labelWeek]++
        if (labelWeek === "FOURTH_WEEK") prospections = [...prospections, data[i]]
        break;
      case PROJECT_START:
        objectDataBusinessManager.PROJECT_START[labelWeek]++
        break;
      case PROSPECTION_SCHEDULED:
        objectDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[labelWeek]++
        break;
      default:
        break;
    }
  }
  if (labelWeek === "FOURTH_WEEK") {
    return {
      PROSPECTIONS: prospections,
      OBJECT_DATA_BUSINESS_MANAGER: objectDataBusinessManager
    }
  }
  return objectDataBusinessManager
}

export const calculateTotalYTDRecruitment = (notesOfyear, objectYTDRecruitment) => {

  if (notesOfyear.length === 0) return objectYTDRecruitment

  for (let i = 0; i < notesOfyear.length; i++) {

    let action = notesOfyear[i].action
    switch (action) {
      case NO_SHOW:
        objectYTDRecruitment.TOTAL_YTD.NO_SHOW++
        break;
      case INTERVIEW_DONE_1 || INTERVIEW_DONE_2 || INTERVIEW_DONE_3:
        objectYTDRecruitment.TOTAL_YTD.INTERVIEW_DONE++
        break;
      case CONTRACT_PROPOSED:
        objectYTDRecruitment.TOTAL_YTD.CONTRACT_PROPOSED++;
        break;
      case CALL:
        if (notesOfyear[i].candidates.total === 1) objectYTDRecruitment.TOTAL_YTD.CONTACTED_BY_PHONE++;
        break;
      case LINKED_INMAIL:
        objectYTDRecruitment.TOTAL_YTD.CONTACTED_BY_INMAIL++
        break;
      case INTERVIEW_SCHEDULED:
        if (notesOfyear[i].candidates.total === 1) objectYTDRecruitment.TOTAL_YTD.INTERVIEW_SCHEDULED++
        break;
      case HIRED:
        objectYTDRecruitment.TOTAL_YTD.HIRED++
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
      case CALL:
        if (notesOfyear[i].clientContacts.total >= 1) objectYTDBusinessManager.TOTAL_YTD.CALL++
        break
      case INTAKE:
        if (notesOfyear[i].clientContacts.total >= 1) objectYTDBusinessManager.TOTAL_YTD.INTAKE++
        break
      case PROSPECTION:
        objectYTDBusinessManager.TOTAL_YTD.PROSPECTION_MEETING_DONE++
        break
      case PROJECT_START:
        objectYTDBusinessManager.TOTAL_YTD.PROJECT_START++
        break
      case PROSPECTION_SCHEDULED:
        if (notesOfyear[i].clientContacts.total === 1) objectYTDBusinessManager.TOTAL_YTD.PROSPECTION_MEETING_SCHEDULE++
        break
      default:
        break
    }
  }
  return objectYTDBusinessManager
}

export const calculateAverageYTDBusinessManager = (objectYTDBusinessManager, weekNumberOfTheYear) => {
  Object.entries(objectYTDBusinessManager.AVERAGE).forEach(([key, value]) => {
    objectYTDBusinessManager.AVERAGE[key] = calculateAverageYTDData(objectYTDBusinessManager.TOTAL_YTD[key], weekNumberOfTheYear)
  })

  return objectYTDBusinessManager
}

export const calculateAverageYTDRecruitment = (objectYTDRecruitment, weekNumberOfTheYear) => {
  Object.entries(objectYTDRecruitment.AVERAGE).forEach(([key, value]) => {
    objectYTDRecruitment.AVERAGE[key] = calculateAverageYTDData(objectYTDRecruitment.TOTAL_YTD[key], weekNumberOfTheYear)
  })

  return objectYTDRecruitment
}

export const calculateAverageYTDData = (totalYTD, weekNumberOfTheYear) => {
  return Math.floor(totalYTD / weekNumberOfTheYear)
}

export const getGaugeLimitFromFile = (occupation) => {
  if (occupation === BUSINESS_MANAGER) {
    return GaugeLimitFile.BUSINESS_MANAGER
  } else if (occupation === SOURCING_OFFICER) {
    return GaugeLimitFile.SOURCING_OFFICER
  } else if (occupation === TALENT_ACQUISITION) {
    return GaugeLimitFile.TALENT_ACQUISITION
  }
}

export const calculateConversionYTDBusinessManager = (objectConversionYTDBusinessManager) => {

  let prospectionMeetingScheduleConversionYTD = Math.round((objectConversionYTDBusinessManager.TOTAL_YTD.PROSPECTION_MEETING_SCHEDULE / objectConversionYTDBusinessManager.TOTAL_YTD.CALL) * 100)
  objectConversionYTDBusinessManager.CONVERSION_YTD.PROSPECTION_MEETING_SCHEDULE = (isNaN(prospectionMeetingScheduleConversionYTD) || (prospectionMeetingScheduleConversionYTD === Infinity)) ? "0 %" : prospectionMeetingScheduleConversionYTD + " %";

  let prospectionMeetingDoneConversionYTD = Math.round((objectConversionYTDBusinessManager.TOTAL_YTD.PROSPECTION_MEETING_DONE / objectConversionYTDBusinessManager.TOTAL_YTD.PROSPECTION_MEETING_SCHEDULE) * 100)
  objectConversionYTDBusinessManager.CONVERSION_YTD.PROSPECTION_MEETING_DONE = (isNaN(prospectionMeetingDoneConversionYTD) || (prospectionMeetingDoneConversionYTD === Infinity)) ? "0 %" : prospectionMeetingDoneConversionYTD + " %";

  let intakeConversionYTD = Math.round((objectConversionYTDBusinessManager.TOTAL_YTD.INTAKE / objectConversionYTDBusinessManager.TOTAL_YTD.NEW_VACANCY) * 100)
  objectConversionYTDBusinessManager.CONVERSION_YTD.INTAKE = (isNaN(intakeConversionYTD) || (intakeConversionYTD === Infinity)) ? "0 %" : intakeConversionYTD + " %";

  let projectStart = Math.round((objectConversionYTDBusinessManager.TOTAL_YTD.PROJECT_START / objectConversionYTDBusinessManager.TOTAL_YTD.INTAKE) * 100)
  objectConversionYTDBusinessManager.CONVERSION_YTD.PROJECT_START = (isNaN(projectStart) || (projectStart === Infinity)) ? "0 %" : projectStart + " %";

  return objectConversionYTDBusinessManager;
}

export const calculateConversionYTDRecruitment = (objectConversionYTDRecruitment) => {

  let interviewScheduleConversionYTD = Math.round(objectConversionYTDRecruitment.TOTAL_YTD.INTERVIEW_SCHEDULE / (objectConversionYTDRecruitment.TOTAL_YTD.CONTACTED_BY_INMAIL + objectConversionYTDRecruitment.TOTAL_YTD.CONTACTED_BY_PHONE) * 100)
  objectConversionYTDRecruitment.CONVERSION_YTD.INTERVIEW_SCHEDULED = (isNaN(interviewScheduleConversionYTD) || (interviewScheduleConversionYTD === Infinity)) ? "0 %" : interviewScheduleConversionYTD + " %";

  let noShowConversionYTD = Math.round(objectConversionYTDRecruitment.TOTAL_YTD.NO_SHOW / objectConversionYTDRecruitment.TOTAL_YTD.INTERVIEW_SCHEDULE * 100)
  objectConversionYTDRecruitment.CONVERSION_YTD.NO_SHOW = (isNaN(noShowConversionYTD) || (noShowConversionYTD === Infinity)) ? "0 %" : noShowConversionYTD + " %";

  let interviewDoneConversionYTD = Math.round(objectConversionYTDRecruitment.TOTAL_YTD.INTERVIEW_DONE / objectConversionYTDRecruitment.TOTAL_YTD.INTERVIEW_SCHEDULE * 100)
  objectConversionYTDRecruitment.CONVERSION_YTD.INTERVIEW_DONE = (isNaN(interviewDoneConversionYTD) || (interviewDoneConversionYTD === Infinity)) ? "0 %" : interviewDoneConversionYTD + " %";

  let contactProposedConversionYTD = Math.round(objectConversionYTDRecruitment.TOTAL_YTD.CONTRACT_PROPOSED / objectConversionYTDRecruitment.TOTAL_YTD.INTERVIEW_DONE * 100)
  objectConversionYTDRecruitment.CONVERSION_YTD.CONTRACT_PROPOSED = (isNaN(contactProposedConversionYTD) || (contactProposedConversionYTD === Infinity)) ? "0 %" : contactProposedConversionYTD + " %";

  let hiredConversionYTD = Math.round(objectConversionYTDRecruitment.TOTAL_YTD.HIRED / objectConversionYTDRecruitment.TOTAL_YTD.CONTRACT_PROPOSED * 100)
  objectConversionYTDRecruitment.CONVERSION_YTD.HIRED = (isNaN(hiredConversionYTD) || (hiredConversionYTD === Infinity)) ? "0 %" : hiredConversionYTD + " %";

  return objectConversionYTDRecruitment;
}