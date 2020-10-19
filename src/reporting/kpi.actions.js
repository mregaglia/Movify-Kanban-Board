export const KPI_NOTE_ACTION = "KPI_NOTE_EMPLOYEE_ACTION"
export const KPI_SET_NOTE_EMPLOYEE_ACTION = "KPI_SET_NOTE_EMPLOYEE_ACTION"

export const KPI_RESET_DATA = "KPI_RESET_DATA"

export const KPI_JOBOFFER_ACTION = "KPI_JOBOFFER_ACTION"
export const KPI_SET_JOBOFFER_EMPLOYEE_ACTION = "KPI_SET_JOBOFFER_EMPLOYEE_ACTION"


export const getKpiNoteEmployee = (idEmployeeSelected, dateStart, dateEnd) => ({ type: KPI_NOTE_ACTION, payload: { id: idEmployeeSelected, dateStart: dateStart, dateEnd: dateEnd } });
export const setKpiNoteEmployee = (date, noteWeekEmployee) => ({ type: KPI_SET_NOTE_EMPLOYEE_ACTION, payload: { date: date, notesEmployee: noteWeekEmployee } })

export const kpiResetData = () => ({ type: KPI_RESET_DATA, payload: [] })

export const getKpiJobOfferEmployee = (idEmployeeSelected, dateStart, dateEnd) => ({ type: KPI_JOBOFFER_ACTION, payload: { id: idEmployeeSelected, dateStart: dateStart, dateEnd: dateEnd } });
export const setKpiJobOfferEmployee = (date, jobOfferWeekEmployee) => ({ type: KPI_SET_JOBOFFER_EMPLOYEE_ACTION, payload: { date: date, notesEmployee: jobOfferWeekEmployee } })
