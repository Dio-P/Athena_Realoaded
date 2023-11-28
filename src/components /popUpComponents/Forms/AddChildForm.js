import React, { useState } from 'react';
import DropDown from '../../DropDown';
import SearchComboBox from '../../SearchComboBox';

const AddChildForm = () => {
  const [one] = useState('This is the AddChildForm');
  return (
    <>
      {one}
      {/* parent entity */}
      {/* same component as to add from root with lock function to warn when trying to unlock */}
      <DropDown />
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
    </>
  );
};

export default AddChildForm;
