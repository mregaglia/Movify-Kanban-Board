import {
  CREATE_JOB_SUBMISSION,
  createJobSubmission,
  GET_JOB_ORDERS,
  GET_JOB_SUBMISSIONS,
  GET_KANBAN,
  getJobOrders,
  getJobSubmissions,
  getKanban,
  SET_BMS,
  SET_JOB_ORDERS,
  SET_JOB_SUBMISSIONS,
  setBms,
  setJobOrders,
  setJobSubmissions,
  UPDATE_BMS,
  UPDATE_CLIENT_CORPORATIONS,
  UPDATE_JOB_ORDERS,
  UPDATE_JOB_SUBMISSION,
  UPDATE_JOB_SUBMISSIONS,
  updateBms,
  updateClientCorporations,
  updateJobOrders,
  updateJobSubmission,
  updateJobSubmissions,
} from '../kanban.actions'

describe('getKanban action', () => {
  it('should return GET_KANBAN action', () => {
    expect(getKanban()).toEqual({ type: GET_KANBAN })
  })
})
describe('setBms action', () => {
  it('should return SET_BMS action', () => {
    const bms = []
    expect(setBms(bms)).toEqual({ type: SET_BMS, payload: bms })
  })
})
describe('updateBms action', () => {
  it('should return UPDATE_BMS action', () => {
    const bms = []
    expect(updateBms(bms)).toEqual({ type: UPDATE_BMS, payload: bms })
  })
})
describe('updateClientCorporations action', () => {
  it('should return UPDATE_CLIENT_CORPORATIONS action', () => {
    const ccs = []
    expect(updateClientCorporations(ccs)).toEqual({
      type: UPDATE_CLIENT_CORPORATIONS,
      payload: ccs,
    })
  })
})
describe('getJobOrders action', () => {
  it('should return GET_JOB_ORDERS action', () => {
    const bmId = 'id'
    expect(getJobOrders(bmId)).toEqual({ type: GET_JOB_ORDERS, payload: bmId })
  })
})
describe('setJobOrders action', () => {
  it('should return SET_JOB_ORDERS action', () => {
    const jos = []
    expect(setJobOrders(jos)).toEqual({ type: SET_JOB_ORDERS, payload: jos })
  })
})
describe('updateJobOrders action', () => {
  it('should return UPDATE_JOB_ORDERS action', () => {
    const jos = []
    expect(updateJobOrders(jos)).toEqual({
      type: UPDATE_JOB_ORDERS,
      payload: jos,
    })
  })
})
describe('getJobSubmissions action', () => {
  it('should return GET_JOB_SUBMISSIONS action', () => {
    const bmId = 1
    const ccId = 1
    const joId = 1
    expect(getJobSubmissions(bmId, ccId, joId)).toEqual({
      type: GET_JOB_SUBMISSIONS,
      payload: { bmId, clientCorporationId: ccId, jobOrderId: joId },
    })
  })
})
describe('setJobSubmissions action', () => {
  it('should return SET_JOB_SUBMISSIONS action', () => {
    const jss = []
    expect(setJobSubmissions(jss)).toEqual({
      type: SET_JOB_SUBMISSIONS,
      payload: jss,
    })
  })
})
describe('updateJobSubmissions action', () => {
  it('should return UPDATE_JOB_SUBMISSIONS action', () => {
    const jss = []
    expect(updateJobSubmissions(jss)).toEqual({
      type: UPDATE_JOB_SUBMISSIONS,
      payload: jss,
    })
  })
})
describe('updateJobSubmission action', () => {
  it('should return UPDATE_JOB_SUBMISSION action', () => {
    const joId = 1
    const prevStatus = 'prevStatus'
    const jsId = 1
    const status = 'status'
    expect(updateJobSubmission(joId, prevStatus, jsId, status)).toEqual({
      type: UPDATE_JOB_SUBMISSION,
      payload: { jobOrderId: joId, prevStatus, jobSubmissionId: jsId, status },
    })
  })
})
describe('createJobSubmission action', () => {
  it('should return CREATE_JOB_SUBMISSION action', () => {
    const jo = {}
    const js = {}
    const status = 'status'
    expect(createJobSubmission(jo, js, status)).toEqual({
      type: CREATE_JOB_SUBMISSION,
      payload: { jobOrder: jo, jobSubmission: js, status },
    })
  })
})
