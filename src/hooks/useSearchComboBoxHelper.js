import React from 'react';

const useSearchComboBoxHelper = (ofType, chosenValues, option) => {
  const createAdvanceValuesUpdate = () => ({
    ...chosenValues,
    [ofType]: chosenValues[ofType] ? [...chosenValues[ofType], option] : [option],
  });

  const handleOnClickFunction = () => {
    switch (ofType) {
      case 'entity': return option;

      default: return createAdvanceValuesUpdate(ofType, chosenValues, option);
    }
  };

  return { updateValue: handleOnClickFunction() };
};

export default useSearchComboBoxHelper;
