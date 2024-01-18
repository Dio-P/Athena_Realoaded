import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../../DropDown';
import SearchComboBox from '../../SearchComboBox';
import NewChildForm from './NewChildForm';

const AddChildFormWrapper = ({ onClickFunctions, values }) => {
  const [one] = useState('This is the AddChildFormWrapper');
  const [isExistingChild] = useState(false);
  // {
  //   id: "5",
  //   name: "Authoring",
  //   type: "subTeam", //or group
  //   leader: "Matt Greenham",
  //   mainLinks: ["www.authoringSlack.Chanel.co.uk"],
  //   briefDescription: "Content Publishing",
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
  return (
    <>
      {one}
      {/* parent entity */}
      {/* same component as to add from root with lock function to warn when trying to unlock */}
      <DropDown
        onClickOption={onClickFunctions?.setNewParent}
        chosenValue={values.parent}
        title={{
          withValue: 'Parent: ',
          withoutValue: 'Please choose a parent',
        }}
      />
      { isExistingChild
        ? (
          <SearchComboBox
            ofType="entity"
          />
        )
        : <NewChildForm />}
      <button
        type="button"
        onClick={() => onClickFunctions.saveNewChildren()}
      >
        update
      </button>
    </>
  );
};

AddChildFormWrapper.propTypes = {
  onClickFunctions: PropTypes.objectOf(PropTypes.func),
  values: PropTypes.objectOf(PropTypes.string),
};
AddChildFormWrapper.defaultProps = {
  onClickFunctions: {},
  values: {
    parent: '',
  },
};
export default AddChildFormWrapper;
