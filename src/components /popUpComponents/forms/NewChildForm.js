import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useGetAllTypes from '../../../hooks/queries/useGetAllTypes';
// import useCreateNewUnit from '../../../hooks/useCreateNewUnit';
import MultiBtnComp from '../../MultiBtnComp';
import SearchComboBox from '../../SearchComboBox';
import { WarningElement } from '../../specialElements';
import { linkIsValid } from '../../../helpers/validation';
import { errorsLink } from '../../../constants';

const CustomForm = styled.form`
`;

const InputBtnContainer = styled.div`
  display: flex;
`;

const CustomInput = styled.input`
`;

const CtaBtnsContainer = styled.div`
  display: flex;
`;

const CtaBtn = styled.button`
`;

const NewChildForm = () => {
  // const {
  //   addNewLink,
  // } = useCreateNewUnit();

  const [typesToRender, filterTypes] = useGetAllTypes();

  const [mainLinks, setMainLinks] = useState([]);

  const [nameOnInput, setNameOnInput] = useState('');
  const [linkOnInput, setLinkOnInput] = useState('');
  const [typeOnInput, setTypeOnInput] = useState('');
  const [teamsResponsibleOnInput, setTeamsResponsibleOnInput] = useState(['']);
  const [leaderOnInput, setLeaderOnInput] = useState('');
  const [briefDescriptionOnInput, setBriefDescriptionOnInput] = useState('');

  const [docsOnInput, setDocsOnInput] = useState([]);
  const [tagsOnInput, setTagsOnInput] = useState([]);
  const [technologiesOnInput, setTechnologiesOnInput] = useState([]);

  const [linkError, setLinkError] = useState('');
  // I need in the function to create first a new entity
  // To return it's Id
  // and send this back to EntityChildrenBox using the passed down
  // animation-timing-function: onClickFunctions.

  useEffect(() => {
    if (linkOnInput && !linkIsValid(linkOnInput)) {
      setLinkError(errorsLink.invalid);
    }
  }, [linkOnInput]);

  const handleAddingExtraLink = (newLink) => {
    // add the existing valid link on the new array
    setMainLinks([...mainLinks, newLink]);
    // empty the input
    setLinkOnInput('');
    // display the existing link as btn with x underneath
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
  const handleAddNewUnit = () => {
    const allRequiredFields = {
      nameOnInput, // string
      mainLinks, // array
      typeOnInput, // object
      teamsResponsibleOnInput, // array
      briefDescriptionOnInput, // string
      docsOnInput, // array
    };
    const allRequiredFieldsKeys = Object.keys(allRequiredFields);
    const missingRequiredFields = allRequiredFieldsKeys.filter(
      (fieldKey) => !allRequiredFields[fieldKey]
        || allRequiredFields[fieldKey].length === 0
        || Object.keys(allRequiredFields[fieldKey]).length === 0,
      // will this break it if it is not an object ?
    );
    if (missingRequiredFields.length > 0) {
      const missingRequiredFieldsString = missingRequiredFields.join(', ');
      console.log(missingRequiredFieldsString);
      // logic to announce missing fields here
    } else {
      console.log('good to add');
      // logic to add the new unit
      // delete the log above
    }
  };
  return (
    <CustomForm>
      <CustomInput
        type="text"
        required
        value={nameOnInput}
        onChange={(e) => setNameOnInput(e.target.value)}
      />
      <SearchComboBox
      // this should probably be comboentityAttributesentityAttributesbox
      // with additional option to add new type
        type="text"
        ofType="type"
        // value={typeOnInput?.title}
        onClickOption={setTypeOnInput}
        options={typesToRender}
        onChange={filterTypes}
        // onChange={(e) => setTypeOnInput(e.target.value)}
      />
      <InputBtnContainer>
        <>
          <CustomInput
            type="text"
            required
            value={linkOnInput}
            onChange={(e) => setLinkOnInput(e.target.value)}
          />
          {linkError && <WarningElement info={linkError} />}
        </>
        <MultiBtnComp
          type="add"
          disabled={!linkOnInput || !linkIsValid(linkOnInput)}
          aria-hidden={!linkOnInput || !linkIsValid(linkOnInput)}
          label="add one more link" // || "add another link"
          onClickFunction={() => handleAddingExtraLink(linkOnInput)}
        />
      </InputBtnContainer>
      <SearchComboBox // this should probably be combobox with additional option to add new type
        type="text"
        options={['test']}
        value={teamsResponsibleOnInput}
        onClickOption={setTeamsResponsibleOnInput}
        // onChange={(e) => setTeamsResponsibleOnInput(e.target.value)}
      />
      <SearchComboBox // this should probably be combobox with additional option to add new type
        type="text"
        options={['test']}
        value={leaderOnInput}
        onClickOption={setLeaderOnInput}
        // onChange={(e) => setLeaderOnInput(e.target.value)}
      />
      {/* <CustomInput
        type="text"
        value={mainLinksOnInput}
        onChange={(e) => setMainLinksOnInput(e.target.value)}
      /> */}
      <CustomInput
        type="text"
        value={briefDescriptionOnInput}
        onChange={(e) => setBriefDescriptionOnInput(e.target.value)}
      />
      <CustomInput // this should probably be combobox with additional option to add new type ????
        type="text"
        value={docsOnInput}
        onClickFunction={setDocsOnInput}
        // onChange={(e) => setDocsOnInput(e.target.value)}
      />
      <CustomInput
        type="text"
        value={tagsOnInput}
        // this should probably be combobox with additional option to add new type
        onChange={(e) => setTagsOnInput(e.target.value)}
      />
      <CustomInput
        type="text"
        value={technologiesOnInput}
        // this should probably be combobox with additional option to add new type
        onChange={(e) => setTechnologiesOnInput(e.target.value)}
      />
      <CtaBtnsContainer>
        <CtaBtn>Cancel</CtaBtn>
        <CtaBtn onClick={handleAddNewUnit}>Add</CtaBtn>
      </CtaBtnsContainer>
    </CustomForm>
  );
};

export default NewChildForm;
