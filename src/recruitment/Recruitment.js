import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { array, bool, func, object } from 'prop-types'
import { pathOr, prop } from 'ramda'

import { Title } from '../components'
import theme from '../style/theme'

import ClientCorporation from './ClientCorporation'
import { getRecruitment } from './recruitment.actions'
import UpdateModal from './UpdateModal'

const getPipeColor = (index) => theme.pipeColors[index % theme.pipeColors.length]

const Recruitment = ({
  clientList,
  getRecruitment: getRecruitmentProp,
  isUpdateModalOpen,
  loading,
  onCloseModal,
  updateModalData,
}) => {
  useEffect(() => {
    if (!prop('length', clientList)) getRecruitmentProp()
  }, [clientList, getRecruitmentProp])

  if (loading)
    return (
      <div>
        <Title>Loading ...</Title>
      </div>
    )

  return (
    <div>
      {clientList.map((client, index) => (
        <ClientCorporation key={client} clientId={client} color={getPipeColor(index)} />
      ))}
      <UpdateModal data={updateModalData} isOpen={isUpdateModalOpen} onClose={onCloseModal} />
    </div>
  )
}

Recruitment.propTypes = {
  clientList: array,
  getRecruitment: func,
  isUpdateModalOpen: bool,
  loading: bool,
  onCloseModal: func,
  updateModalData: object,
}

export default connect(
  (state) => ({
    clientList: pathOr([], ['recruitment', 'clientList'], state),
    loading: pathOr(true, ['recruitment', 'loading'], state),
  }),
  { getRecruitment }
)(Recruitment)
