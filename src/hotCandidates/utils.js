export const generateOptions = (data = []) =>
  data.map((single) => ({
    label: single?.title,
    value: single?.entityId,
  }))

export const ADD = "ADD"
export const DELETE = "DELETE"
export const ADD_COMPANY = "ADD_COMPANY"
