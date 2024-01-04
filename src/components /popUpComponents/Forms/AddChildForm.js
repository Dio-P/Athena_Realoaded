import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../../DropDown';
import SearchComboBox from '../../SearchComboBox';

const AddChildForm = ({ onClickFunctions, values }) => {
  const [one] = useState('This is the AddChildForm');
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
      {/* above is were the magic happens */}
      <SearchComboBox
        ofType="entity"
        // chosenValues={entityToGet}
        // onClickOption={setEntityToGet}
      />
      {/* new child or existing child \/ */}
      <SearchComboBox
        ofType="entity"
        // chosenValues={entityToGet}
        // onClickOption={setEntityToGet}
      />
      <button
        type="button"
        onClick={() => onClickFunctions.saveNewChildren()}
      >
        update
      </button>
    </>
  );
};

AddChildForm.propTypes = {
  onClickFunctions: PropTypes.objectOf(PropTypes.func),
  values: PropTypes.objectOf(PropTypes.string),
};
AddChildForm.defaultProps = {
  onClickFunctions: {},
  values: {
    parent: '',
  },
};
export default AddChildForm;
