import React, { useState } from 'react';
import styled from '@emotion/styled';
import useCreateNewUnit from '../../../hooks/useCreateNewUnit';
import MultiBtnComp from '../../MultiBtnComp';
import { WarningElement } from '../../specialElements';

const CustomForm = styled.form`
`;
const InputBtnContainer = styled.div`
  display: flex;
`;
const CustomInput = styled.input`
`;
// {
//
//   teamsResponsible: undefined,
//   properties: {
//     docs: ["2"],
//     tags: [],
//     technologies: [],
//   },
//   children: ["6", "7"],
//   connections: {
//     audienceFacing: false,
//     receivesDataFrom: undefined,
//     givesDataTo: undefined,
//   },
//   interactions: {
//     isLinkUpToDate: true,
//     comments: [
//       {
//         timeStamp: "some date and time",
//         userId: "some user Id or name",
//         text: "some text"
//       }
//     ],
//     requestedActions: [
//       {
//         timeStamp: "some date and time",
//         typeOfAction: "some action type",
//         description: "some coments",
//         requestingUserId: "some user Id or name"
//       }
//     ]
//   },
// },
const NewChildForm = () => {
  const {
    errors,
    setNewLink,
    addNewLink,
  } = useCreateNewUnit();

  const [newEntityToBeAddedAsChild, setNewEntityToBeAddedAsChild] = useState();

  // I need in the function to create first a new entity
  // To return it's Id
  // and send this back to EntityChildrenBox using the passed down
  // animation-timing-function: onClickFunctions.
  return (
    <CustomForm>
      <InputBtnContainer>
        <>
          <CustomInput
            type="text"
            value={newEntityToBeAddedAsChild.mainLinks}
            onChange={(e) => setNewLink(e.target.value)}
            onClick={() => setNewEntityToBeAddedAsChild({
              ...newEntityToBeAddedAsChild,
              mainLinks: [],
            })}
          />
          {errors.newLink && <WarningElement info={errors.newLink} />}
        </>
        <MultiBtnComp
          type="add"
          label="add a link" // || "add another link"
          onClickFunction={addNewLink}
        />
      </InputBtnContainer>
      <CustomInput
        type="text"
        value={newEntityToBeAddedAsChild}
        // onClick={() => }

      />
    </CustomForm>
  );
};

export default NewChildForm;
