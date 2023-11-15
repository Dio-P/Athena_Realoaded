import React, { useState } from 'react';
import DropDown from '../../DropDown';

const AddChildForm = () => {
  const [one, useOne] = useState();
  return (
    <>
      <DropDown />
      <DropDown />
    </>
  );
};

export default AddChildForm;
