import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { pathOr, prop } from "ramda";
import { array, bool, func, object } from "prop-types";
import theme from "../style/theme";
import { getRecruitment } from "./recruitment.actions";
import { Title } from "../components";
import ClientCorporation from "./ClientCorporation";
import UpdateModal from "./UpdateModal";

const getPipeColor = index => theme.pipeColors[index % theme.pipeColors.length];

const Recruitment = ({
  clientList,
  getRecruitment,
  isUpdateModalOpen,
  loading,
  updateModalData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!prop("length", clientList)) getRecruitment();
  }, [clientList, getRecruitment]);

  useEffect(() => {
    setIsModalOpen(isUpdateModalOpen)
  }, [isUpdateModalOpen]);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading)
    return (
      <div>
        <Title>Loading ...</Title>
      </div>
    );

  return (
    <div>
      {clientList.map((client, index) => (
        <ClientCorporation
          key={client}
          clientId={client}
          color={getPipeColor(index)}
        />
      ))}
      <UpdateModal
        data={updateModalData}
        isOpen={isModalOpen}
        onClose={onCloseModal}
      />
    </div>
  );
};

Recruitment.propTypes = {
  clientList: array,
  getRecruitment: func,
  isUpdateModalOpen: bool,
  loading: bool,
  updateModalData: object
};

export default connect(
  state => ({
    clientList: pathOr([], ["departmentFilter", "recruitmentCcs"], state),
    loading: pathOr(true, ["recruitment", "loading"], state)
  }),
  { getRecruitment }
)(Recruitment);
