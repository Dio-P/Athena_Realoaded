import React, { useState } from 'react';
import styled from '@emotion/styled';
import useCreateNewUnit from '../../../hooks/useCreateNewUnit';
import MultiBtnComp from '../../MultiBtnComp';
import { WarningElement } from '../../specialElements';
import { linkIsValid } from '../../../helpers/validation';

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

  const [nameOnInput, setNameOnInput] = useState('');
  const [linkOnInput, setLinkOnInput] = useState('');
  const [linkError, setLinkError] = useState('');
  // I need in the function to create first a new entity
  // To return it's Id
  // and send this back to EntityChildrenBox using the passed down
  // animation-timing-function: onClickFunctions.

  const handleAddingLink = () => {
    if (linkOnInput) {
      if (linkIsValid(linkOnInput)) {
        addNewLink(linkOnInput);
        setLinkOnInput('');
      } else {
        setLinkError('Please provide a valid email address');
      }
    } else {
      setLinkError('Please provide at least one email address');
    }
  };

  // name,
  // type,
  // teamsResponsible,
  // leader,
  // briefDescription,
  //   properties: {
  //     docs,
  //     tags,
  //     technologies,
  //   },

  return (
    <CustomForm>
      <CustomInput
        type="text"
        value={nameOnInput}
        onChange={(e) => setNameOnInput(e.target.value)}
      />
      <InputBtnContainer>
        <>
          <CustomInput
            type="text"
            value={linkOnInput}
            onChange={(e) => setLinkOnInput(e.target.value)}
          />
          {linkError && <WarningElement info={linkError} />}
        </>
        <MultiBtnComp
          type="add"
          label="add a link" // || "add another link"
          onClickFunction={() => handleAddingLink(linkOnInput)}
        />
      </InputBtnContainer>
    </CustomForm>
  );
};

export default NewChildForm;
