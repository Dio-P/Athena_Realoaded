import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useParamsHelper from "../hooks/useParamsHelper";

const BreadcrumbsMenuContainer = styled.div`
  display: flex;
`;

const BreadCrumbButtonContainer = styled.div`
  display: Flex;
`;

const BreadcrumbsMenu = ({ paramsCustomObj }) => {
  const {} = useParamsHelper();
  const [breadCrumbs, setBreadCrumbs] = useState("");

  useEffect(() => {
    if(paramsCustomObj){
      setBreadCrumbs(Object.keys(paramsCustomObj))
    }
  }, [paramsCustomObj]);

  const BreadCrumbButton = ({ breadCrumbName }) => {
    return (
      <BreadCrumbButtonContainer
        onClick={}
      >
        {breadCrumbName}
      </BreadCrumbButtonContainer>
    )
  };

  return (
    <BreadcrumbsMenuContainer>
      Hello from the break crumbs
    </BreadcrumbsMenuContainer>
  )
};

export default BreadcrumbsMenu;