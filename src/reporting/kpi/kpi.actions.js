export const GET_EMPLOYEE_KPI = "GET_EMPLOYEE_KPI"
export const SET_EMPLOYEE_KPI = "SET_EMPLOYEE_KPI"

export const SET_LOADING_KPI = "SET_LOADING_KPI"
export const SET_OBJECT_YTD = "SET_OBJECT_YTD"

export const SET_YTD_TOTAL_BUSINESS_MANAGER = "SET_YTD_TOTAL"
export const SET_YTD_TOTAL_RECRUITMENT = "SET_YTD_TOTAL_RECRUITMENT"
export const SET_NEW_VACANCY_YTD = "SET_NEW_VACANCY_YTD"
export const SET_CONVERSION_YTD_NEW_VACANCY = "SET_CONVERSION_YTD_NEW_VACANCY"
export const SET_CV_SENT = "SET_CV_SENT"
export const SET_CV_SENT_YTD = "SET_CV_SENT_YTD"
export const SET_CV_SENT_CONVERSION_YTD = "SET_CV_SENT_CONVERSION_YTD"
export const SET_AVERAGE_YTD_BUSINESS_MANAGER = "SET_AVERAGE_YTD_BUSINESS_MANAGER"
export const SET_AVERAGE_YTD_RECRUITMENT = "SET_AVERAGE_YTD_RECRUITMENT"
export const SET_CONVERSION_YTD_BUSINESS_MANAGER = "SET_CONVERSION_YTD_BUSINESS_MANAGER"
export const SET_CONVERSION_YTD_RECRUITMENT = "SET_CONVERSION_YTD_RECRUITMENT"
export const SET_CV_SENT_EXPANDED_VIEW = "SET_CV_SENT_EXPANDED_VIEW"

export const SET_LOADING_YTD_TOTAL = "SET_LOADING_YTD_TOTAL"
export const SET_LOADING_YTD_NEW_VACANCY = "SET_LOADING_YTD_NEW_VACANCY"
export const SET_LOADING_YTD_CONVERSION_NEW_VACANCY = "SET_LOADING_YTD_CONVERSION_NEW_VACANCY"
export const SET_LOADING_YTD_CV_SENT = "SET_LOADING_YTD_CV_SENT"
export const SET_LOADING_YTD_CONVERSION_CV_SENT = "SET_LOADING_YTD_CONVERSION_CV_SENT"
export const SET_LOADING_YTD_AVERAGE = "SET_LOADING_YTD_AVERAGE"
export const SET_LOADING_YTD_CONVERSION = "SET_LOADING_YTD_CONVERSION"

export const GET_JOBSUBMISSION_BY_JOBORDER_ID = "GET_JOBSUBMISSION_BY_JOBORDER_ID"
export const GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT = "GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT"

export const GET_JOBSUBMISSION_BY_JOBORDER_OPEN_ID = "GET_JOBSUBMISSION_BY_JOBORDER_OPEN_ID"
export const GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN = "GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN"
export const SET_JOB_SUBMISSIONS_STATUS_FROM_WEEK_RETRIEVED = "SET_JOB_SUBMISSIONS_STATUS_FROM_WEEK_RETRIEVED"

export const SET_LOADING_DATA = "SET_LOADING_DATA"

export const setLoadingData = () => ({type: SET_LOADING_DATA})

export const getEmployeeKpi = (employee) => ({ type: GET_EMPLOYEE_KPI, payload: employee });
export const setEmployeeKpi = (objectDate, objectDataRecruitment, objectDataBusinessManager) => ({ type: SET_EMPLOYEE_KPI, payload: { dates: objectDate, datasRecruitment: objectDataRecruitment, datasBusinessManager: objectDataBusinessManager } })

export const setObjectYTD = (objectConversionYTDRecruitment, objectConvertionYTDBusinessManager) => ({ type: SET_OBJECT_YTD, payload: { objectConversionYTDRecruitment: objectConversionYTDRecruitment, objectConvertionYTDBusinessManager: objectConvertionYTDBusinessManager } })
export const setKpiLoading = (isLoadingKpi) => ({ type: SET_LOADING_KPI, payload: isLoadingKpi });

export const setCvSent = (weekLabel) => ({ type: SET_CV_SENT, payload: weekLabel })
export const setIsLoadingYTDCVSent = (isLoadingYTDCVSent) => ({ type: SET_LOADING_YTD_CV_SENT, payload: isLoadingYTDCVSent })
export const setCvSentExpandedView = ({ data, weekLabel }) => ({ type: SET_CV_SENT_EXPANDED_VIEW, payload: { data, weekLabel } })
export const setYTDTotalBusinessManager = (ytdTotalBusinessManager) => ({ type: SET_YTD_TOTAL_BUSINESS_MANAGER, payload: ytdTotalBusinessManager })
export const setYTDTotalRecruitment = (ytdTotalRecruitment) => ({ type: SET_YTD_TOTAL_RECRUITMENT, payload: ytdTotalRecruitment })
export const setNewVacancyYTD = (newVacancyYTD) => ({ type: SET_NEW_VACANCY_YTD, payload: newVacancyYTD })
export const setConversionYTDNewVacancy = (dataConversionNewVacancy) => ({ type: SET_CONVERSION_YTD_NEW_VACANCY, payload: dataConversionNewVacancy })
export const setCVSentYTD = (cvSentYTD) => ({ type: SET_CV_SENT_YTD, payload: cvSentYTD })
export const setConversionYTDCVSent = (dataConversionCvSent) => ({ type: SET_CV_SENT_CONVERSION_YTD, payload: dataConversionCvSent })
export const setAverageYTDBusinessManager = (ytdAverageBusinessManager) => ({ type: SET_AVERAGE_YTD_BUSINESS_MANAGER, payload: ytdAverageBusinessManager })
export const setAverageYTDRecruitment = (ytdAverageRecruitment) => ({ type: SET_AVERAGE_YTD_RECRUITMENT, payload: ytdAverageRecruitment })
export const setConversionYTDBusinessManager = (ytdConversionBusinessManager) => ({ type: SET_CONVERSION_YTD_BUSINESS_MANAGER, payload: ytdConversionBusinessManager })
export const setConversionYTDRecruitment = (ytdConversionRecruitment) => ({ type: SET_CONVERSION_YTD_RECRUITMENT, payload: ytdConversionRecruitment })

export const setLoadingYTDTotal = (isLoadingYTDTotal) => ({ type: SET_LOADING_YTD_TOTAL, payload: isLoadingYTDTotal })
export const setLoadingYTDNewVacancy = (isLoadingYTDNewVacancy) => ({ type: SET_LOADING_YTD_NEW_VACANCY, payload: isLoadingYTDNewVacancy })
export const setLoadingYTDConversionNewVacancy = (isLoadingYTDConversionNewVacancy) => ({ type: SET_LOADING_YTD_CONVERSION_NEW_VACANCY, payload: isLoadingYTDConversionNewVacancy })
export const setLoadingYTDConversionCVSent = (isLoadingYTDConversionCVSent) => ({ type: SET_LOADING_YTD_CONVERSION_CV_SENT, payload: isLoadingYTDConversionCVSent })
export const setLoadingYTDAverage = (isLoadingYTDAverage) => ({ type: SET_LOADING_YTD_AVERAGE, payload: isLoadingYTDAverage })
export const setLoadingYTDConversion = (isLoadingYTDConversion) => ({ type: SET_LOADING_YTD_CONVERSION, payload: isLoadingYTDConversion })

export const getJobSubmissionsByJobOrderIdAction = (id, dateStartTimestamp, dateEndTimestamp) => ({ type: GET_JOBSUBMISSION_BY_JOBORDER_ID, payload: { ID: id, DATE_START: dateStartTimestamp, DATE_END: dateEndTimestamp} })
export const getJobSubmissionStatusChangedCVSentAction = (id, dateStartTimestamp, dateEndTimestamp) => ({ type: GET_JOBSUBMISSION_STATUS_CHANGED_CV_SENT, payload: { ID: id, DATE_START: dateStartTimestamp, DATE_END: dateEndTimestamp} })

export const getJobSubmissionsByJobOrderOpenAction = (id, dates) => ({ type: GET_JOBSUBMISSION_BY_JOBORDER_OPEN_ID, payload: { ID: id, DATES: dates } })
export const getJobSbmissionsStatusFromJobsubmissionOpen = (id, dates) => ({ type: GET_JOBSUBMISSION_STATUS_FROM_JOBSUBMISSION_OPEN, payload: { ID: id, DATES: dates } })
export const setJobSubmissionsStatusFromWeekRetrieved = () => ({type: SET_JOB_SUBMISSIONS_STATUS_FROM_WEEK_RETRIEVED})
