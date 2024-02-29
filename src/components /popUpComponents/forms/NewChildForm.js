import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useGetAllTypes from '../../../hooks/queries/useGetAllTypes';
import useGetAllTechnologies from '../../../hooks/queries/useGetAllTechnologies';
// import useCreateNewUnit from '../../../hooks/useCreateNewUnit';
import MultiBtnComp from '../../MultiBtnComp';
import SearchComboBox from '../../SearchComboBox';
import DropDown from '../../DropDown';
import { WarningElement } from '../../specialElements';
import { linkIsValid } from '../../../helpers/validation';
import { errorsLink } from '../../../constants';
import capitaliseFirstLetters from '../../../helpers/capitaliseFirstLetters';

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

const GenericInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const findTitleDisplay = (value, title) => {
  if (typeof value !== 'string' && value?.length > 0) {
    const numberOfChoices = value.length;

    return `${numberOfChoices} selected`;
  } if (value && value?.length > 0) {
    return `${title} ${capitaliseFirstLetters(value)}`;
  }
  return title;
  // map((singleValue) => {
  //   console.log('singleValue', singleValue);
  //   return capitaliseFirstLetters(singleValue);
  // }).join(', ');
};
const NewChildForm = () => {
  // const {
  //   addNewLink,
  // } = useCreateNewUnit();

  const [mainLinks, setMainLinks] = useState([]);

  const [nameOnInput, setNameOnInput] = useState('');
  const [linkOnInput, setLinkOnInput] = useState('');
  const [typeOnInput, setTypeOnInput] = useState('');
  const [teamsResponsibleOnInput, setTeamsResponsibleOnInput] = useState(['']);
  const [leaderOnInput, setLeaderOnInput] = useState('');
  const [briefDescriptionOnInput, setBriefDescriptionOnInput] = useState('');
  console.log(leaderOnInput);

  const [docsOnInput, setDocsOnInput] = useState([]);
  const [tagsOnInput, setTagsOnInput] = useState([]);
  const [technologiesOnInput, setTechnologiesOnInput] = useState([]);

  const [linkError, setLinkError] = useState('');
  // I need in the function to create first a new entity
  // To return it's Id
  // and send this back to EntityChildrenBox using the passed down
  // animation-timing-function: onClickFunctions.

  useEffect(() => {
    console.log('technologiesOnInput******', technologiesOnInput);
  }, [technologiesOnInput]);

  const requiredFields = {
    nameOnInput, // string
    mainLinks, // array
    typeOnInput, // object
    teamsResponsibleOnInput, // array
    briefDescriptionOnInput, // string
    docsOnInput, // array
  };

  // const optionalFields = {
  //   leaderOnInput,
  //   tagsOnInput,
  //   technologiesOnInput,
  // };
  const [typesToRender, filterTypes] = useGetAllTypes();
  const [technologiesToRender, filterTechnologies] = useGetAllTechnologies();
  // do the above arguments need to be in an object ?
  // since the validation would be better to happen here, should I create a new function
  //  on the useGetAllTypes to call the api put?

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

  const findMissingField = (fieldKey) => !requiredFields[fieldKey]
        || requiredFields[fieldKey].length === 0
        || Object.keys(requiredFields[fieldKey]).length === 0;
  // can I call the above as a closure ?

  const handleAddNewUnit = () => {
    const allRequiredFieldsKeys = Object.keys(requiredFields);
    const missingRequiredFields = allRequiredFieldsKeys.filter(findMissingField);
    // will this break it if it is not an object ?
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

  const handleDeleteChoice = (choiceToRemove, allChoices, setAllChoices) => {
    console.log('choiceToRemov********e', choiceToRemove);
    console.log('allChoices******', allChoices);
    const remainingChoices = allChoices.filter((singleChoice) => (
      singleChoice.id !== choiceToRemove.id
      // there is a problem here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! I need to set this to:
      // singleChoice.title ?
    ));
    console.log('remainingChoices ******', remainingChoices);
    setAllChoices(remainingChoices.length > 0 ? [...remainingChoices] : []);
  };

  return (
    <CustomForm>
      <CustomInput
        type="text"
        required
        onChange={(e) => setNameOnInput(e.target.value)}
      />
      <GenericInputWrapper>
        Type:
        {/* <label htmlFor="typeInput"> Type: </label> */}
        <DropDown
          id="typeInput"
          role="combobox"
          onClickOption={setTypeOnInput}
          chosenValue={typeOnInput?.title}
          title={typeOnInput?.title ? findTitleDisplay(typeOnInput?.title, 'type: ') : 'Please choose a type'}
          options={typesToRender}
          onChange={filterTypes}
          ofType="type"
        />
      </GenericInputWrapper>
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
        onClickOption={setTeamsResponsibleOnInput}
        // onChange={(e) => setTeamsResponsibleOnInput(e.target.value)}
      />
      <SearchComboBox // this should probably be combobox with additional option to add new type
        type="text"
        options={['test']}
        onClickOption={setLeaderOnInput}
        // onChange={(e) => setLeaderOnInput(e.target.value)}
      />
      {/* <CustomInput
        type="text"
        value={mainLinksOnInput}
        onChange={(e) => setMainLinksOnInput(e.target.value)}
      /> */}
      <GenericInputWrapper>
        Description :
        {/* <label htmlFor='descriptionInput'>Description: </label> */}
        <CustomInput
          id="descriptionInput"
          type="text"
          value={briefDescriptionOnInput}
          onChange={(e) => setBriefDescriptionOnInput(e.target.value)}
        />
      </GenericInputWrapper>

      <CustomInput // this should probably be combobox with additional option to add new type ????
        type="text"
        value={docsOnInput}
        onClickFunction={setDocsOnInput}
        // onChange={(e) => setDocsOnInput(e.target.value)}
      />
      <GenericInputWrapper>
        Tags:
        <DropDown
          onClickOption={setTagsOnInput}
          chosenValue={tagsOnInput}
          title={tagsOnInput?.length > 0 ? findTitleDisplay(tagsOnInput, 'tags: ') : 'Please choose a tag'}
          options={typesToRender}
          onChange={filterTypes}
          ofType="type"
        />
        {/* <CustomInput
          type="text"
          value={tagsOnInput}
          // this should probably be combobox with additional option to add new type
          onChange={(e) => setTagsOnInput(e.target.value)}
        /> */}
      </GenericInputWrapper>

      <GenericInputWrapper>
        Technologies:
        {/*
        what it needs to happen on click isolation:
        the chosen technology is added to an array
        an icon with the technology is rendered under the combobox only if it is object-position
          this also has an x next to it to remove it
        on the title the user can see all the chosen technologies
        the difference of this and having a single value is that here
        if you click again on an option you add it
        in the other type you overide it
         */}
        <DropDown
          onClickOption={
            (latestTechnologyAdded) => {
              setTechnologiesOnInput([...technologiesOnInput, latestTechnologyAdded]);
            }
          }
          chosenValue={technologiesOnInput}
          acceptsMultipleValues
          onDeletingChoice={
            (choiceToDelete) => (
              handleDeleteChoice(choiceToDelete, technologiesOnInput, setTechnologiesOnInput)
            )
          }
          title={technologiesOnInput.length > 0 ? `${technologiesOnInput.length} selected` : 'Please choose a technology'}
          options={technologiesToRender}
          onChange={filterTechnologies}
          ofType="technology"
        />
      </GenericInputWrapper>
      <CtaBtnsContainer>
        <CtaBtn>Cancel</CtaBtn>
        <CtaBtn onClick={handleAddNewUnit}>Add</CtaBtn>
      </CtaBtnsContainer>
    </CustomForm>
  );
};

export default NewChildForm;
