import moment from "moment";
import {
  call,
  put,
  takeLatest,
  all,
  select,
  takeEvery,
} from "redux-saga/effects";
import { path, prop } from "ramda";
import {
  getLast4weeksDate,
  getDateString,
  getStartDateOfYear,
  getStartDateOfYearTimestamp,
} from "../../utils/date";
import {
  initalizeObjectBusinessManager,
  initalizeObjectRecruitment,
  initializeObjectConversionYTDBusinessManager,
  initializeObjectConversionYTDRecruitment,
  countNoteForBusinessManager,
  initializeObjectDate,
  calculateConversionYTDBusinessManager,
  calculateConversionYTDRecruitment,
  calculateTotalYTDBusinessManager,
  calculateTotalYTDRecruitment,
  calculateAverageYTDRecruitment,
  calculateAverageYTDBusinessManager,
  countNoteForRecruitmentAndIdsSourcing,
  initialiserObjectNewVacancyYTD,
  calculateAverageYTDData,
  countNoteForRecruitment,
  initializeObjectByDates,
  filterCvSentStatusForWeeks,
  initializeObjectByDatesTable,
} from "../../utils/reporting";
import {
  GET_EMPLOYEE_KPI,
  setEmployeeKpi,
  setKpiLoading,
  setCvSent,
  setYTDTotalRecruitment,
  setYTDTotalBusinessManager,
  setAverageYTDBusinessManager,
  setAverageYTDRecruitment,
  setConversionYTDBusinessManager,
  setConversionYTDRecruitment,
  setLoadingYTDTotal,
  setLoadingYTDAverage,
  setLoadingYTDConversion,
  setLoadingYTDNewVacancy,
  setNewVacancyYTD,
  setConversionYTDNewVacancy,
  setLoadingYTDConversionNewVacancy,
  setCVSentYTD,
  setLoadingYTDConversionCVSent,
  setConversionYTDCVSent,
  getJobSubmissionsByJobOrderIdAction,
  GET_JOBSUBMISSION_BY_JOBORDER_ID,
  getJobSubmissionStatusChangedCVSentAction,
  GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT,
  getJobSubmissionsByJobOrderOpenAction,
  GET_JOBSUBMISSION_BY_JOBORDER_OPEN_ID,
  getJobSbmissionsStatusFromJobsubmissionOpen,
  GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN,
  setJobSubmissionsStatusFromWeekRetrieved,
  setCvSentExpandedView,
  setIsLoadingYTDCVSent,
} from "./kpi.actions";
import {
  getNoteFromEmployee,
  getJobOrders,
  getAllJobOrdersOpen,
  getJobSubmissionsByJobOrderId,
  getSubmissionStatusChangedCvSent,
  getJobOrdersForYTD,
  getSubmissionStatusChangedCvSentById,
  getJobSubmissionById,
} from "./kpi.service";
import {
  BUSINESS_MANAGER,
  TALENT_ACQUISITION,
  SOURCING_OFFICER,
} from "../../auth/user.sagas";
import {
  calculateWeeklySpeedRecruitmentForAllWeeks,
  getCandidatesCategory,
  calculateAllWeeklySpeedForBusinessManager,
} from "../weeklySpeed/weeklySpeed.sagas";
import { getAllDataFromIdsForExpandView } from "../expandView/expandView.sagas";

export const FIRST_WEEK = "FIRST_WEEK";
export const SECOND_WEEK = "SECOND_WEEK";
export const THIRD_WEEK = "THIRD_WEEK";
export const FOURTH_WEEK = "FOURTH_WEEK";

export function* getKpiDataEmployee(action) {
  try {
    let weekNumberOfTheYear = moment().isoWeek();

    let dates = getLast4weeksDate();
    let dateStartOfThisYear = getStartDateOfYear();
    let dateStartOfThisYearTimestamp = getStartDateOfYearTimestamp();

    let idEmployee = path(["payload", "id"], action);
    let occupation = path(["payload", "occupation"], action);
    occupation = occupation.split("@")[0];

    let objectDataBusinessManager = initalizeObjectBusinessManager(occupation);
    let objectDataRecruitment = initalizeObjectRecruitment(occupation);
    let objectDateEmployee = initializeObjectDate();

    let objectYTDBusinessManager =
      initializeObjectConversionYTDBusinessManager();
    let objectYTDRecruitment = initializeObjectConversionYTDRecruitment();

    if (occupation.includes(BUSINESS_MANAGER)) {
      yield call(
        getLast4WeekDataBusinessManager,
        idEmployee,
        dates,
        objectDateEmployee,
        objectDataRecruitment,
        objectDataBusinessManager,
        occupation
      );
      yield call(
        getYTDData,
        idEmployee,
        dateStartOfThisYear,
        dates[3].end,
        occupation,
        objectYTDBusinessManager,
        objectYTDRecruitment,
        weekNumberOfTheYear,
        dateStartOfThisYearTimestamp,
        dates[3].endTimestamp
      );
    } else {
      const datasRecruitment = yield call(
        getLast4WeekKpiData,
        idEmployee,
        dates,
        objectDateEmployee,
        objectDataRecruitment,
        objectDataBusinessManager,
        occupation
      );

      yield call(
        calculateWeeklySpeedRecruitmentForAllWeeks,
        datasRecruitment.CATEGORIES,
        occupation
      );
      
      yield call(getAllDataFromIdsForExpandView, datasRecruitment, occupation);

      yield call(
        calculateTotalYTD,
        idEmployee,
        dateStartOfThisYear,
        dates[3].end,
        occupation,
        objectYTDBusinessManager,
        objectYTDRecruitment,
        weekNumberOfTheYear
      );
    }
  } catch (error) {
    //
  }
}

export function* getLast4WeekDataBusinessManager(
  idEmployee,
  dates,
  objectDateEmployee,
  objectDataRecruitment,
  objectDataBusinessManager,
  occupation
) {
  try {
    const datasBM = yield call(
      getLast4WeekKpiData,
      idEmployee,
      dates,
      objectDateEmployee,
      objectDataRecruitment,
      objectDataBusinessManager,
      occupation
    );
    yield call(getCvSent, idEmployee, dates);
    yield call(
      calculateAllWeeklySpeedForBusinessManager,
      idEmployee,
      dates,
      datasBM.PROSPECTIONS_DONE
    );

    yield call(getAllDataFromIdsForExpandView, datasBM, occupation);
  } catch (e) {
    //
  }
}

export function* getYTDData(
  idEmployee,
  dateStartOfThisYear,
  dateEnd,
  occupation,
  objectYTDBusinessManager,
  objectYTDRecruitment,
  weekNumberOfTheYear,
  dateStartOfThisYearTimestamp,
  dateEndTimestamp
) {
  try {
    yield all([
      call(
        calculateTotalYTD,
        idEmployee,
        dateStartOfThisYear,
        dateEnd,
        occupation,
        objectYTDBusinessManager,
        objectYTDRecruitment,
        weekNumberOfTheYear
      ),
      call(
        calculateTotalNewVacancyYTD,
        idEmployee,
        dateEnd,
        weekNumberOfTheYear,
        dateStartOfThisYearTimestamp,
        dateEndTimestamp
      ),
    ]);
    yield call(calculateConversionYTDNewVacancy);
    yield call(calculateConversionYTDCVSent);
  } catch (e) {
    //
  }
}

export const getProspectionMeetingDoneTotalYTD = (state) =>
  state.kpi.dataYTDEmployee.TOTAL_YTD_BM.PROSPECTION_MEETING_DONE;
export const getNewVacancyTotalYTD = (state) =>
  state.kpi.dataYTDEmployee.TOTAL_YTD_BM.NEW_VACANCY;

export function* calculateConversionYTDNewVacancy() {
  try {
    let totalProspectionMeetingDoneYTD = yield select(
      getProspectionMeetingDoneTotalYTD
    );
    let totalNewVacancyYTD = yield select(getNewVacancyTotalYTD);

    let conversionNewVacancyYTD = Math.round(
      (totalNewVacancyYTD / totalProspectionMeetingDoneYTD) * 100
    );
    conversionNewVacancyYTD =
      isNaN(conversionNewVacancyYTD) || conversionNewVacancyYTD === Infinity
        ? "0 %"
        : conversionNewVacancyYTD + " %";

    yield put(setConversionYTDNewVacancy(conversionNewVacancyYTD));
    yield put(setLoadingYTDConversionNewVacancy(false));
  } catch (e) {
    //
  }
}

export const getCVSentTotalYTD = (state) =>
  state.kpi.dataYTDEmployee.TOTAL_YTD_BM.CV_SENT;

export function* calculateConversionYTDCVSent() {
  try {
    let cvSentYTD = yield select(getCVSentTotalYTD);
    let newVacancyYTD = yield select(getNewVacancyTotalYTD);
    let conversionCVSentYTD = Math.round((cvSentYTD / newVacancyYTD) * 100);
    conversionCVSentYTD =
      isNaN(conversionCVSentYTD) || conversionCVSentYTD === Infinity
        ? "0 %"
        : conversionCVSentYTD + " %";
    yield put(setConversionYTDCVSent(conversionCVSentYTD));
    yield put(setLoadingYTDConversionCVSent(false));
  } catch (e) {
    //
  }
}

export function* calculateTotalYTD(
  employeeId,
  dateStartOfThisYear,
  dateEnd,
  occupation,
  objectYTDBusinessManager,
  objectYTDRecruitment,
  weekNumberOfTheYear
) {
  try {
    const kpiNoteOfTheYear = yield call(
      getKpiNoteSaga,
      employeeId,
      dateStartOfThisYear,
      dateEnd
    );

    if (occupation.includes(BUSINESS_MANAGER)) {
      objectYTDRecruitment = calculateTotalYTDRecruitment(
        kpiNoteOfTheYear,
        objectYTDRecruitment
      );
      objectYTDBusinessManager = calculateTotalYTDBusinessManager(
        kpiNoteOfTheYear,
        objectYTDBusinessManager
      );
      yield put(setYTDTotalBusinessManager(objectYTDBusinessManager.TOTAL_YTD));
      yield put(setYTDTotalRecruitment(objectYTDRecruitment.TOTAL_YTD));
    } else {
      objectYTDRecruitment = calculateTotalYTDRecruitment(
        kpiNoteOfTheYear,
        objectYTDRecruitment
      );
      yield put(setYTDTotalRecruitment(objectYTDRecruitment.TOTAL_YTD));
    }

    yield put(setLoadingYTDTotal(false));

    yield all([
      call(
        calculateAverageYTD,
        occupation,
        objectYTDBusinessManager,
        objectYTDRecruitment,
        weekNumberOfTheYear
      ),
      call(
        calculateConversionYTD,
        occupation,
        objectYTDBusinessManager,
        objectYTDRecruitment
      ),
    ]);
  } catch (e) {
    //
  }
}

export const getNewVacancyYTD = (state) =>
  state.kpi.dataYTDEmployee.TOTAL_YTD_BM.NEW_VACANCY;

export function* calculateConversionYTD(
  occupation,
  objectYTDBusinessManager,
  objectYTDRecruitment
) {
  try {
    if (occupation.includes(BUSINESS_MANAGER)) {
      let newVancancyYTD = yield select(getNewVacancyYTD);

      objectYTDBusinessManager.TOTAL_YTD.NEW_VACANCY = newVancancyYTD;

      objectYTDBusinessManager = calculateConversionYTDBusinessManager(
        objectYTDBusinessManager
      );
      objectYTDRecruitment =
        calculateConversionYTDRecruitment(objectYTDRecruitment);

      yield put(
        setConversionYTDBusinessManager(objectYTDBusinessManager.CONVERSION_YTD)
      );
      yield put(
        setConversionYTDRecruitment(objectYTDRecruitment.CONVERSION_YTD)
      );
    } else {
      objectYTDRecruitment =
        calculateConversionYTDRecruitment(objectYTDRecruitment);
      yield put(
        setConversionYTDRecruitment(objectYTDRecruitment.CONVERSION_YTD)
      );
    }
    yield put(setLoadingYTDConversion(false));
  } catch (e) {
    //
  }
}

export function* calculateAverageYTD(
  occupation,
  objectYTDBusinessManager,
  objectYTDRecruitment,
  weekNumberOfTheYear
) {
  try {
    if (occupation.includes(BUSINESS_MANAGER)) {
      objectYTDBusinessManager = calculateAverageYTDBusinessManager(
        objectYTDBusinessManager,
        weekNumberOfTheYear
      );
      objectYTDRecruitment = calculateAverageYTDRecruitment(
        objectYTDRecruitment,
        weekNumberOfTheYear
      );

      yield put(setAverageYTDBusinessManager(objectYTDBusinessManager.AVERAGE));
      yield put(setAverageYTDRecruitment(objectYTDRecruitment.AVERAGE));
    } else {
      objectYTDRecruitment = calculateAverageYTDRecruitment(
        objectYTDRecruitment,
        weekNumberOfTheYear
      );
      yield put(setAverageYTDRecruitment(objectYTDRecruitment.AVERAGE));
    }
    yield put(setLoadingYTDAverage(false));
  } catch (e) {
    //
  }
}

export function* getLast4WeekKpiData(
  employeeId,
  dates,
  objectDateEmployee,
  objectDataRecruitment,
  objectDataBusinessManager,
  occupation
) {

  let dataRecruitment,
    objectProspectionDone,
    objectIntakes,
    objectInterviewsScheduled,
    objectCategories,
    objectInterviewsDone,
    objectLinkedInMail,
    objectProspectionsScheduled,
    objectNewVacancy,
    objectCvSent;

  // BUSINESS MANAGER DATA
  if (occupation.includes(BUSINESS_MANAGER)) {
    objectProspectionDone = initializeObjectByDatesTable();
    objectIntakes = initializeObjectByDatesTable();
    objectProspectionsScheduled = initializeObjectByDatesTable();
    objectNewVacancy = initializeObjectByDatesTable();
    objectCvSent = initializeObjectByDatesTable();
  }

  // TALENT ACQUISITION AND SOURCING OFFICER DATA
  if (
    occupation.includes(SOURCING_OFFICER) ||
    occupation.includes(TALENT_ACQUISITION)
  ) {
    objectCategories = initializeObjectByDates();
  }
  // SOURCING OFFICER DATA
  if (occupation.includes(SOURCING_OFFICER))
    objectLinkedInMail = initializeObjectByDates();
  // BUSINESS MANAGER, SOURCING OFFICER AND TALENT ACQUISITION DATA
  if (
    occupation.includes(BUSINESS_MANAGER) ||
    occupation.includes(TALENT_ACQUISITION) ||
    occupation.includes(SOURCING_OFFICER)
  ) {
    objectInterviewsScheduled = initializeObjectByDates();
    objectInterviewsDone = initializeObjectByDatesTable();
  }
  try {
    for (let i = 0; i < dates.length; i++) {
      let weekLabel = getWeekLabel(i);
      const kpiNote = yield call(
        getKpiNoteSaga,
        employeeId,
        dates[i].start,
        dates[i].end
      );
      objectDateEmployee.DATES[weekLabel] = getDateString(dates[i].start);
      if (kpiNote.length !== 0) {
        if (
          occupation.includes(TALENT_ACQUISITION) ||
          occupation.includes(SOURCING_OFFICER)
        ) {
          dataRecruitment = countNoteForRecruitmentAndIdsSourcing(
            weekLabel,
            kpiNote,
            objectDataRecruitment,
            occupation
          );

          objectDataRecruitment = dataRecruitment.OBJECT_DATA_RECRUITMENT;
          
          objectCategories[weekLabel] = yield call(
            getCandidatesCategory,
            dataRecruitment.SOURCING_IDS
          );

          objectInterviewsScheduled[weekLabel] =
            dataRecruitment.INTERVIEW_SCHEDULED;
          objectInterviewsDone[weekLabel] = dataRecruitment.INTERVIEWS_DONE;
          
          if (occupation.includes(SOURCING_OFFICER)) {
            objectLinkedInMail[weekLabel] = dataRecruitment.LINKED_INMAIL;
          }
        }
        if (occupation.includes(BUSINESS_MANAGER)) {
          dataRecruitment = countNoteForRecruitment(
            weekLabel,
            kpiNote,
            objectDataRecruitment
          );

          objectDataRecruitment = dataRecruitment.OBJECT_DATA_RECRUITMENT;
          objectInterviewsDone[weekLabel] = dataRecruitment.INTERVIEWS_DONE;

          let dataBusinessManager = countNoteForBusinessManager(
            weekLabel,
            kpiNote,
            objectDataBusinessManager
          );

          objectDataBusinessManager =
            dataBusinessManager.OBJECT_DATA_BUSINESS_MANAGER;
          objectProspectionDone[weekLabel] = dataBusinessManager.PROSPECTIONS;
          objectIntakes[weekLabel] = dataBusinessManager.INTAKES;
          objectProspectionsScheduled[weekLabel] =
            dataBusinessManager.PROSPECTIONS_SCHEDULED;

          let kpiJobOrder = yield call(
            getJobOrders,
            employeeId,
            dates[i].startTimestamp,
            dates[i].endTimestamp
          );
          objectDataBusinessManager.NEW_VACANCY[weekLabel] = kpiJobOrder.count;

          objectNewVacancy[weekLabel] = kpiJobOrder.data;

          objectDataBusinessManager.CALL[weekLabel] =
            objectDataBusinessManager.PROSPECTION_MEETING_SCHEDULE[weekLabel] +
            objectDataBusinessManager.CALL[weekLabel];
        }
      }
    }
    
    yield put(
      setEmployeeKpi(
        objectDateEmployee,
        objectDataRecruitment,
        objectDataBusinessManager
      )
    );
    yield put(setKpiLoading(false));
    if (occupation.includes(BUSINESS_MANAGER)) {
      return {
        PROSPECTIONS_SCHEDULED: objectProspectionsScheduled,
        PROSPECTIONS_DONE: objectProspectionDone,
        INTAKES: objectIntakes,
        INTERVIEWS_DONE: objectInterviewsDone,
        NEW_VACANCY: objectNewVacancy,
        CV_SENT: objectCvSent,
      };
    } else if (
      occupation.includes(TALENT_ACQUISITION) ||
      occupation.includes(SOURCING_OFFICER)
    ) {
      let objectRecruitment = {
        INTERVIEW_SCHEDULED: objectInterviewsScheduled,
        INTERVIEWS_DONE: objectInterviewsDone,
        CATEGORIES: objectCategories,
      };

      if (occupation.includes(TALENT_ACQUISITION)) {
        return objectRecruitment;
      } else {
        objectRecruitment.LINKED_INMAIL = objectLinkedInMail;
        return objectRecruitment;
      }
    }
  } catch (e) {
    //
  }
}

export function* getCvSent(employeeId, dates) {
  try {
    const jobOrdersOpen = yield call(getAllJobOrdersOpen, employeeId);
    if (jobOrdersOpen.length !== 0) {
      yield all(
        jobOrdersOpen.map((jobOrderOpen) =>
          put(
            getJobSubmissionsByJobOrderOpenAction(
              prop("id", jobOrderOpen),
              dates
            )
          )
        )
      );
    } else {
      yield put(setJobSubmissionsStatusFromWeekRetrieved());
    }
  } catch (e) {
    //
  }
}

export function* getKpiNoteSaga(employeeId, dateStart, dateEnd) {
  let kpiNote = [];
  let noteRemaining = true;
  let remainingValue = 0;

  try {
    while (noteRemaining) {
      let kpiNoteRetrieved = yield call(
        getNoteFromEmployee,
        employeeId,
        dateStart,
        dateEnd,
        remainingValue
      );
      kpiNote = [...kpiNote, ...kpiNoteRetrieved.data];
      remainingValue = remainingValue + 50;

      noteRemaining =
        kpiNoteRetrieved.total - remainingValue <= 0 ? false : true;

      if (!noteRemaining) {
        return kpiNote;
      }
    }
  } catch (e) {
    //
  }
  return kpiNote;
}

export function* calculateTotalNewVacancyYTD(
  idEmployee,
  todayDate,
  weekNumberOfTheYear,
  dateStartTimestamp,
  dateEndTimestamp
) {
  let dateStartOfThisYear = getStartDateOfYear();
  let jobOrderKpiYTD = [];
  let noteRemaining = true;
  let remainingValue = 0;
  let objectNewVacancyYTD = initialiserObjectNewVacancyYTD();
  try {
    while (noteRemaining) {
      let jobOrderYTD = yield call(
        getJobOrdersForYTD,
        idEmployee,
        dateStartOfThisYear,
        todayDate,
        remainingValue
      );

      jobOrderKpiYTD = [...jobOrderKpiYTD, ...jobOrderYTD.data];
      remainingValue = remainingValue + 50;

      noteRemaining = jobOrderYTD.total - remainingValue <= 0 ? false : true;

      if (!noteRemaining) {
        let numberOfNewVacancyYTD = jobOrderKpiYTD.length;
        objectNewVacancyYTD.TOTAL_YTD.NEW_VACANCY = numberOfNewVacancyYTD;
        objectNewVacancyYTD.AVERAGE.NEW_VACANCY = calculateAverageYTDData(
          numberOfNewVacancyYTD,
          weekNumberOfTheYear
        );

        yield put(setNewVacancyYTD(objectNewVacancyYTD));
        yield put(setLoadingYTDNewVacancy(false));

        yield call(
          calculateTotalCvSentYTD,
          jobOrderKpiYTD,
          dateStartTimestamp,
          dateEndTimestamp
        );
        return numberOfNewVacancyYTD;
      }
    }
  } catch (e) {
    //
  }
  return 0;
}

export function* calculateTotalCvSentYTD(
  jobOrderOfTheYear,
  dateStartTimestamp,
  dateEndTimestamp
) {
  if (jobOrderOfTheYear?.length > 0) {
    yield all(
      jobOrderOfTheYear.map((jobOrder) =>
        put(
          getJobSubmissionsByJobOrderIdAction(
            prop("id", jobOrder),
            dateStartTimestamp,
            dateEndTimestamp
          )
        )
      )
    );
  } else {
    yield put(setIsLoadingYTDCVSent(false))
  }
}

export function* getJobSubmissionByJobOrderIdSaga(action) {
  
  let id = action.payload.ID;
  let dateStartTimestamp = action.payload.DATE_START;
  let dateEndTimestamp = action.payload.DATE_END;

  try {
    let jobSubmissions = yield call(getJobSubmissionsByJobOrderId, id);
    yield all(
      jobSubmissions.map((jobSubmission) =>
        put(
          getJobSubmissionStatusChangedCVSentAction(
            prop("id", jobSubmission),
            dateStartTimestamp,
            dateEndTimestamp
          )
        )
      )
    );
  } catch (e) {
    //
  }
}

export function* getJobSubmissionStatusChangedCVSentSaga(action) {
  let id = action.payload.ID;
  let dateStartTimestamp = action.payload.DATE_START;
  let dateEndTimestamp = action.payload.DATE_END;
  try {
    let total = yield call(
      getSubmissionStatusChangedCvSent,
      id,
      dateStartTimestamp,
      dateEndTimestamp
    );
    yield put(setCVSentYTD(total));
  } catch (e) {
    //
  }
}

export function* getJobSubmissionByJobOrderOpenIdSaga(action) {
  let id = action.payload.ID;
  let dates = action.payload.DATES;
  try {
    let jobSubmissions = yield call(getJobSubmissionsByJobOrderId, id);
    yield all(
      jobSubmissions.map((jobSubmission) =>
        put(
          getJobSbmissionsStatusFromJobsubmissionOpen(
            prop("id", jobSubmission),
            dates
          )
        )
      )
    );
  } catch (e) {
    //
  }
}
export function* getJobSubmissionStatusByJobSubmissionOpenSaga(action) {
  const id = action.payload.ID;
  const dates = action.payload.DATES;

  try {
    const jobStatusChanged = yield call(
      getSubmissionStatusChangedCvSentById,
      id
    );
    yield put(setJobSubmissionsStatusFromWeekRetrieved());

    if (jobStatusChanged.count > 0) {
      const jobSubmissions = yield call(getJobSubmissionById, id);
      const weekLabel = filterCvSentStatusForWeeks(jobStatusChanged, dates);
      if (weekLabel) {
        yield put(setCvSent(weekLabel));
        yield put(
          setCvSentExpandedView({ data: jobSubmissions?.data?.[0], weekLabel })
        );
      }
    }
  } catch (e) {
    //
  }
}

const getWeekLabel = (index) => {
  switch (index) {
    case 0:
      return FIRST_WEEK;
    case 1:
      return SECOND_WEEK;
    case 2:
      return THIRD_WEEK;
    case 3:
      return FOURTH_WEEK;
    default:
      return "";
  }
};

export default function kpiSagas() {
  return [
    takeLatest(GET_EMPLOYEE_KPI, getKpiDataEmployee),
    takeEvery(
      GET_JOBSUBMISSION_BY_JOBORDER_ID,
      getJobSubmissionByJobOrderIdSaga
    ),
    takeEvery(
      GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT,
      getJobSubmissionStatusChangedCVSentSaga
    ),
    takeEvery(
      GET_JOBSUBMISSION_BY_JOBORDER_OPEN_ID,
      getJobSubmissionByJobOrderOpenIdSaga
    ),
    takeEvery(
      GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN,
      getJobSubmissionStatusByJobSubmissionOpenSaga
    ),
  ];
}
