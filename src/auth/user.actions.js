export const UPDATE_REPORTING_ACCESS = "UPDATE_REPORTING_ACCESS"

export const updateReportingAccess = (
  hasAccess,
  occupation,
  userId,
  employeeIdAccess,
  usersToWhichLoggedInUserHasAccess
) => ({
  type: UPDATE_REPORTING_ACCESS,
  payload: {
    hasAccessToReporting: hasAccess,
    occupation,
    userId,
    employeeIdAccess,
    usersToWhichLoggedInUserHasAccess,
  },
})
