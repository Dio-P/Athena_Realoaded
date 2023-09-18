import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const BreadcrumbsMenuContainer = styled.div`
  display: flex;
`;

const BreadCrumbButtonContainer = styled.div`
  display: Flex;
`;

const BreadCrumbButton = ({ breadCrumbName, renderChosenEntity, paramsCustomObj }) => (
  <BreadCrumbButtonContainer
    onClick={
      () => renderChosenEntity(breadCrumbName, paramsCustomObj[breadCrumbName].id, paramsCustomObj)
    }
  >
    /{breadCrumbName}
  </BreadCrumbButtonContainer>
);

const BreadcrumbsMenu = ({ paramsCustomObj, renderChosenEntity }) => {
  const [breadCrumbs, setBreadCrumbs] = useState('');

  useEffect(() => {
    if (paramsCustomObj) {
      setBreadCrumbs(Object.keys(paramsCustomObj));
    }
  }, [paramsCustomObj]);

  return (
    <BreadcrumbsMenuContainer aria-label="Breadcrumbs Menu">
      {breadCrumbs.length > 0
        && breadCrumbs.map((breadCrumb) => (
          <BreadCrumbButton
            breadCrumbName={breadCrumb}
            key={breadCrumb}
            renderChosenEntity={renderChosenEntity}
            paramsCustomObj={paramsCustomObj}
          />
        ))}
    </BreadcrumbsMenuContainer>
  );
};

BreadCrumbButton.propTypes = {
  breadCrumbName: PropTypes.string.isRequired,
  renderChosenEntity: PropTypes.func.isRequired,
  paramsCustomObj: PropTypes.shape({
    cPub: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

BreadCrumbButton.defaultProps = {
  paramsCustomObj: {},
};

BreadcrumbsMenu.propTypes = {
  paramsCustomObj: PropTypes.shape({
    cPub: PropTypes.shape({
      id: PropTypes.string,
      index: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  renderChosenEntity: PropTypes.func.isRequired,
};

BreadcrumbsMenu.defaultProps = {
  paramsCustomObj: {},
};

export default BreadcrumbsMenu;
