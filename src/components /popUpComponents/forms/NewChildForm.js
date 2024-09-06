import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import useGetAllTypes from '../../../hooks/queries/useGetAllTypes';
import useGetAllTechnologies from '../../../hooks/queries/useGetAllTechnologies';
import useGetAllTags from '../../../hooks/queries/useGetAllTags';
import useGetAllTeams from '../../../hooks/queries/useGetAllTeams';
import useCreateNewUnit from '../../../hooks/useCreateNewEntity';
import MultiBtnComp from '../../MultiBtnComp';
import TagBtn from '../../buttons/TagBtn';
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
const NewChildForm = ({ closePopUP }) => {
  // const {
  //   addNewLink,
  // } = useCreateNewUnit();

  const [mainLinks, setMainLinks] = useState([]);
  const [allDocsOfEntity, setAllDocsOfEntity] = useState([]);

  const [nameOnInput, setNameOnInput] = useState('');
  const [linkOnInput, setLinkOnInput] = useState('');
  const [typeOnInput, setTypeOnInput] = useState('');
  const [teamsResponsibleOnInput, setTeamsResponsibleOnInput] = useState([]);
  // const [leaderOnInput, setLeaderOnInput] = useState('');
  // this should be comming from partner platform
  const [briefDescriptionOnInput, setBriefDescriptionOnInput] = useState('');

  const [docOnInput, setDocOnInput] = useState('');
  const [allTagsOfEntity, setAllTagsOfEntity] = useState([]);
  const [allTechnologiesOfEntity, setAllTechnologiesOfEntity] = useState([]);

  const [linkError, setLinkError] = useState('');
  const [docError, setDocError] = useState('');
  const [isAdditionalFieldsBlockExpanded, setIsAdditionalFieldsBlockExpanded] = useState(false);
  // I need in the function to create first a new entity
  // To return it's Id
  // and send this back to EntityChildrenBox using the passed down
  // animation-timing-function: onClickFunctions.

  useEffect(() => {
    console.log('allTechnologiesOfEntity******', allTechnologiesOfEntity);
  }, [allTechnologiesOfEntity]);

  const requiredFields = {
    nameOnInput, // string
    mainLinks, // array
    typeOnInput, // object
    teamsResponsibleOnInput, // array
    briefDescriptionOnInput, // string
    allDocsOfEntity, // array
  };

  // const optionalFields = {
  //   leaderOnInput,
  //   allTagsOfEntity,
  //   allTechnologiesOfEntity,
  // };
  const [handleCreateNewUnit] = useCreateNewUnit(
    nameOnInput,
    typeOnInput,
    teamsResponsibleOnInput,
    // leaderOnInput,
    mainLinks,
    briefDescriptionOnInput,
    allDocsOfEntity,
    allTagsOfEntity,
    allTechnologiesOfEntity,
  );

  const [typesToRender, filterTypes] = useGetAllTypes();
  const [teamsToRender, filterTeams] = useGetAllTeams();
  // const [] = useGetAllDocs();
  const [technologiesToRender, filterTechnologies] = useGetAllTechnologies();
  const [tagsToRender, filterTags] = useGetAllTags();
  // do the above arguments need to be in an object ?
  // since the validation would be better to happen here, should I create a new function
  //  on the useGetAllTypes to call the api put?

  // do I want to trigger those in another way ?
  useEffect(() => {
    if (linkOnInput && linkOnInput.length > 7 && !linkIsValid(linkOnInput)) {
      setLinkError(errorsLink.invalid);
    } else {
      setLinkError(undefined);
    }
  }, [linkOnInput]);

  useEffect(() => {
    if (docOnInput && docOnInput.length > 7 && !linkIsValid(docOnInput)) {
      setDocError(errorsLink.invalid);
    } else {
      setDocError(undefined);
    }
  }, [docOnInput]);

  const handleAddLink = (newLink) => {
    // add the existing valid link on the new array
    setMainLinks([...mainLinks, newLink]);
    // empty the input
    setLinkOnInput('');
    // display the existing link as btn with x underneath
    console.log('inside handleAddLink!!!!!!!!!!!!!!!!!');
  };

  const handleAddDoc = (newDoc) => {
    // add the existing valid link on the new array
    setAllDocsOfEntity([...allDocsOfEntity, newDoc]);
    // empty the input
    setDocOnInput('');
    // display the existing link as btn with x underneath
  };

  const findMissingField = (fieldKey) => !requiredFields[fieldKey]
        || requiredFields[fieldKey].length === 0
        || Object.keys(requiredFields[fieldKey]).length === 0;
  // can I call the above as a closure ?

  const handleAddNewUnit = () => {
    console.log('inside handleAddNewUnit');
    const allRequiredFieldsKeys = Object.keys(requiredFields);
    const missingRequiredFields = allRequiredFieldsKeys.filter(findMissingField);
    // will this break it if it is not an object ?
    if (missingRequiredFields.length > 0) {
      const missingRequiredFieldsString = missingRequiredFields.join(', ');
      console.log(missingRequiredFieldsString);
      // logic to announce missing fields here
    } else {
      console.log('good to add');
      handleCreateNewUnit();
      closePopUP();
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
  const hasDocsSet = allDocsOfEntity.length > 0;

  return (
    <CustomForm>

      <GenericInputWrapper>
        Name
        <CustomInput
          type="text"
          id="nameInput"
          // required
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
              // required
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
        {hasLinksSet
          && mainLinks.map((link) => (
            <TagBtn
              label={link}
              hasDeleteOption
              onClickDelete={() => handleDeleteChoice(link, mainLinks, setMainLinks)}
            />
          ))}
      </GenericInputWrapper>

      <GenericInputWrapper>
        {/* will they me able to add a new team from here? */}
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

      <GenericInputWrapper>
        Docs
        <InputBtnContainer>
          <>
            <CustomInput
              type="url"
              // required
              value={docOnInput}
              onChange={(e) => setDocOnInput(e.target.value)}
            />
            {docError && <WarningElement info={docError} />}
          </>
          <MultiBtnComp
            type="add"
            disabled={!docOnInput || !linkIsValid(docOnInput)}
            aria-hidden={!docOnInput || !linkIsValid(docOnInput)}
            label={hasDocsSet ? 'add another doc link' : 'add a doc link'}
            onClickFunction={() => handleAddDoc(docOnInput)}
          />
        </InputBtnContainer>
        {hasDocsSet
          && allDocsOfEntity.map((doc) => (
            <TagBtn
              label={doc}
              hasDeleteOption
              onClickDelete={() => handleDeleteChoice(doc, allDocsOfEntity, setAllDocsOfEntity)}
            />
          ))}
      </GenericInputWrapper>

      <MultiBtnComp
        onClickFunction={() => setIsAdditionalFieldsBlockExpanded(!isAdditionalFieldsBlockExpanded)}
        label="Additional fields"
      />
      {isAdditionalFieldsBlockExpanded
    && (
    <AdditionalFieldsContainer>

      <GenericInputWrapper>
        Tags:
        <DropDown
          role="combobox"
          onClickOption={(latestTagAdded) => {
            setAllTagsOfEntity([...allTagsOfEntity, latestTagAdded]);
          }}
          onDeletingChoice={
            (choiceToDelete) => (
              handleDeleteChoice(choiceToDelete, allTagsOfEntity, setAllTagsOfEntity)
            )
          }
          chosenValue={allTagsOfEntity}
          acceptsMultipleValues
          title={allTagsOfEntity?.length > 0 ? `${allTagsOfEntity.length} selected` : 'Please choose a tag'}
          options={tagsToRender}
          onChange={filterTags}
          ofType="tags"
        />
      </GenericInputWrapper>

      <GenericInputWrapper>
        Technologies:

        <DropDown
          onClickOption={
            (latestTechnologyAdded) => {
              setAllTechnologiesOfEntity([...allTechnologiesOfEntity, latestTechnologyAdded]);
            }
          }
          chosenValue={allTechnologiesOfEntity}
          acceptsMultipleValues
          onDeletingChoice={
            (choiceToDelete) => (
              handleDeleteChoice(
                choiceToDelete,
                allTechnologiesOfEntity,
                setAllTechnologiesOfEntity,
              )
            )
          }
          title={allTechnologiesOfEntity.length > 0 ? `${allTechnologiesOfEntity.length} selected` : 'Please choose a technology'}
          options={technologiesToRender}
          onChange={filterTechnologies}
          ofType="technology"
        />
      </GenericInputWrapper>
    </AdditionalFieldsContainer>
    )}

      <CtaBtnsContainer>
        {/* <CtaBtn>Cancel</CtaBtn> */}
        {/* eslint-disable-next-line react/button-has-type */}
        <button type="button"> Cancel </button>
        <CtaBtn onClick={() => handleAddNewUnit()}>Add</CtaBtn>
      </CtaBtnsContainer>
    </CustomForm>
  );
};

NewChildForm.propTypes = {
  closePopUP: PropTypes.func,

};

NewChildForm.defaultProps = {
  closePopUP: undefined,
};

export default NewChildForm;
