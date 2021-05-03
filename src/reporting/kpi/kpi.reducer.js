import { bindReducer } from "../../utils/reducer";

import {
  SET_EMPLOYEE_KPI,
  SET_OBJECT_YTD,
  SET_CV_SENT,
  SET_YTD_TOTAL_BUSINESS_MANAGER,
  SET_YTD_TOTAL_RECRUITMENT,
  SET_AVERAGE_YTD_BUSINESS_MANAGER,
  SET_AVERAGE_YTD_RECRUITMENT,
  SET_CONVERSION_YTD_BUSINESS_MANAGER,
  SET_CONVERSION_YTD_RECRUITMENT,
  SET_LOADING_YTD_TOTAL,
  SET_LOADING_YTD_AVERAGE,
  SET_LOADING_YTD_CONVERSION,
  SET_LOADING_YTD_NEW_VACANCY,
  SET_NEW_VACANCY_YTD,
  SET_CONVERSION_YTD_NEW_VACANCY,
  SET_LOADING_YTD_CONVERSION_NEW_VACANCY,
  SET_LOADING_YTD_CV_SENT,
  SET_CV_SENT_YTD,
  SET_LOADING_YTD_CONVERSION_CV_SENT,
  SET_CV_SENT_CONVERSION_YTD,
  SET_LOADING_KPI,
  GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT,
  GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN,
  SET_JOB_SUBMISSIONS_STATUS_FROM_WEEK_RETRIEVED,
  SET_LOADING_DATA,
  SET_CV_SENT_EXPANDED_VIEW
} from "./kpi.actions"

export const initialState = {
  cvSentLoadingYTDCounter: 0,
  cvSentLoadingCounter: 0,
  dataEmployee: {},
  dataYTDEmployee: {
    CONVERSION_YTD_BM: {
      CALL: "-",
      PROSPECTION_MEETING_SCHEDULE: 0,
      NO_SHOW: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0,
    },
    TOTAL_YTD_BM: {
      CALL: 0,
      PROSPECTION_MEETING_SCHEDULE: 0,
      NO_SHOW: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0,
    },
    AVERAGE_YTD_BM: {
      CALL: 0,
      PROSPECTION_MEETING_SCHEDULE: 0,
      NO_SHOW: 0,
      PROSPECTION_MEETING_DONE: 0,
      NEW_VACANCY: 0,
      CV_SENT: 0,
      INTAKE: 0,
      PROJECT_START: 0,
    },
    TOTAL_YTD_RE: {
      CONTACTED_BY_INMAIL: 0,
      CONTACTED_BY_PHONE: 0,
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0,
      PEOPLE_MANAGEMENT: 0,
    },
    AVERAGE_YTD_RE: {
      CONTACTED_BY_INMAIL: 0,
      CONTACTED_BY_PHONE: 0,
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0,
      PEOPLE_MANAGEMENT: 0,
    },
    CONVERSION_YTD_RE: {
      CONTACTED_BY_INMAIL: "-",
      CONTACTED_BY_PHONE: "-",
      INTERVIEW_SCHEDULED: 0,
      NO_SHOW: 0,
      INTERVIEW_DONE: 0,
      CONTRACT_PROPOSED: 0,
      HIRED: 0,
      PEOPLE_MANAGEMENT: "-",
    }
  },
  isLoadingKpi: false,
  isLoadingYTDTotal: false,
  isLoadingYTDAverage: false,
  isLoadingYTDConversion: false,
  isCvSentWeekLoading: false,
  isLoadingYTDNewVacancy: false,
  isLoadingYTDConversionNewVacancy: false,
  isLoadingYTDConversionCVSent: false
}
const kpi = {
  [SET_LOADING_DATA]: (state) => ({
    ...state,
    isLoadingKpi: true,
    isCvSentWeekLoading: true,
    isLoadingYTDTotal: true,
    isLoadingYTDAverage: true,
    isLoadingYTDConversion: true,
    isLoadingYTDNewVacancy: true,
    isLoadingYTDConversionNewVacancy: true,
    isLoadingYTDCVSent: true,
    isLoadingYTDConversionCVSent: true
  }),
  [SET_LOADING_KPI]: (state) => ({
    ...state,
    isLoadingKpi: false
  }),
  [SET_EMPLOYEE_KPI]: (state, payload) => ({
    ...state,
    dataEmployee: payload

  }),
  [SET_OBJECT_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: payload
  }),
  [SET_CV_SENT_EXPANDED_VIEW]: (state, { data, weekLabel }) => {
    const oldState = state?.dataEmployee?.datasBusinessManager?.CV_SENT_EXPANDED_VIEW?.[weekLabel]
    const updatedState = oldState ? [...oldState, data] : [data]
    return {
      ...state,
      dataEmployee: {
        ...state.dataEmployee,
        datasBusinessManager: {
          ...state.dataEmployee.datasBusinessManager,
          CV_SENT_EXPANDED_VIEW: {
            ...state.dataEmployee.datasBusinessManager.CV_SENT_EXPANDED_VIEW,
            [weekLabel]: updatedState,
          }
        }
      }
    }
  },
  [SET_CV_SENT]: (state, payload) => ({
    ...state,
    dataEmployee: {
      ...state.dataEmployee,
      datasBusinessManager: {
        ...state.dataEmployee.datasBusinessManager,
        CV_SENT: {
          ...state.dataEmployee.datasBusinessManager.CV_SENT,
          [payload]: state.dataEmployee.datasBusinessManager.CV_SENT[payload] + 1
        }
      }
    },
    cvSentLoadingCounter: state.cvSentLoadingCounter - 1,
    isCvSentWeekLoading: state.cvSentLoadingCounter > 1
  }),
  [SET_YTD_TOTAL_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_BM: {
        ...state.dataYTDEmployee.TOTAL_YTD_BM,
        CALL: payload.CALL,
        PROSPECTION_MEETING_SCHEDULE: payload.PROSPECTION_MEETING_SCHEDULE,
        PROSPECTION_MEETING_DONE: payload.PROSPECTION_MEETING_DONE,
        INTAKE: payload.INTAKE,
        PROJECT_START: payload.PROJECT_START,
        NO_SHOW: payload.NO_SHOW
      }
    }
  }),
  [SET_AVERAGE_YTD_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      AVERAGE_YTD_BM: {
        ...state.dataYTDEmployee.AVERAGE_YTD_BM,
        CALL: payload.CALL,
        PROSPECTION_MEETING_SCHEDULE: payload.PROSPECTION_MEETING_SCHEDULE,
        PROSPECTION_MEETING_DONE: payload.PROSPECTION_MEETING_DONE,
        INTAKE: payload.INTAKE,
        PROJECT_START: payload.PROJECT_START,
        NO_SHOW: payload.NO_SHOW
      }
    }
  }),
  [SET_CONVERSION_YTD_BUSINESS_MANAGER]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_BM: {
        ...state.dataYTDEmployee.CONVERSION_YTD_BM,
        CALL: payload.CALL,
        PROSPECTION_MEETING_SCHEDULE: payload.PROSPECTION_MEETING_SCHEDULE,
        PROSPECTION_MEETING_DONE: payload.PROSPECTION_MEETING_DONE,
        INTAKE: payload.INTAKE,
        PROJECT_START: payload.PROJECT_START,
        NO_SHOW: payload.NO_SHOW
      }
    }
  }),
  [SET_CONVERSION_YTD_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_RE: payload
    }
  }),
  [SET_AVERAGE_YTD_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      AVERAGE_YTD_RE: payload
    }
  }),
  [SET_YTD_TOTAL_RECRUITMENT]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_RE: payload
    }
  }),
  [SET_LOADING_YTD_TOTAL]: (state, payload) => ({
    ...state,
    isLoadingYTDTotal: payload
  }),
  [SET_LOADING_YTD_AVERAGE]: (state, payload) => ({
    ...state,
    isLoadingYTDAverage: payload
  }),
  [SET_LOADING_YTD_CONVERSION]: (state, payload) => ({
    ...state,
    isLoadingYTDConversion: payload
  }),
  [SET_LOADING_YTD_NEW_VACANCY]: (state, payload) => ({
    ...state,
    isLoadingYTDNewVacancy: payload
  }),
  [SET_NEW_VACANCY_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_BM: {
        ...state.dataYTDEmployee.TOTAL_YTD_BM,
        NEW_VACANCY: payload.TOTAL_YTD.NEW_VACANCY
      },
      AVERAGE_YTD_BM: {
        ...state.dataYTDEmployee.AVERAGE_YTD_BM,
        NEW_VACANCY: payload.AVERAGE.NEW_VACANCY
      }
    }
  }),
  [SET_CONVERSION_YTD_NEW_VACANCY]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_BM: {
        ...state.dataYTDEmployee.CONVERSION_YTD_BM,
        NEW_VACANCY: payload
      }
    }
  }),
  [SET_LOADING_YTD_CONVERSION_NEW_VACANCY]: (state, payload) => ({
    ...state,
    isLoadingYTDConversionNewVacancy: payload
  }),
  [SET_CV_SENT_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      TOTAL_YTD_BM: {
        ...state.dataYTDEmployee.TOTAL_YTD_BM,
        CV_SENT: state.dataYTDEmployee.TOTAL_YTD_BM.CV_SENT + payload
      }
    },
    cvSentLoadingYTDCounter: state.cvSentLoadingYTDCounter - 1,
    isLoadingYTDCVSent: state.cvSentLoadingYTDCounter > 1
  }),
  [SET_LOADING_YTD_CV_SENT]: (state, payload) => ({
    ...state,
    isLoadingYTDCVSent: payload
  }),
  [SET_LOADING_YTD_CONVERSION_CV_SENT]: (state, payload) => ({
    ...state,
    isLoadingYTDConversionCVSent: payload
  }),
  [SET_CV_SENT_CONVERSION_YTD]: (state, payload) => ({
    ...state,
    dataYTDEmployee: {
      ...state.dataYTDEmployee,
      CONVERSION_YTD_BM: {
        ...state.dataYTDEmployee.CONVERSION_YTD_BM,
        CV_SENT: payload
      }
    }
  }),
  [GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT]: (state) => ({
    ...state,
    cvSentLoadingYTDCounter: state.cvSentLoadingYTDCounter + 1
  }),
  [GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN]: (state) => ({
    ...state,
    cvSentLoadingCounter: state.cvSentLoadingCounter + 1
  }),
  [SET_JOB_SUBMISSIONS_STATUS_FROM_WEEK_RETRIEVED]: (state) => {
    return {
      ...state,
      cvSentLoadingCounter: state.cvSentLoadingCounter - 1,
      isCvSentWeekLoading: state.cvSentLoadingCounter > 1
    }
  },
}

export default (state, action) =>
  bindReducer(state, action, kpi, initialState);