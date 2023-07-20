import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const BreadcrumbsMenuContainer = styled.div`
  display: flex;
`;

const BreadCrumbButtonContainer = styled.div`
  display: Flex;
`;

const BreadcrumbsMenu = ({ paramsCustomObj, renderChosenEntity }) => {
  const [breadCrumbs, setBreadCrumbs] = useState("");

  useEffect(() => {
    if(paramsCustomObj){
      setBreadCrumbs(Object.keys(paramsCustomObj))
    }
  }, [paramsCustomObj]);

  const BreadCrumbButton = ({ breadCrumbName }) => {
    return (
      <BreadCrumbButtonContainer
        onClick={() => renderChosenEntity(breadCrumbName, paramsCustomObj[breadCrumbName].id, paramsCustomObj)}
      >
        /{breadCrumbName}
      </BreadCrumbButtonContainer>
    )
  };

  return (
    <BreadcrumbsMenuContainer>
      {breadCrumbs.length > 0 &&
        breadCrumbs.map((breadCrumb) => (
          <BreadCrumbButton
            breadCrumbName={breadCrumb}
          />
        ))
      }
    </BreadcrumbsMenuContainer>
  )
};

export default BreadcrumbsMenu;