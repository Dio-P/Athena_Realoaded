import React, { useState } from 'react';
import DropDown from '../../DropDown';
import SearchComboBox from '../../SearchComboBox';

const AddChildForm = () => {
  const [entityToGet, setEntityToGet] = useState(undefined);
  const [one] = useState('This is the AddChildForm');
  return (
    <>
      {one}
      {/* this entity */}
      {/* same component as to add from root with lock function to warn when trying to unlock */}
      <DropDown />
      <SearchComboBox
        ofType="Entity"
        chosenValues={entityToGet}
        onClickOption={setEntityToGet}
      />
      {/* new child or existing child \/ */}
      <DropDown />
    </>
  );
};

export default AddChildForm;
