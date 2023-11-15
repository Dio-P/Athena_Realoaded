import React, { useState } from 'react';
import DropDown from '../../DropDown';

const AddChildForm = () => {
  const [one] = useState('This is the AddChildForm');
  return (
    <>
      {one}
      <DropDown />
      <DropDown />
    </>
  );
};

export default AddChildForm;
