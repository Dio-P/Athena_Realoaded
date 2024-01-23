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

const NewChildForm = () => {
  const {
    errors,
    addNewLink,
  } = useCreateNewUnit();

  const [newEntityToBeAddedAsChild, setNewEntityToBeAddedAsChild] = useState();
  const [linkInputState, setLinkInputState] = useState('');
  const [linkError, setLinkError] = useState('');
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
            value={linkInputState}
            onChange={(e) => setLinkInputState(e.target.value)}
            // onClick={() => setNewEntityToBeAddedAsChild({
            //   ...newEntityToBeAddedAsChild,
            //   mainLinks: [],
            // })}
          />
          {linkError && <WarningElement info="Please provide a valid email address" />}
        </>
        <MultiBtnComp
          type="add"
          label="add a link" // || "add another link"
          onClickFunction={() => {
            const wasSuccessfullyAdded = addNewLink(linkInputState);
            if (wasSuccessfullyAdded) {
              setLinkInputState('');
            } else {
              setLinkError(true);
            }
          }}
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
