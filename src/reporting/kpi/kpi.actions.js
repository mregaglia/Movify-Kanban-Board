export const GET_EMPLOYEE_KPI = "GET_EMPLOYEE_KPI"
export const SET_EMPLOYEE_KPI = "SET_EMPLOYEE_KPI"

export const SET_LOADING_KPI = "SET_LOADING_KPI"
export const SET_OBJECT_YTD = "SET_OBJECT_YTD"

export const SET_GAUGE_LIMIT = "SET_GAUGE_LIMIT"

export const SET_CV_SENT = "SET_CV_SENT"
export const SET_CV_SENT_IS_LOADED_WEEK = "SET_CV_SENT_IS_LOADED_WEEK"

export const SET_YTD_TOTAL_BUSINESS_MANAGER = "SET_YTD_TOTAL"
export const SET_YTD_TOTAL_RECRUITMENT = "SET_YTD_TOTAL_RECRUITMENT"
export const SET_NEW_VACANCY_YTD = "SET_NEW_VACANCY_YTD"
export const SET_LOADING_YTD_TOTAL = "SET_LOADING_YTD_TOTAL"
export const SET_LOADING_YTD_NEW_VACANCY = "SET_LOADING_YTD_NEW_VACANCY"

export const SET_AVERAGE_YTD_BUSINESS_MANAGER = "SET_AVERAGE_YTD_BUSINESS_MANAGER"
export const SET_AVERAGE_YTD_RECRUITMENT = "SET_AVERAGE_YTD_RECRUITMENT"
export const SET_LOADING_YTD_AVERAGE = "SET_LOADING_YTD_AVERAGE"

export const SET_CONVERSION_YTD_BUSINESS_MANAGER = "SET_CONVERSION_YTD_BUSINESS_MANAGER"
export const SET_CONVERSION_YTD_RECRUITMENT = "SET_CONVERSION_YTD_RECRUITMENT"
export const SET_LOADING_YTD_CONVERSION = "SET_LOADING_YTD_CONVERSION"

export const getEmployeeKpi = (employee) => ({ type: GET_EMPLOYEE_KPI, payload: employee });
export const setEmployeeKpi = (objectDate, objectDataRecruitment, objectDataBusinessManager) => ({ type: SET_EMPLOYEE_KPI, payload: { dates: objectDate, datasRecruitment: objectDataRecruitment, datasBusinessManager: objectDataBusinessManager } })

export const setObjectYTD = (objectConversionYTDRecruitment, objectConvertionYTDBusinessManager) => ({ type: SET_OBJECT_YTD, payload: { objectConversionYTDRecruitment: objectConversionYTDRecruitment, objectConvertionYTDBusinessManager: objectConvertionYTDBusinessManager } })

export const setKpiLoading = (isLoadingKpi) => ({ type: SET_LOADING_KPI, payload: isLoadingKpi });

export const setGaugeLimit = (gaugeLimit) => ({ type: SET_GAUGE_LIMIT, payload: gaugeLimit });

export const setCvSent = (cvSent) => ({ type: SET_CV_SENT, payload: cvSent })
export const setCvSentIsLoadingWeek = (cvSentIsLoaded) => ({ type: SET_CV_SENT_IS_LOADED_WEEK, payload: cvSentIsLoaded})

export const setYTDTotalBusinessManager = (ytdTotalBusinessManager) => ({ type: SET_YTD_TOTAL_BUSINESS_MANAGER, payload: ytdTotalBusinessManager })
export const setYTDTotalRecruitment = (ytdTotalRecruitment) => ({ type: SET_YTD_TOTAL_RECRUITMENT, payload: ytdTotalRecruitment })
export const setNewVacancyYTD = (newVacancyYTD) => ({type: SET_NEW_VACANCY_YTD, payload: newVacancyYTD})
export const setLoadingYTDTotal = (isLoadingYTDTotal) => ({ type: SET_LOADING_YTD_TOTAL, payload: isLoadingYTDTotal})
export const setLoadingYTDNewVacancy = (isLoadingYTDNewVacancy) => ({type: SET_LOADING_YTD_NEW_VACANCY, payload: isLoadingYTDNewVacancy})

export const setAverageYTDBusinessManager = (ytdAverageBusinessManager) => ({ type: SET_AVERAGE_YTD_BUSINESS_MANAGER, payload: ytdAverageBusinessManager })
export const setAverageYTDRecruitment = (ytdAverageRecruitment) => ({ type: SET_AVERAGE_YTD_RECRUITMENT, payload: ytdAverageRecruitment })
export const setLoadingYTDAverage = (isLoadingYTDAverage) => ({ type: SET_LOADING_YTD_AVERAGE, payload: isLoadingYTDAverage})

export const setConversionYTDBusinessManager = (ytdConversionBusinessManager) => ({ type: SET_CONVERSION_YTD_BUSINESS_MANAGER, payload: ytdConversionBusinessManager })
export const setConversionYTDRecruitment = (ytdConversionRecruitment) => ({ type: SET_CONVERSION_YTD_RECRUITMENT, payload: ytdConversionRecruitment })
export const setLoadingYTDConversion = (isLoadingYTDConversion) => ({ type: SET_LOADING_YTD_CONVERSION, payload: isLoadingYTDConversion})
