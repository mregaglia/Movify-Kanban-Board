export const generateOptions = (data = []) => {
  let i = 0
  const options = []

  while (data[i]) {
    const single = data[i]

    options.push({
      label: single?.title,
      value: single?.entityId,
    })

    i += 1
  }
}

export const ADD = 'ADD'
export const DELETE = 'DELETE'
export const ADD_COMPANY = 'ADD_COMPANY'
