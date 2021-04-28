export const generateOptions = (data = []) =>
  data.map((user) => ({
    label: user.title,
    value: user?.entityId,
  }))

export const ADD = "ADD"
export const DELETE = "DELETE"