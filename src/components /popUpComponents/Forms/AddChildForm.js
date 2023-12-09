import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropDown from '../../DropDown';
import SearchComboBox from '../../SearchComboBox';

const AddChildForm = ({ onClickFunctions }) => {
  const [one] = useState('This is the AddChildForm');
  return (
    <>
      {one}
      {/* parent entity */}
      {/* same component as to add from root with lock function to warn when trying to unlock */}
      <DropDown onClickOption={onClickFunctions?.setNewParent} />
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
};
AddChildForm.defaultProps = {
  onClickFunctions: {},
};
export default AddChildForm;
