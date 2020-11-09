export const UPDATE_REPORTONG_ACCESS = "UPDATE_REPORTING_ACCESS"

export const updateReportingAccess = (hasAccess, occupation, userId) => ({ type: UPDATE_REPORTONG_ACCESS, payload: { hasAccessToReporting: hasAccess, occupation: occupation, userId: userId } })