import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useGetAllTypes from '../../../hooks/queries/useGetAllTypes';
import useGetAllTechnologies from '../../../hooks/queries/useGetAllTechnologies';
import useGetAllTags from '../../../hooks/queries/useGetAllTags';
import useGetAllTeams from '../../../hooks/queries/useGetAllTeams';
// import useCreateNewUnit from '../../../hooks/useCreateNewUnit';
import MultiBtnComp from '../../MultiBtnComp';
import TagBtn from '../../buttons/TagBtn';
import SearchComboBox from '../../SearchComboBox';
import DropDown from '../../DropDown';
import { WarningElement } from '../../specialElements';
import { linkIsValid } from '../../../helpers/validation';
import { errorsLink } from '../../../constants';
import capitaliseFirstLetters from '../../../helpers/capitaliseFirstLetters';

const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;

`;

const InputBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AdditionalFieldsContainer = styled.div`
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
  const [teamsResponsibleOnInput, setTeamsResponsibleOnInput] = useState([]);
  // const [leaderOnInput, setLeaderOnInput] = useState('');
  const [briefDescriptionOnInput, setBriefDescriptionOnInput] = useState('');

  const [docsOnInput, setDocsOnInput] = useState([]);
  const [tagsOnInput, setTagsOnInput] = useState([]);
  const [technologiesOnInput, setTechnologiesOnInput] = useState([]);

  const [linkError, setLinkError] = useState('');
  const [isAdditionalFieldsBlockExpanded, setIsAdditionalFieldsBlockExpanded] = useState(false);
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
  const [teamsToRender, filterTeams] = useGetAllTeams();
  const [technologiesToRender, filterTechnologies] = useGetAllTechnologies();
  const [tagsToRender, filterTags] = useGetAllTags();
  // do the above arguments need to be in an object ?
  // since the validation would be better to happen here, should I create a new function
  //  on the useGetAllTypes to call the api put?

  useEffect(() => {
    if (linkOnInput && linkOnInput.length > 7 && !linkIsValid(linkOnInput)) {
      setLinkError(errorsLink.invalid);
    } else {
      setLinkError(undefined);
    }
  }, [linkOnInput]);

  const handleAddLink = (newLink) => {
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
      (singleChoice.id ? singleChoice.id : singleChoice) !== choiceToRemove
      // there is a problem here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! I need to set this to:
      // singleChoice.title ?
    ));
    console.log('remainingChoices ******', remainingChoices);
    setAllChoices([...remainingChoices]);
  };

  const hasLinksSet = mainLinks.length > 0;

  return (
    <CustomForm>

      <GenericInputWrapper>
        Name
        <CustomInput
          type="text"
          id="nameInput"
          required
          onChange={(e) => setNameOnInput(e.target.value)}
        />
      </GenericInputWrapper>

      <GenericInputWrapper>
        Type:
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

      <GenericInputWrapper>
        Links
        <InputBtnContainer>
          <>
            <CustomInput
              type="url"
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
            label={hasLinksSet ? 'add another link' : 'add link'}
            onClickFunction={() => handleAddLink(linkOnInput)}
          />
        </InputBtnContainer>
        {hasLinksSet > 0
          && mainLinks.map((link) => (
            <TagBtn
              label={link}
              hasDeleteOption
              onClickDelete={() => handleDeleteChoice(link, mainLinks, setMainLinks)}
            />
          ))}
      </GenericInputWrapper>

      <GenericInputWrapper>
        Teams Responsible:
        <DropDown
          id="teamsResponsibleInput"
          role="combobox"
          acceptsMultipleValues
          onClickOption={
            (latestTeamAdded) => {
              console.log('latestTeamAdded', latestTeamAdded);
              setTeamsResponsibleOnInput([...teamsResponsibleOnInput, latestTeamAdded]);
            }
          }
          onDeletingChoice={
            (choiceToDelete) => (
              handleDeleteChoice(
                choiceToDelete,
                teamsResponsibleOnInput,
                setTeamsResponsibleOnInput,
              )
            )
          }
          chosenValue={teamsResponsibleOnInput}
          title={teamsResponsibleOnInput?.length > 0 ? `${teamsResponsibleOnInput.length} selected` : 'Please choose a responsible team'}
          options={teamsToRender}
          onChange={filterTeams}
          ofType="type"
        />
      </GenericInputWrapper>

      <SearchComboBox // this should probably be combobox with additional option to add new type
        type="text"
        options={['test']}
        onClickOption={setTeamsResponsibleOnInput}
        // onChange={(e) => setTeamsResponsibleOnInput(e.target.value)}
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

      <MultiBtnComp
        onClickFunction={() => setIsAdditionalFieldsBlockExpanded(!isAdditionalFieldsBlockExpanded)}
        label="Additional fields"
      />
      {isAdditionalFieldsBlockExpanded
    && (
      //  <SearchComboBox
    //   // this ideally should be in connection to partner platform,
    //   // as the very last thing to be build
    //     type="text"
    //     options={['test']}
    //     onClickOption={setLeaderOnInput}
    //   />
    <AdditionalFieldsContainer>

      <GenericInputWrapper>
        Tags:
        <DropDown
          role="combobox"
          onClickOption={(latestTagAdded) => {
            setTagsOnInput([...tagsOnInput, latestTagAdded]);
          }}
          onDeletingChoice={
            (choiceToDelete) => (
              handleDeleteChoice(choiceToDelete, tagsOnInput, setTagsOnInput)
            )
          }
          chosenValue={tagsOnInput}
          acceptsMultipleValues
          title={tagsOnInput?.length > 0 ? `${tagsOnInput.length} selected` : 'Please choose a tag'}
          options={tagsToRender}
          onChange={filterTags}
          ofType="tags"
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
    </AdditionalFieldsContainer>
    )}

      <CtaBtnsContainer>
        <CtaBtn>Cancel</CtaBtn>
        <CtaBtn onClick={handleAddNewUnit}>Add</CtaBtn>
      </CtaBtnsContainer>
    </CustomForm>
  );
};

export default NewChildForm;
