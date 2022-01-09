import { BUSINESS_MANAGER, SOURCING_OFFICER, TALENT_ACQUISITION } from '../auth/user.sagas'

export const sortTableEmployee = (tableEmployee) => {
  tableEmployee.sort((employeeA, employeeB) => {
    if (employeeA.occupation < employeeB.occupation) {
      return -1
    }
    if (employeeA.occupation > employeeB.occupation) {
      return 1
    }
    return 0
  })
  return tableEmployee
}

export const initializeEmployeeSelected = (employeeId, occupation) => ({
  id: employeeId,
  occupation,
})

export const getIdEmployeeAccessAndOccupation = (occupationNotFiltered) => {
  let tabIdEmployees = occupationNotFiltered.split(' ')
  const occupation = `${tabIdEmployees[0]} ${tabIdEmployees[1]}`

  tabIdEmployees.splice(0, 1)
  tabIdEmployees.splice(0, 1)

  tabIdEmployees = tabIdEmployees.map((id) => parseInt(id))

  return {
    tabEmployeesIdsAccessibleByUserConnected: tabIdEmployees,
    userConnectedOccupation: occupation,
  }
}

export const getValuesFromEmployees = (employees) =>
  employees.map((employee) => {
    let occupationLabel = ''

    const { occupation } = employee

    if (occupation.includes(BUSINESS_MANAGER)) {
      occupationLabel = 'BM'
    } else if (occupation.includes(SOURCING_OFFICER)) {
      occupationLabel = 'SO'
    } else if (occupation.includes(TALENT_ACQUISITION)) {
      occupationLabel = 'TA'
    }

    // switch (occupation) {
    //     case occupation.includes(BUSINESS_MANAGER):
    //         occupationLabel = "BM";
    //         break;
    //     case occupation.includes(SOURCING_OFFICER):
    //         occupationLabel = "SO";
    //         break;
    //     case occupation.includes(TALENT_ACQUISITION):
    //         occupationLabel = "TA"
    //         break;
    //     default:
    //         occupationLabel = "";
    //         break;
    // }

    return { value: `${employee.id}`, label: `${occupationLabel} - ${employee.firstName} ${employee.lastName}` }
  })
